let GraficoCantidad;
let GraficoIngreso;
let GraficoGanancia;

document.addEventListener("DOMContentLoaded", () => {
    const idProducto = document
        .getElementById("chartCantidad")
        .getAttribute("data-idproducto");
    generarGraficos(idProducto);
});

async function generarGraficos(IdProducto) {
    try {
        await Promise.all([
            generarGraficoGanancia(IdProducto),
            generarGraficoCantidad(IdProducto),
            generarGraficoIngreso(IdProducto),
        ]);

        console.log("Todos los gráficos se han generado correctamente");
        document.getElementById("loadingGanancia").style.display = "none";
        document.getElementById("loadingCantidad").style.display = "none";
        document.getElementById("loadingIngreso").style.display = "none";
    } catch (error) {
        console.error("Error al generar los gráficos:", error);
    } finally {
        if (GraficoGanancia) {
            GraficoGanancia.render();
        }
        if (GraficoCantidad) {
            GraficoCantidad.render();
        }
        if (GraficoIngreso) {
            GraficoIngreso.render();
        }

        // Definir la fecha de referencia
        const today = new Date("2024-10-15");
        const lastMonthStart = new Date(today);
        const lastMonthEnd = new Date(today);
        const lastYearStart = new Date(today);

        lastMonthStart.setMonth(today.getMonth() - 1);
        lastMonthEnd.setMonth(today.getMonth());
        lastYearStart.setFullYear(today.getFullYear() - 1);

        if (GraficoGanancia) {
            GraficoGanancia.zoomX(lastYearStart.getTime(), today.getTime());
        }
        if (GraficoCantidad) {
            GraficoCantidad.zoomX(
                lastMonthStart.getTime(),
                lastMonthEnd.getTime()
            );
        }
        if (GraficoIngreso) {
            GraficoIngreso.zoomX(
                lastMonthStart.getTime(),
                lastMonthEnd.getTime()
            );
        }
    }
}

