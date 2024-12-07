const defaultDate = "2023-01-01";
document.getElementById("fechaInicio").value = defaultDate;
document.getElementById("fechaFin").value = defaultDate;

let GraficoVentasSucursal;
let GraficoGanaciasCategorias;
let GraficoGanaciasDepartamento;
let GraficoCantidadProductos;
let GraficoTransaccionesMetodoPago;
let GraficoMontoMetodoPago;

document.addEventListener("DOMContentLoaded", () => {
    const fechaInicio = document.getElementById("fechaInicio").value;
    const fechaFin = document.getElementById("fechaFin").value;

    actualizarPeriodoFechas(fechaInicio, fechaFin);
    generarGraficos(fechaInicio, fechaFin);
});

document.getElementById("dateForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const fechaInicio = document.getElementById("fechaInicio").value;
    const fechaFin = document.getElementById("fechaFin").value;

    if (fechaInicio && fechaFin) {
        actualizarPeriodoFechas(fechaInicio, fechaFin);
        generarGraficos(fechaInicio, fechaFin);
    } else {
        alert("Por favor selecciona ambas fechas.");
    }
});

function actualizarPeriodoFechas(fechaInicio, fechaFin) {
    const h2Periodo = document.getElementById("periodoFechas");
    h2Periodo.textContent = `Periodo: ${fechaInicio} al ${fechaFin}`;
}

async function generarGraficos(fechaInicio, fechaFin, horaInicio, horaFin) {
    try {
        const [
            ventasSucursalPromise,
            gananciasDepartamentosPromise,
            gananciasCategoriasPromise,
            cantidadProductosPromise,
            montoMetodoPagoPromise,
            transaccionesMetodoPagoPromise,
        ] = await Promise.all([
            generarGraficoVentasSucursal(fechaInicio, fechaFin),
            generarGraficoGananciaDepartamentos(fechaInicio, fechaFin),
            generarGraficoGananciaCategorias(fechaInicio, fechaFin),
            generarGraficoCantidadProductos(fechaInicio, fechaFin),
            generarGraficoMontoMetodoPago(fechaInicio, fechaFin),
            generarGraficoTransaccionesMetodoPago(fechaInicio, fechaFin),
        ]);
        await Promise.all([
            ventasSucursalPromise,
            gananciasDepartamentosPromise,
            gananciasCategoriasPromise,
            cantidadProductosPromise,
            montoMetodoPagoPromise,
            transaccionesMetodoPagoPromise,
        ]);

        console.log("Todos los gráficos se han generado correctamente");
        GraficoVentasSucursal.render();
        GraficoGanaciasDepartamento.render();
        GraficoGanaciasCategorias.render();
        GraficoCantidadProductos.render();
        GraficoMontoMetodoPago.render();
        GraficoTransaccionesMetodoPago.render();
    } catch (error) {
        console.error("Error al generar los gráficos:", error);
    } finally {
        document.getElementById("loadingVentasSucursal").style.display = "none";
        document.getElementById("loadingGananciaDepartamentos").style.display =
            "none";
        document.getElementById("loadingGananciaCategoria").style.display =
            "none";
        document.getElementById("loadingCantidadProductos").style.display =
            "none";
        document.getElementById("loadingMontoMetodoPago").style.display =
            "none";
        document.getElementById(
            "loadingTransaccionesMetodoPago"
        ).style.display = "none";
    }
}

