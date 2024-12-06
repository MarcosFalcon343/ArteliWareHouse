const defaultDate = "2024-10-15";
document.getElementById("fechaInicio").value = defaultDate;
document.getElementById("fechaFin").value = defaultDate;

let GraficoCantidad;
let GraficoIngreso;
let GraficoGanancia;
let GraficoDescuento;

document.addEventListener("DOMContentLoaded", () => {
    const fechaInicio = document.getElementById("fechaInicio").value;
    const fechaFin = document.getElementById("fechaFin").value;
    generarGraficos(fechaInicio, fechaFin);
});

document.getElementById("dateForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const fechaInicio = document.getElementById("fechaInicio").value;
    const fechaFin = document.getElementById("fechaFin").value;

    if (fechaInicio && fechaFin) {
        generarGraficos(fechaInicio, fechaFin);
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
        var CantidadesTotales = data.map((item) => item.TotalVendido);
        var IdProductos = data.map((item) => item.IdProducto);

        GraficoCantidad = generarGraficoDeBarra(
            document.getElementById("chartCantidad"),
            Nombres,
            "Cantidad Total",
            CantidadesTotales,
            "Top 10 Productos Más Vendidos",
            fechaInicio,
            fechaFin,
            IdProductos
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

        GraficoIngreso = generarGraficoDeBarra(
            document.getElementById("chartIngreso"),
            Nombres,
            "Ingreso Total",
            IngresosTotales,
            "Top 10 Productos por Ingreso",
            fechaInicio,
            fechaFin,
            IdProductos,
            "#FFC107"
        );
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    } finally {
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
        var IdProductos = data.map((item) => item.IdProducto);

        GraficoGanancia = generarGraficoDeBarra(
            document.getElementById("chartGanancia"),
            Nombres,
            "Ganancia Total",
            GananciasTotales,
            "Top 10 Productos por Ganancia",
            fechaInicio,
            fechaFin,
            IdProductos,
            "#28A745"
        );
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    } finally {
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
        var IdProductos = data.map((item) => item.IdProducto);

        GraficoDescuento = generarGraficoDeBarra(
            document.getElementById("chartDescuento"),
            Nombres,
            "Total Descuento",
            DescuentosTotales,
            "Top 10 Productos por Descuento",
            fechaInicio,
            fechaFin,
            IdProductos,
            "#DC3545"
        );
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    } finally {
    }
}

function generarGraficoDeBarra(
    contenedorGrafico,
    etiquetas,
    etiquetaDatos,
    datos,
    tituloGrafico,
    fechaInicio,
    fechaFin,
    productosId,
    colorBarras = "#00A3E0"
) {
    const opciones = {
        series: [
            {
                name: etiquetaDatos,
                data: datos,
                color: colorBarras,
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
            align: "center",
            style: {
                fontSize: "20px",
                fontWeight: "bold",
                color: "#333",
            },
        },
        subtitle: {
            text: `Período: ${fechaInicio} al ${fechaFin}`,
            align: "center",
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
        },
    };

    return new ApexCharts(contenedorGrafico, opciones);
}
