const defaultDate = "2023-01-01";
const defaultHoraInicio = "07:00";
const defaultHoraFin = "22:00";
document.getElementById("fechaInicio").value = defaultDate;
document.getElementById("fechaFin").value = defaultDate;
document.getElementById("horaInicio").value = defaultHoraInicio;
document.getElementById("horaFin").value = defaultHoraFin;

let GraficoCantidad;
let GraficoVentasHoras;
let GraficoProductosHora;
let GraficotransaccionesHora;
let GraficoVentas;

document.addEventListener("DOMContentLoaded", () => {
    const fechaInicio = document.getElementById("fechaInicio").value;
    const fechaFin = document.getElementById("fechaFin").value;
    const horaInicio = document.getElementById("horaInicio").value;
    const horaFin = document.getElementById("horaFin").value;

    actualizarPeriodoFechas(fechaInicio, fechaFin, horaInicio, horaFin);
    generarGraficos(fechaInicio, fechaFin, horaInicio, horaFin);
});

document.getElementById("dateForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const fechaInicio = document.getElementById("fechaInicio").value;
    const fechaFin = document.getElementById("fechaFin").value;
    const horaInicio = document.getElementById("horaInicio").value;
    const horaFin = document.getElementById("horaFin").value;

    if (fechaInicio && fechaFin && horaInicio && horaFin) {
        actualizarPeriodoFechas(fechaInicio, fechaFin, horaInicio, horaFin);
        generarGraficos(fechaInicio, fechaFin, horaInicio, horaFin);
    } else {
        alert("Por favor selecciona ambas fechas y horas.");
    }
});

function actualizarPeriodoFechas(fechaInicio, fechaFin, horaInicio, horaFin) {
    const h2Periodo = document.getElementById("periodoFechas");
    h2Periodo.textContent = `Periodo: ${fechaInicio} ${horaInicio} al ${fechaFin} ${horaFin}`;
}

