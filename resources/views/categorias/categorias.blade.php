@extends('layouts.layout')

@section('title', 'categorias')

@section('head')
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
<link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.min.css">
<script src="https://code.jquery.com/jquery-3.5.1.js"></script>
<script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
@endsection

@section('content')
<div class="d-flex justify-content-between align-items-center">
    <h1>Reportes categorias</h1>
    <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#dateModal">
        <i class="bi bi-funnel"></i>
    </button>
</div>
<!-- Modal -->
<div class="modal fade" id="dateModal" tabindex="-1" aria-labelledby="dateModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="dateModalLabel">Selecciona el rango de fechas</h5>
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
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary" form="dateForm" data-bs-dismiss="modal">Consultar</button>
            </div>
        </div>
    </div>
</div>
<div class="mb-1">
    <!-- Contenedor principal -->
    <div class="container">
        <!-- Gráfico de Ganancias - Ocupa toda la parte superior -->
        <div class="row mb-3">
            <div class="col-12">
                <div id="loadingGanancia" style="display: none; text-align: center;">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p>Cargando datos de ganancias...</p>
                </div>
                <div id="chartGanancia" style="height: 400px;"></div>
            </div>
        </div>

        <!-- Gráficos de Ventas y Transacciones juntos en la parte inferior -->
        <div class="row mb-3">
            <!-- Gráfico de Ventas -->
            <div class="col-md-6">
                <div id="loadingVentas" style="display: none; text-align: center;">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p>Cargando datos de ventas...</p>
                </div>
                <div id="chartVentas" style="height: 300px;"></div>
            </div>

            <!-- Gráfico de Transacciones -->
            <div class="col-md-6">
                <div id="loadingTransaccion" style="display: none; text-align: center;">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p>Cargando datos de transacciones...</p>
                </div>
                <div id="chartTransaccion" style="height: 300px;"></div>
            </div>
        </div>

        <!-- Gráficos de Ingresos y Cantidad de productos juntos debajo -->
        <div class="row">
            <!-- Gráfico de Ingresos -->
            <div class="col-md-6">
                <div id="loadingIngreso" style="display: none; text-align: center;">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p>Cargando datos de ingresos...</p>
                </div>
                <div id="chartIngresos" style="height: 300px;"></div>
            </div>

            <!-- Gráfico de Cantidad de productos -->
            <div class="col-md-6">
                <div id="loadingCantidad" style="display: none; text-align: center;">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p>Cargando datos de cantidad...</p>
                </div>
                <div id="chartCantidad" style="height: 300px;"></div>
            </div>
        </div>
    </div>
</div>



@endsection

@section('scripts')
@vite('resources/js/graficosCategorias.js')
@endsection