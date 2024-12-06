@extends('layouts.layout')

@section('title', 'sucursales')

@section('head')
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
<link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.min.css">
<script src="https://code.jquery.com/jquery-3.5.1.js"></script>
<script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
@endsection

@section('content')
<div class="sticky-top bg-white p-3">
    <div class="d-flex justify-content-between align-items-center">
        <h1>Reportes sucursales</h1>
        <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#dateModal">
            <i class="bi bi-funnel"></i>
        </button>
    </div>
    <h2 id="periodoFechas" class="text-muted text-center fs-4"></h2>
</div>
<!-- Modal -->
<div class="modal fade" id="dateModal" tabindex="-1" aria-labelledby="dateModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="dateModalLabel">Selecciona el rango de fechas y horas</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="dateForm">
                    <div class="row align-items-center justify-content-center">
                        <div class="col-md-5 mb-3">
                            <label for="fechaInicio" class="form-label">Fecha Inicio:</label>
                            <input type="date" id="fechaInicio" class="form-control" required>
                        </div>
                        <div class="col-md-5 mb-3">
                            <label for="fechaFin" class="form-label">Fecha Fin:</label>
                            <input type="date" id="fechaFin" class="form-control" required>
                        </div>
                        <div class="col-md-5 mb-3">
                            <label for="horaInicio" class="form-label">Hora Inicio:</label>
                            <input type="time" id="horaInicio" class="form-control" required min="07:00" max="22:00">
                        </div>
                        <div class="col-md-5 mb-3">
                            <label for="horaFin" class="form-label">Hora Fin:</label>
                            <input type="time" id="horaFin" class="form-control" required min="07:00" max="22:00">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary" form="dateForm" data-bs-dismiss="modal">Consultar</button>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-6">
        <div id="loadingCantidad" style="display: none; text-align: center;">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p>Cargando datos de cantidad...</p>
        </div>
        <div id="chartCantidad" style="height: 300px;"></div>
    </div>
    <div class="col-md-6">
        <div id="loadingVentas" style="display: none; text-align: center;">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p>Cargando datos de ventas...</p>
        </div>
        <div id="chartVentas" style="height: 300px;"></div>
    </div>
</div>

<div class="row">
    <!-- Gráficos de Transacciones Hora en una columna -->
    <div class="col-md-12">
        <div id="loadingTransaccionesHoras" style="display: none; text-align: center;">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p>Cargando datos de TransaccionesHoras...</p>
        </div>
        <div id="chartTransaccionesHoras" style="height: 400px;"></div>
    </div>
</div>

<div class="row">
    <!-- Gráficos de Ventas Hora en una columna -->
    <div class="col-md-12">
        <div id="loadingVentasHoras" style="display: none; text-align: center;">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p>Cargando datos de VentasHoras...</p>
        </div>
        <div id="chartVentasHoras" style="height: 400px;"></div>
    </div>
</div>

<div class="row">
    <!-- Gráficos de Productos Hora en una columna -->
    <div class="col-md-12">
        <div id="loadingProductosHoras" style="display: none; text-align: center;">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p>Cargando datos de ProductosHoras...</p>
        </div>
        <div id="chartProductosHoras" style="height: 400px;"></div>
    </div>
</div>


@endsection

@section('scripts')
@vite('resources/js/graficosSucursales.js')
@endsection