async function generarGraficos(fechaInicio, fechaFin, horaInicio, horaFin) {
    try {
        const [
            cantidadPromise,
            ventasHorasPromise,
            ventasPromise,
            productosHorasPromise,
            transaccionesHorasPromise,
        ] = await Promise.all([
            generarGraficoCantidad(fechaInicio, fechaFin),
            generarGraficoVentasHoras(
                fechaInicio,
                fechaFin,
                horaInicio,
                horaFin
            ),
            generarGraficoVentas(fechaInicio, fechaFin),
            generarGraficoProductosHoras(
                fechaInicio,
                fechaFin,
                horaInicio,
                horaFin
            ),
            generarGraficoTransaccionesHoras(
                fechaInicio,
                fechaFin,
                horaInicio,
                horaFin
            ),
        ]);
        await Promise.all([
            cantidadPromise,
            ventasHorasPromise,
            ventasPromise,
            productosHorasPromise,
            transaccionesHorasPromise,
        ]);

        console.log("Todos los gráficos se han generado correctamente");
        GraficoCantidad.render();
        GraficoVentasHoras.render();
        GraficoVentas.render();
        GraficoProductosHora.render();
        GraficotransaccionesHora.render();
    } catch (error) {
        console.error("Error al generar los gráficos:", error);
    } finally {
        document.getElementById("loadingCantidad").style.display = "none";
        document.getElementById("loadingVentas").style.display = "none";
        document.getElementById("loadingVentasHoras").style.display = "none";
        document.getElementById("loadingProductosHoras").style.display = "none";
        document.getElementById("loadingTransaccionesHoras").style.display =
            "none";
    }
}
async function generarGraficoVentasHoras(
    fechaInicio,
    fechaFin,
    horaInicio,
    horaFin
) {
    document.getElementById("loadingVentasHoras").style.display = "block";

    if (GraficoVentasHoras) {
        GraficoVentasHoras.destroy();
        GraficoVentasHoras = null;
    }

    try {
        const response = await fetch(
            `http://127.0.0.1:8000/api/reportes/sucursal/ventas-por-hora?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&horaInicio=${horaInicio}&horaFin=${horaFin}`
        );

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.statusText}`);
        }

        const data = await response.json();
        var TotalVentas = data.map((item) => parseFloat(item.Ventas));
        var acumulado = TotalVentas.reduce((total, valor) => total + valor, 0);

        // Extraer las horas y sucursales únicas
        const etiquetasHoras = [...new Set(data.map((item) => item.Hora))];
        const sucursales = [...new Set(data.map((item) => item.Nombre))];

        // Construir las series de datos para cada sucursal
        const seriesDatos = sucursales.map((sucursal) => {
            return {
                name: sucursal,
                data: etiquetasHoras.map((hora) => {
                    // Buscar las ventas correspondientes a cada hora y sucursal
                    const venta = data.find(
                        (item) => item.Nombre === sucursal && item.Hora === hora
                    );
                    return venta ? parseFloat(venta.Ventas) : 0;
                }),
            };
        });

        // Generar el gráfico con los datos y las configuraciones
        GraficoVentasHoras = generarGraficoDeBarrasMultiple(
            document.getElementById("chartVentasHoras"),
            `Monto acumulado: $ ${acumulado.toLocaleString("es-MX")} MXN`,
            "Monto de ventas de diferentes sucursales a lo largo del día",
            etiquetasHoras,
            seriesDatos
        );
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    } finally {
        document.getElementById("loadingVentasHoras").style.display = "none";
    }
}
async function generarGraficoProductosHoras(
    fechaInicio,
    fechaFin,
    horaInicio,
    horaFin
) {
    document.getElementById("loadingProductosHoras").style.display = "block";

    if (GraficoProductosHora) {
        GraficoProductosHora.destroy();
        GraficoProductosHora = null;
    }

    try {
        const response = await fetch(
            `http://127.0.0.1:8000/api/reportes/sucursal/productos-por-hora?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&horaInicio=${horaInicio}&horaFin=${horaFin}`
        );

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.statusText}`);
        }

        const data = await response.json();
        var TotalProductos = data.map((item) => parseInt(item.Cantidad, 10));
        var acumulado = TotalProductos.reduce(
            (total, valor) => total + valor,
            0
        );

        // Extraer las horas y sucursales únicas
        const etiquetasHoras = [...new Set(data.map((item) => item.Hora))];
        const sucursales = [...new Set(data.map((item) => item.Nombre))];

        // Construir las series de datos para cada sucursal
        const seriesDatos = sucursales.map((sucursal) => {
            return {
                name: sucursal,
                data: etiquetasHoras.map((hora) => {
                    // Buscar la cantidad de productos vendidos por cada hora y sucursal
                    const producto = data.find(
                        (item) => item.Nombre === sucursal && item.Hora === hora
                    );
                    return producto ? parseInt(producto.Cantidad, 10) : 0;
                }),
            };
        });

        // Generar el gráfico con los datos y las configuraciones
        GraficoProductosHora = generarGraficoDeBarrasMultiple(
            document.getElementById("chartProductosHoras"),
            `Total de productos vendidos: ${acumulado.toLocaleString(
                "es-MX"
            )} unidades`,
            "Cantidad de productos vendidos de diferentes sucursales a lo largo del día",
            etiquetasHoras,
            seriesDatos
        );
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    } finally {
        document.getElementById("loadingProductosHoras").style.display = "none";
    }
}

async function generarGraficoTransaccionesHoras(
    fechaInicio,
    fechaFin,
    horaInicio,
    horaFin
) {
    document.getElementById("loadingTransaccionesHoras").style.display =
        "block";

    if (GraficotransaccionesHora) {
        GraficotransaccionesHora.destroy();
        GraficotransaccionesHora = null;
    }

    try {
        const response = await fetch(
            `http://127.0.0.1:8000/api/reportes/sucursal/transacciones-por-hora?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&horaInicio=${horaInicio}&horaFin=${horaFin}`
        );

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.statusText}`);
        }

        const data = await response.json();
        var TotalTransacciones = data.map((item) =>
            parseFloat(item.Transacciones)
        );
        var acumulado = TotalTransacciones.reduce(
            (total, valor) => total + valor,
            0
        );

        // Extraer las horas y sucursales únicas
        const etiquetasHoras = [...new Set(data.map((item) => item.Hora))];
        const sucursales = [...new Set(data.map((item) => item.Nombre))];

        // Construir las series de datos para cada sucursal
        const seriesDatos = sucursales.map((sucursal) => {
            return {
                name: sucursal,
                data: etiquetasHoras.map((hora) => {
                    // Buscar las ventas correspondientes a cada hora y sucursal
                    const venta = data.find(
                        (item) => item.Nombre === sucursal && item.Hora === hora
                    );
                    return venta ? parseFloat(venta.Transacciones) : 0; // Asegúrate de que se usa la propiedad correcta
                }),
            };
        });

        // Generar el gráfico con los datos y las configuraciones
        GraficotransaccionesHora = generarGraficoDeBarrasMultiple(
            document.getElementById("chartTransaccionesHoras"),
            `Cantidad de transacciones: ${acumulado.toLocaleString("es-MX")}`,
            "Cantidad de transacciones de diferentes sucursales a lo largo del día",
            etiquetasHoras,
            seriesDatos
        );
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    } finally {
        document.getElementById("loadingTransaccionesHoras").style.display =
            "none";
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
            `/api/reportes/sucursal/productos-vendidos?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        const data = await response.json();
        var categorias = data.map((item) => item.Nombre);
        var TotalCantidadProductos = data.map((item) =>
            parseInt(item.Cantidad, 10)
        );
        var acumulado = TotalCantidadProductos.reduce(
            (total, valor) => total + valor,
            0
        );

        GraficoCantidad = generarGraficoDeBarra(
            document.getElementById("chartCantidad"),
            categorias,
            "Cantidad Total",
            TotalCantidadProductos,
            `Total de productos vendidos: ${acumulado.toLocaleString("es-MX")}`,
            "#FFA726",
            "#8D6E63",
            "Cantidad de productos vendidos por sucursal"
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
            `/api/reportes/sucursal/total-ventas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        const data = await response.json();
        var categorias = data.map((item) => item.Nombre);
        var TotalVentas = data.map((item) => parseInt(item.Venta, 10));
        var acumulado = TotalVentas.reduce((total, valor) => total + valor, 0);

        GraficoVentas = generarGraficoDePie(
            document.getElementById("chartVentas"),
            categorias,
            TotalVentas,
            `Monto acumulado: $ ${acumulado.toLocaleString("es-MX")} MXN`,
            "Monto total de ventas por Sucursal"
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
