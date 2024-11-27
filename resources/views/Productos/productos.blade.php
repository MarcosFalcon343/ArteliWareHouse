@extends('layouts.layout')

@section('title', 'Home')

@section('head')
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
@endsection

@section('content')
<h1 class="">Productos page</h1>

<div class="container">
    <!-- Formulario de fechas -->
    <form id="dateForm" class="mb-4">
        <div class="row">
            <div class="col-md-5">
                <label for="fechaInicio" class="form-label">Fecha Inicio:</label>
                <input type="date" id="fechaInicio" class="form-control" required>
            </div>
            <div class="col-md-5">
                <label for="fechaFin" class="form-label">Fecha Fin:</label>
                <input type="date" id="fechaFin" class="form-control" required>
            </div>
            <div class="col-md-2 align-self-end">
                <button type="submit" class="btn btn-primary w-100">Consultar</button>
            </div>
        </div>
    </form>

    <!-- Spinner de carga -->
    <div id="loading" style="display: none; text-align: center;">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <p>Cargando datos...</p>
    </div>

    <!-- Contenedor del gráfico -->
    <div id="chart"></div>
</div>

@endsection

@section('scripts')
<script>
    const defaultDate = '2024-10-15';
    document.getElementById('fechaInicio').value = defaultDate;
    document.getElementById('fechaFin').value = defaultDate;

    let chart;

    function generarGrafico(fechaInicio, fechaFin) {
        document.getElementById('loading').style.display = 'block';
        const chartContainer = document.querySelector("#chart");

        if (chart) {
            chart.destroy();
            chart = null;
        }

        fetch(`http://127.0.0.1:8000/api/reportes/productos/cantidad?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('loading').style.display = 'none';

                var Nombre = data.map(item => item.Nombre);
                var CantidadTotal = data.map(item => item.TotalVendido);

                var options = {
                    series: [{
                        name: 'Cantidad Total',
                        data: CantidadTotal
                    }],
                    chart: {
                        height: 350,
                        type: 'line',
                    },
                    title: {
                        text: 'Top 10 Productos Más Vendidos',
                        align: 'center',
                        style: {
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#333'
                        }
                    },
                    subtitle: {
                        text: `Período: ${fechaInicio} al ${fechaFin}`,
                        align: 'center',
                        style: {
                            fontSize: '14px',
                            color: '#666'
                        }
                    },
                    plotOptions: {
                        bar: {
                            horizontal: true,
                            borderRadius: 4,
                            barHeight: '70%',
                        }
                    },
                    xaxis: {
                        categories: Nombre,
                    },
                    yaxis: {
                        labels: {
                            style: {
                                fontSize: '12px',
                                colors: '#333'
                            }
                        }
                    },
                };

                chart = new ApexCharts(chartContainer, options);
                chart.render();
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
                document.getElementById('loading').style.display = 'none';
            });
    }

    document.addEventListener('DOMContentLoaded', () => {
        const fechaInicio = document.getElementById('fechaInicio').value;
        const fechaFin = document.getElementById('fechaFin').value;
        generarGrafico(fechaInicio, fechaFin);
    });

    document.getElementById('dateForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const fechaInicio = document.getElementById('fechaInicio').value;
        const fechaFin = document.getElementById('fechaFin').value;

        if (fechaInicio && fechaFin) {
            generarGrafico(fechaInicio, fechaFin);
        } else {
            alert('Por favor selecciona ambas fechas.');
        }
    });
</script>
@endsection