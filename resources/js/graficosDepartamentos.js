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
        var GananciaTotales = data.map((item) => item.TotalGanancia);

        GraficoGanancia = generarGraficoDeBarra(
            document.getElementById("chartGanancia"),
            departamentos,
            "Cantidad Total",
            GananciaTotales,
            "Ranking de Ganancias por Departamento",
            fechaInicio,
            fechaFin,
            "#4FC3F7",
            "#0288D1"
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

        GraficoTransacciones = generarGraficoDePie(
            document.getElementById("chartTransaccion"),
            departamentos,
            TotalTransacciones,
            "Procentaje de transacciones por departamento",
            fechaInicio,
            fechaFin
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
        // var Total = data.reduce((total, item) => {
        //     return total + parseInt(item.TotalCantidadProductos, 10); // Suma de los productos vendidos
        // }, 0);

        GraficoCantidad = generarGraficoDeBarra(
            document.getElementById("chartCantidad"),
            departamentos,
            "Cantidad Total",
            TotalCantidadProductos,
            "Cantidad de productos vendidos por Departamento",
            fechaInicio,
            fechaFin,
            "#A1887F",
            "#5D4037"
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
        // var Total = data.reduce((total, item) => {
        //     return total + parseInt(item.TotalCantidadProductos, 10); // Suma de los productos vendidos
        // }, 0);

        GraficoIngreso = generarGraficoDeBarra(
            document.getElementById("chartIngresos"),
            departamentos,
            "Ingreso Total",
            TotalIngreso,
            "Monto total de ingresos por Departamento",
            fechaInicio,
            fechaFin,
            "#E57373",
            "#C62828"
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

        GraficoVentas = generarGraficoDeBarra(
            document.getElementById("chartVentas"),
            departamentos,
            "Ventas Total",
            TotalVentas,
            "Monto total de ventas por Departamento",
            fechaInicio,
            fechaFin,
            "#FFB74D",
            "#D84315"
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
    fechaInicio,
    fechaFin,
    color1 = "#00A3E0", // Primer color por defecto
    color2 = "#FF9900" // Segundo color por defecto
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
    fechaInicio,
    fechaFin
) {
    const opciones = {
        series: datos,
        chart: {
            height: 450,
            type: "donut",
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
