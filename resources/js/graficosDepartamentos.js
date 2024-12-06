const defaultDate = "2024-10-15";
document.getElementById("fechaInicio").value = defaultDate;
document.getElementById("fechaFin").value = defaultDate;

let GraficoCantidad;
let GraficoIngreso;
let GraficoGanancia;
let GraficoTransacciones;
let GraficoVentas;

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
        // Actualiza el texto del periodo
        actualizarPeriodoFechas(fechaInicio, fechaFin);

        // Generar gráficos
        generarGraficos(fechaInicio, fechaFin);
    } else {
        alert("Por favor selecciona ambas fechas.");
    }
});

function actualizarPeriodoFechas(fechaInicio, fechaFin) {
    const h2Periodo = document.getElementById("periodoFechas");
    h2Periodo.textContent = `Periodo: ${fechaInicio} al ${fechaFin}`;
}

async function generarGraficos(fechaInicio, fechaFin) {
    try {
        const [
            cantidadPromise,
            ingresoPromise,
            gananciaPromise,
            transaccionesPromise,
            ventasPromise,
        ] = await Promise.all([
            generarGraficoCantidad(fechaInicio, fechaFin),
            generarGraficoIngreso(fechaInicio, fechaFin),
            generarGraficoGanancia(fechaInicio, fechaFin),
            generarGraficoTransacciones(fechaInicio, fechaFin),
            generarGraficoVentas(fechaInicio, fechaFin),
        ]);
        await Promise.all([
            cantidadPromise,
            ingresoPromise,
            gananciaPromise,
            transaccionesPromise,
            ventasPromise,
        ]);

        console.log("Todos los gráficos se han generado correctamente");
        GraficoCantidad.render();
        GraficoIngreso.render();
        GraficoGanancia.render();
        GraficoTransacciones.render();
        GraficoVentas.render();
    } catch (error) {
        console.error("Error al generar los gráficos:", error);
    } finally {
        document.getElementById("loadingCantidad").style.display = "none";
        document.getElementById("loadingIngreso").style.display = "none";
        document.getElementById("loadingGanancia").style.display = "none";
        document.getElementById("loadingTransaccion").style.display = "none";
        document.getElementById("loadingVentas").style.display = "none";
    }
}

async function generarGraficoGanancia(fechaInicio, fechaFin) {
    document.getElementById("loadingGanancia").style.display = "block";
    if (GraficoGanancia) {
        GraficoGanancia.destroy();
        GraficoGanancia = null;
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

        GraficoGanancia = generarGraficoDeBarra(
            document.getElementById("chartGanancia"),
            departamentos,
            "Cantidad Total",
            GananciaTotales,
            `Monto acumulado: $ ${acumulado.toLocaleString("es-MX")} MXN`,
            "#4FC3F7",
            "#0288D1",
            "Ranking de Ganancias por Departamento"
        );
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

async function generarGraficoTransacciones(fechaInicio, fechaFin) {
    document.getElementById("loadingTransaccion").style.display = "block";
    if (GraficoTransacciones) {
        GraficoTransacciones.destroy();
        GraficoTransacciones = null;
    }
    try {
        const response = await fetch(
            `/api/reportes/departamentos/transacciones?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        const data = await response.json();
        var departamentos = data.map((item) => item.Nombre);
        var TotalTransacciones = data.map((item) =>
            parseInt(item.TotalTransacciones, 10)
        );
        var acumulado = TotalTransacciones.reduce(
            (total, valor) => total + valor,
            0
        );

        GraficoTransacciones = generarGraficoDePie(
            document.getElementById("chartTransaccion"),
            departamentos,
            TotalTransacciones,
            `Total de transacciones: ${acumulado.toLocaleString("es-MX")}`,
            "Procentaje de transacciones por departamento"
        );
    } catch (error) {
        console.error("Error al obtener los datos:", error);
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
            `/api/reportes/departamentos/cantidad-productos?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        const data = await response.json();
        var departamentos = data.map((item) => item.Nombre);
        var TotalCantidadProductos = data.map((item) =>
            parseInt(item.TotalCantidadProductos, 10)
        );
        var acumulado = TotalCantidadProductos.reduce(
            (total, valor) => total + valor,
            0
        );

        GraficoCantidad = generarGraficoDeBarra(
            document.getElementById("chartCantidad"),
            departamentos,
            "Cantidad Total",
            TotalCantidadProductos,
            `Total de productos vendidos: ${acumulado.toLocaleString("es-MX")}`,
            "#A1887F",
            "#5D4037",
            "Cantidad de productos vendidos por Departamento"
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
            `/api/reportes/departamentos/ingreso?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        const data = await response.json();
        var departamentos = data.map((item) => item.Nombre);
        var TotalIngreso = data.map((item) => parseInt(item.TotalIngreso, 10));
        var acumulado = TotalIngreso.reduce((total, valor) => total + valor, 0);

        GraficoIngreso = generarGraficoDeBarra(
            document.getElementById("chartIngresos"),
            departamentos,
            "Ingreso Total",
            TotalIngreso,
            `Monto acumulado: $ ${acumulado.toLocaleString("es-MX")} MXN`,
            "#E57373",
            "#C62828",
            "Monto total de ingresos por Departamento"
        );
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

async function generarGraficoVentas(fechaInicio, fechaFin) {
    document.getElementById("loadingVentas").style.display = "block";
    if (GraficoVentas) {
        GraficoVentas.destroy();
        GraficoVentas = null;
    }
    try {
        const response = await fetch(
            `/api/reportes/departamentos/ventas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        const data = await response.json();
        var departamentos = data.map((item) => item.Nombre);
        var TotalVentas = data.map((item) => parseInt(item.TotalVentas, 10));
        var acumulado = TotalVentas.reduce((total, valor) => total + valor, 0);
        GraficoVentas = generarGraficoDeBarra(
            document.getElementById("chartVentas"),
            departamentos,
            "Ventas Total",
            TotalVentas,
            `Monto acumulado: $ ${acumulado.toLocaleString("es-MX")} MXN`,
            "#FFB74D",
            "#D84315",
            "Monto total de ventas por Departamento"
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
    color1 = "#00A3E0", // Primer color por defecto
    color2 = "#FF9900",
    subtitle
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
            height: 450,
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
        },
        legend: {
            show: false,
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