async function generarGraficoGanancia(IdProducto) {
    document.getElementById("loadingGanancia").style.display = "block";
    if (GraficoGanancia) {
        GraficoGanancia.destroy();
        GraficoGanancia = null;
    }
    try {
        const response = await fetch(
            `/api/reportes/producto/ganancia-historico?IdProducto=${IdProducto}`
        );
        const data = await response.json();

        const datosFormateados = data.map((item) => [
            new Date(item.Fecha).getTime(),
            parseInt(item.Ganancia),
        ]);

        const acumulado = datosFormateados.reduce(
            (acc, item) => acc + item[1],
            0
        );

        GraficoGanancia = generarGraficoDeArea(
            document.getElementById("chartGanancia"),
            datosFormateados,
            "Ganancia",
            acumulado,
            "Monto de ganancia del Producto Historico",
            "#9e0606"
        );

        // Aplicar el zoom para los últimos 3 meses después de la generación del gráfico
        const today = new Date("2024-10-15");
        const lastThreeMonthsStart = new Date(today);
        lastThreeMonthsStart.setMonth(today.getMonth() - 3);
        GraficoGanancia.zoomX(lastThreeMonthsStart.getTime(), today.getTime());
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

async function generarGraficoCantidad(IdProducto) {
    document.getElementById("loadingCantidad").style.display = "block";
    if (GraficoCantidad) {
        GraficoCantidad.destroy();
        GraficoCantidad = null;
    }
    try {
        const response = await fetch(
            `/api/reportes/producto/cantidad-historico?IdProducto=${IdProducto}`
        );
        const data = await response.json();

        const datosFormateados = data.map((item) => [
            new Date(item.Fecha).getTime(),
            parseInt(item.Cantidad),
        ]);

        const acumulado = datosFormateados.reduce(
            (acc, item) => acc + item[1],
            0
        );

        GraficoCantidad = generarGraficoDeArea(
            document.getElementById("chartCantidad"),
            datosFormateados,
            "Cantidad",
            acumulado,
            "Cantidad de Productos Vendidos Historico",
            "#00A3E0"
        );
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

async function generarGraficoIngreso(IdProducto) {
    document.getElementById("loadingIngreso").style.display = "block";
    if (GraficoIngreso) {
        GraficoIngreso.destroy();
        GraficoIngreso = null;
    }
    try {
        const response = await fetch(
            `/api/reportes/producto/ingreso-historico?IdProducto=${IdProducto}`
        );
        const data = await response.json();

        const datosFormateados = data.map((item) => [
            new Date(item.Fecha).getTime(),
            parseInt(item.Ingreso),
        ]);

        const acumulado = datosFormateados.reduce(
            (acc, item) => acc + item[1],
            0
        );

        GraficoIngreso = generarGraficoDeArea(
            document.getElementById("chartIngreso"),
            datosFormateados,
            "Ingreso",
            acumulado,
            "Monto de ingreso del producto Historico",
            "#008000"
        );
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

function generarGraficoDeArea(
    contenedorGrafico,
    datos,
    datosLabel,
    acumulado,
    tituloGrafico,
    color
) {
    const today = new Date("2024-10-15");

    const options = {
        series: [
            {
                data: datos,
                name: datosLabel,
                color: color,
            },
        ],
        chart: {
            id: "area-datetime",
            type: "area",
            height: 350,
            zoom: {
                autoScaleYaxis: true,
            },
        },
        annotations: {
            yaxis: [
                {
                    y: 30,
                    borderColor: "#999",
                    label: {
                        show: true,
                        text: "Support",
                        style: {
                            color: "#fff",
                            background: "#00E396",
                        },
                    },
                },
            ],
            xaxis: [
                {
                    x: new Date("15 Oct 2024").getTime(),
                    borderColor: "#999",
                    yAxisIndex: 0,
                    label: {
                        show: true,
                        text: "Rally",
                        style: {
                            color: "#fff",
                            background: "#775DD0",
                        },
                    },
                },
            ],
        },
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 0,
            style: "hollow",
        },
        xaxis: {
            type: "datetime",
            tickAmount: 6,
        },
        tooltip: {
            x: {
                format: "dd MMM yyyy",
            },
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100],
                gradientColors: [color, color],
            },
        },
        title: {
            text: `$ ${acumulado.toLocaleString("es-MX")} MXN`,
            align: "left",
            style: {
                fontSize: "25px",
                fontWeight: "bold",
                color: "#333",
            },
        },
        subtitle: {
            text: tituloGrafico,
            align: "left",
            style: {
                fontSize: "16px",
                color: "#666",
            },
        },
    };

    const chart = new ApexCharts(contenedorGrafico, options);

    // Función para manejar los rangos de tiempo
    function zoomToDateRange(startDate, endDate) {
        chart.zoomX(startDate.getTime(), endDate.getTime());
    }

    // Agregar los eventos de los botones después de la inicialización del gráfico
    document.querySelector("#one_month").addEventListener("click", function () {
        const lastMonthStart = new Date(today);
        lastMonthStart.setMonth(today.getMonth() - 1);
        zoomToDateRange(lastMonthStart, today);
    });

    document
        .querySelector("#three_months")
        .addEventListener("click", function () {
            const lastThreeMonthsStart = new Date(today);
            lastThreeMonthsStart.setMonth(today.getMonth() - 3);
            zoomToDateRange(lastThreeMonthsStart, today);
        });

    document
        .querySelector("#six_months")
        .addEventListener("click", function () {
            const lastSixMonthsStart = new Date(today);
            lastSixMonthsStart.setMonth(today.getMonth() - 6);
            zoomToDateRange(lastSixMonthsStart, today);
        });

    document.querySelector("#one_year").addEventListener("click", function () {
        const lastYearStart = new Date(today);
        lastYearStart.setFullYear(today.getFullYear() - 1);
        zoomToDateRange(lastYearStart, today);
    });

    document.querySelector("#all").addEventListener("click", function () {
        chart.zoomX(new Date("2023-01-01").getTime(), today.getTime());
    });

    document.querySelector("#last_week").addEventListener("click", function () {
        const lastWeekStart = new Date(today);
        lastWeekStart.setDate(today.getDate() - 7);
        zoomToDateRange(lastWeekStart, today);
    });

    document
        .querySelector("#last_two_weeks")
        .addEventListener("click", function () {
            const lastTwoWeeksStart = new Date(today);
            lastTwoWeeksStart.setDate(today.getDate() - 14);
            zoomToDateRange(lastTwoWeeksStart, today);
        });

    // Cargar el gráfico con el último mes por defecto
    document.addEventListener("DOMContentLoaded", () => {
        const lastMonthStart = new Date(today);
        lastMonthStart.setMonth(today.getMonth() - 1);
        zoomToDateRange(lastMonthStart, today);
    });

    return chart;
}