async function generarGraficoTransaccionesMetodoPago(fechaInicio, fechaFin) {
    document.getElementById("loadingTransaccionesMetodoPago").style.display =
        "block";
    if (GraficoTransaccionesMetodoPago) {
        GraficoTransaccionesMetodoPago.destroy();
        GraficoTransaccionesMetodoPago = null;
    }
    try {
        const response = await fetch(
            `/api/reportes/metodo-pago/transacciones?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        const data = await response.json();
        var Nombres = data.map((item) => item.Nombre);
        var TransaccionesTotal = data.map((item) =>
            parseFloat(item.Transacciones)
        );
        var acumulado = TransaccionesTotal.reduce(
            (total, valor) => total + valor,
            0
        );

        GraficoTransaccionesMetodoPago = generarGraficoDePie(
            document.getElementById("chartTransaccionesMetodoPago"),
            Nombres,
            TransaccionesTotal,
            `Total de transacciones: ${acumulado.toLocaleString("es-MX")}`,
            "Total de transacciones por cada tipo de metodo de pago"
        );
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

async function generarGraficoMontoMetodoPago(fechaInicio, fechaFin) {
    document.getElementById("loadingMontoMetodoPago").style.display = "block";
    if (GraficoMontoMetodoPago) {
        GraficoMontoMetodoPago.destroy();
        GraficoMontoMetodoPago = null;
    }
    try {
        const response = await fetch(
            `/api/reportes/metodo-pago/monto-recaudado?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        const data = await response.json();
        var Nombres = data.map((item) => item.Nombre);
        var MontoTotal = data.map((item) => parseFloat(item.Monto));
        var acumulado = MontoTotal.reduce((total, valor) => total + valor, 0);

        GraficoMontoMetodoPago = generarGraficoDeBarra(
            document.getElementById("chartMontoMetodoPago"),
            Nombres,
            "Monto Total",
            MontoTotal,
            `Monto acumulado: $  ${acumulado.toLocaleString("es-MX")} MXN`,
            "Monto recaudado por cada tipo de metodo de pago",
            "#D32F2F",
            "#8D6E63"
        );
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

async function generarGraficoCantidadProductos(fechaInicio, fechaFin) {
    document.getElementById("loadingCantidadProductos").style.display = "block";
    if (GraficoCantidadProductos) {
        GraficoCantidadProductos.destroy();
        GraficoCantidadProductos = null;
    }
    try {
        const response = await fetch(
            `/api/reportes/productos/cantidad?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        const data = await response.json();
        var Nombres = data.map((item) => item.Nombre);
        var CantidadesTotales = data.map((item) =>
            parseFloat(item.TotalVendido)
        );
        var IdProductos = data.map((item) => item.IdProducto);
        var acumulado = CantidadesTotales.reduce(
            (total, valor) => total + valor,
            0
        );

        GraficoCantidadProductos = generarGraficoDeBarra(
            document.getElementById("chartCantidadProductos"),
            Nombres,
            "Cantidad Total",
            CantidadesTotales,
            `Total de productos vendidos: ${acumulado.toLocaleString("es-MX")}`,
            "Top 10 Productos Más Vendidos",
            "#2196F3",
            "#4CAF50"
        );
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

async function generarGraficoVentasSucursal(fechaInicio, fechaFin) {
    document.getElementById("loadingVentasSucursal").style.display = "block";
    if (GraficoVentasSucursal) {
        GraficoVentasSucursal.destroy();
        GraficoVentasSucursal = null;
    }
    try {
        const response = await fetch(
            `/api/reportes/sucursal/total-ventas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        const data = await response.json();
        var categorias = data.map((item) => item.Nombre);
        var TotalVentas = data.map((item) => parseInt(item.Venta, 10));
        var acumulado = TotalVentas.reduce((total, valor) => total + valor, 0);

        GraficoVentasSucursal = generarGraficoDePie(
            document.getElementById("chartVentasSucursal"),
            categorias,
            TotalVentas,
            `Monto acumulado: $ ${acumulado.toLocaleString("es-MX")} MXN`,
            "Monto total de ventas por Sucursal"
        );
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

async function generarGraficoGananciaCategorias(fechaInicio, fechaFin) {
    document.getElementById("loadingGananciaCategoria").style.display = "block";
    if (GraficoGanaciasCategorias) {
        GraficoGanaciasCategorias.destroy();
        GraficoGanaciasCategorias = null;
    }
    try {
        const response = await fetch(
            `/api/reportes/categoria/ganancia?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        const data = await response.json();
        var categorias = data.map((item) => item.Nombre);
        var GananciaTotales = data.map((item) => parseFloat(item.Ganancias));
        var acumulado = GananciaTotales.reduce(
            (total, valor) => total + valor,
            0
        );

        GraficoGanaciasCategorias = generarGraficoDeBarra(
            document.getElementById("chartGananciaCategorias"),
            categorias,
            "Cantidad Total",
            GananciaTotales,
            `Monto acumulado: $ ${acumulado.toLocaleString("es-MX")} MXN`,
            "Ranking de Ganancias por Categoría",
            "#81C14B",
            "#204E4A"
        );
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

async function generarGraficoGananciaDepartamentos(fechaInicio, fechaFin) {
    document.getElementById("loadingGananciaDepartamentos").style.display =
        "block";
    if (GraficoGanaciasDepartamento) {
        GraficoGanaciasDepartamento.destroy();
        GraficoGanaciasDepartamento = null;
    }
    try {
        const response = await fetch(
            `/api/reportes/departamentos/ganancia?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        const data = await response.json();
        var departamentos = data.map((item) => item.Nombre);
        var GananciaTotales = data.map((item) =>
            parseFloat(item.TotalGanancia)
        );

        var acumulado = GananciaTotales.reduce(
            (total, valor) => total + valor,
            0
        );

        GraficoGanaciasDepartamento = generarGraficoDeBarra(
            document.getElementById("chartGananciaDepartaemntos"),
            departamentos,
            "Cantidad Total",
            GananciaTotales,
            `Monto acumulado: $ ${acumulado.toLocaleString("es-MX")} MXN`,
            "Ranking de Ganancias por Departamento",
            "#4FC3F7",
            "#0288D1"
        );
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

function generarGraficoDeBarra(
    contenedorGrafico,
    etiquetas,
    etiquetaDatos,
    datos,
    tituloGrafico,
    subtitle,
    color1 = "#00A3E0", // Primer color por defecto
    color2 = "#FF9900"
) {
    const coloresBarras = datos.map((_, index) => {
        return index % 2 === 0 ? color1 : color2; // Intercala entre color1 y color2
    });

    const opciones = {
        series: [
            {
                name: etiquetaDatos,
                data: datos,
            },
        ],
        chart: {
            height: 400,
            type: "bar",
        },
        title: {
            text: tituloGrafico,
            align: "left",
            style: {
                fontSize: "25px",
                fontWeight: "bold",
                color: "#333",
            },
        },
        subtitle: {
            text: subtitle,
            align: "left",
            style: {
                fontSize: "16px",
                color: "#666",
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
                borderRadius: 4,
                barHeight: "70%",
                distributed: true,
            },
        },
        xaxis: {
            categories: etiquetas,
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: "12px",
                    colors: "#333",
                },
            },
        },
        noData: {
            text: "No hay información",
        },
        tooltip: {
            enabled: true,
            y: {
                formatter: function (val) {
                    return val.toLocaleString("es-MX"); // Mostrar las ventas con dos decimales
                },
            },
        },
        legend: {
            show: false, // Desactiva la leyenda
        },
        colors: coloresBarras,
    };

    return new ApexCharts(contenedorGrafico, opciones);
}

function generarGraficoDePie(
    contenedorGrafico,
    etiquetas,
    datos,
    tituloGrafico,
    subtitulo
) {
    const opciones = {
        series: datos,
        chart: {
            height: 450,
            type: "donut",
        },
        title: {
            text: tituloGrafico,
            align: "left",
            style: {
                fontSize: "25px",
                fontWeight: "bold",
                color: "#333",
            },
        },
        subtitle: {
            text: subtitulo,
            align: "left",
            style: {
                fontSize: "14px",
                color: "#666",
            },
        },
        labels: etiquetas,
        tooltip: {
            enabled: true,
            y: {
                formatter: function (val) {
                    return val.toLocaleString("es-MX"); // Mostrar las ventas con dos decimales
                },
            },
        },
        legend: {
            show: true,
        },
        noData: {
            text: "No hay información",
        },
        plotOptions: {
            total: {
                show: false,
                label: "Total",
            },
        },
    };

    return new ApexCharts(contenedorGrafico, opciones);
}
function generarGraficoDeBarrasMultiple(
    contenedorGrafico,
    tituloGrafico,
    subtitle,
    etiquetasHoras,
    seriesDatos
) {
    var opciones = {
        series: seriesDatos,
        chart: {
            type: "bar",
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "70%",
                borderRadius: 5,
                borderRadiusApplication: "end",
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
        },
        xaxis: {
            categories: etiquetasHoras,
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val.toLocaleString("es-MX"); // Mostrar las ventas con dos decimales
                },
            },
        },
        title: {
            text: tituloGrafico,
            align: "left",
            style: {
                fontSize: "25px",
                fontWeight: "bold",
                color: "#333",
            },
        },
        subtitle: {
            text: subtitle,
            align: "left",
            style: {
                fontSize: "16px",
                color: "#666",
            },
        },
    };

    return new ApexCharts(contenedorGrafico, opciones);
}
