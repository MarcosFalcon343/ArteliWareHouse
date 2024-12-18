@extends('layouts.layout')

@section('title', 'Home')

@section('head')
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
@endsection

@section('content')
<div class="sticky-top bg-white p-3">
    <div class="d-flex justify-content-between align-items-center">
        <h1>Reportes generales</h1>
        <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#dateModal">
            <i class="bi bi-funnel"></i>
        </button>
    </div>
    <h2 id="periodoFechas" class="text-muted text-center fs-4">ff</h2>
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

<div class="row">
    <!-- Primera fila: Monto Metodo Pago y Transacciones Metodo Pago -->
    <div class="col-md-6">
        <div id="loadingMontoMetodoPago" style="display: none; text-align: center;">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p>Cargando datos de monto Metodo Pago...</p>
        </div>
        <div id="chartMontoMetodoPago" style="height: 300px;"></div>
    </div>
    <div class="col-md-6">
        <div id="loadingTransaccionesMetodoPago" style="display: none; text-align: center;">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p>Cargando datos de transacciones Metodo Pago...</p>
        </div>
        <div id="chartTransaccionesMetodoPago" style="height: 300px;"></div>
    </div>
</div>

<div class="row">
    <!-- Segunda fila: Cantidad Productos y Ventas Sucursal -->
    <div class="col-md-6">
        <div id="loadingCantidadProductos" style="display: none; text-align: center;">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p>Cargando datos de cantidad productos...</p>
        </div>
        <div id="chartCantidadProductos" style="height: 300px;"></div>
    </div>
    <div class="col-md-6">
        <div id="loadingVentasSucursal" style="display: none; text-align: center;">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p>Cargando datos de ventas sucursal...</p>
        </div>
        <div id="chartVentasSucursal" style="height: 300px;"></div>
    </div>
</div>

<div class="row">
    <!-- Tercera fila: Ganancia Departamentos -->
    <div class="col-md-12">
        <div id="loadingGananciaDepartamentos" style="display: none; text-align: center;">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p>Cargando datos de ganancias departamentos...</p>
        </div>
        <div id="chartGananciaDepartaemntos" style="height: 400px;"></div>
    </div>
</div>

<div class="row">
    <!-- Cuarta fila: Ganancia Categorias -->
    <div class="col-md-12">
        <div id="loadingGananciaCategoria" style="display: none; text-align: center;">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p>Cargando datos de ganancias categorias...</p>
        </div>
        <div id="chartGananciaCategorias" style="height: 400px;"></div>
    </div>
</div>

@endsection

@section('scripts')
@vite('resources/js/graficosGenerales.js')
@endsection