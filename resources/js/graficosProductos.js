const defaultDate = "2024-10-15";
document.getElementById("fechaInicio").value = defaultDate;
document.getElementById("fechaFin").value = defaultDate;

let GraficoCantidad;
let GraficoIngreso;
let GraficoGanancia;
let GraficoDescuento;
function actualizarPeriodo(fechaInicio, fechaFin) {
    const h2Periodo = document.getElementById("periodoFechas");
    h2Periodo.textContent = `Periodo: ${fechaInicio} al ${fechaFin}`;
}

document.addEventListener("DOMContentLoaded", () => {
    const fechaInicio = document.getElementById("fechaInicio").value;
    const fechaFin = document.getElementById("fechaFin").value;
    generarGraficos(fechaInicio, fechaFin);
    actualizarPeriodo(fechaInicio, fechaFin);
});

document.getElementById("dateForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const fechaInicio = document.getElementById("fechaInicio").value;
    const fechaFin = document.getElementById("fechaFin").value;

    if (fechaInicio && fechaFin) {
        generarGraficos(fechaInicio, fechaFin);
        actualizarPeriodo(fechaInicio, fechaFin);
    } else {
        alert("Por favor selecciona ambas fechas.");
    }
});

async function generarGraficos(fechaInicio, fechaFin) {
    try {
        const [
            cantidadPromise,
            ingresoPromise,
            gananciaPromise,
            descuentoPromise,
        ] = await Promise.all([
            generarGraficoCantidad(fechaInicio, fechaFin),
            generarGraficoIngreso(fechaInicio, fechaFin),
            generarGraficoGanancia(fechaInicio, fechaFin),
            generarGraficoDescuento(fechaInicio, fechaFin),
        ]);
        await Promise.all([
            cantidadPromise,
            ingresoPromise,
            gananciaPromise,
            descuentoPromise,
        ]);

        console.log("Todos los gráficos se han generado correctamente");
        GraficoCantidad.render();
        GraficoIngreso.render();
        GraficoGanancia.render();
        GraficoDescuento.render();
    } catch (error) {
        console.error("Error al generar los gráficos:", error);
    } finally {
        document.getElementById("loadingCantidad").style.display = "none";
        document.getElementById("loadingIngreso").style.display = "none";
        document.getElementById("loadingGanacia").style.display = "none";
        document.getElementById("loadingDescuento").style.display = "none";
    }
}

async function generarGraficoCantidad(fechaInicio, fechaFin) {
    document.getElementById("loadingCantidad").style.display = "block";
    if (GraficoCantidad) {
        GraficoCantidad.destroy();
        GraficoCantidad = null;
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

        GraficoCantidad = generarGraficoDeBarra(
            document.getElementById("chartCantidad"),
            Nombres,
            "Cantidad Total",
            CantidadesTotales,
            `Total de productos vendidos: ${acumulado.toLocaleString("es-MX")}`,
            "Top 10 Productos Más Vendidos",
            IdProductos,
            "#E57373",
            "#C62828"
        );
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

async function generarGraficoIngreso(fechaInicio, fechaFin) {
    document.getElementById("loadingIngreso").style.display = "block";
    if (GraficoIngreso) {
        GraficoIngreso.destroy();
        GraficoIngreso = null;
    }
    try {
        const response = await fetch(
            `/api/reportes/productos/ingreso?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        const data = await response.json();
        var Nombres = data.map((item) => item.Nombre);
        var IngresosTotales = data.map((item) => parseFloat(item.TotalIngreso));
        var IdProductos = data.map((item) => item.IdProducto);
        var acumulado = IngresosTotales.reduce(
            (total, valor) => total + valor,
            0
        );
        GraficoIngreso = generarGraficoDeBarra(
            document.getElementById("chartIngreso"),
            Nombres,
            "Ingreso Total",
            IngresosTotales,
            `Monto acumulado: $ ${acumulado.toLocaleString("es-MX")} MXN`,
            "Top 10 Productos por Ingreso", // Aquí se pasa como subtitulo
            IdProductos,
            "#81C784",
            "#388E3C"
        );
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

async function generarGraficoGanancia(fechaInicio, fechaFin) {
    document.getElementById("loadingGanacia").style.display = "block";
    if (GraficoGanancia) {
        GraficoGanancia.destroy();
        GraficoGanancia = null;
    }
    try {
        const response = await fetch(
            `/api/reportes/productos/ganancia?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        const data = await response.json();
        var Nombres = data.map((item) => item.Nombre);
        var GananciasTotales = data.map((item) =>
            parseFloat(item.TotalGanancia)
        );
        var acumulado = GananciasTotales.reduce(
            (total, valor) => total + valor,
            0
        );
        var IdProductos = data.map((item) => item.IdProducto);

        GraficoGanancia = generarGraficoDeBarra(
            document.getElementById("chartGanancia"),
            Nombres,
            "Ganancia Total",
            GananciasTotales,
            `Monto acumulado: $ ${acumulado.toLocaleString("es-MX")} MXN`,
            "Top 10 Productos por Ganancia",
            IdProductos,
            "#64B5F6",
            "#1976D2"
        );
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

async function generarGraficoDescuento(fechaInicio, fechaFin) {
    document.getElementById("loadingDescuento").style.display = "block";
    if (GraficoDescuento) {
        GraficoDescuento.destroy();
        GraficoDescuento = null;
    }
    try {
        const response = await fetch(
            `/api/reportes/productos/descuentos?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        const data = await response.json();
        var Nombres = data.map((item) => item.Nombre);
        var DescuentosTotales = data.map((item) =>
            parseFloat(item.TotalDescuento)
        );
        var acumulado = DescuentosTotales.reduce(
            (total, valor) => total + valor,
            0
        );
        var IdProductos = data.map((item) => item.IdProducto);

        GraficoDescuento = generarGraficoDeBarra(
            document.getElementById("chartDescuento"),
            Nombres,
            "Total Descuento",
            DescuentosTotales,
            `Monto acumulado: $ ${acumulado.toLocaleString("es-MX")} MXN`,
            "Top 10 Productos por Descuento",
            IdProductos,
            "#FFD54F",
            "#F57F17"
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
    subtitulo,
    productosId,
    color1 = "#00A3E0",
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
            height: 350,
            type: "bar",
            events: {
                dataPointSelection: function (event, chartContext, config) {
                    const selectedIdProducto =
                        productosId[config.dataPointIndex];
                    window.location.href = `/productos/${selectedIdProducto}`;
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
            text: subtitulo,
            align: "left",
            style: {
                fontSize: "14px",
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
                    return "$ " + val.toLocaleString("es-MX");
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
