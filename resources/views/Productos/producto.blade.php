@extends('layouts.layout')

@section('title', 'Productos')

@section('head')
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
<link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.min.css">
<script src="https://code.jquery.com/jquery-3.5.1.js"></script>
<script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
@endsection

@section('content')
<h1>Detalles del Producto:</h1>
<h2>{{ $producto->Nombre }} {{ $producto->Unidad_de_medida }}</h2>
<p id="idProducto" data-idproducto="{{ $idProducto }}">ID del Producto: {{ $idProducto }}</p>


<div class="row">
    <div class="col-md-4">
        <p><strong>Precio:</strong> ${{ number_format($producto->Precio, 2) }}</p>
    </div>
    <div class="col-md-4">
        <p><strong>Costo:</strong> ${{ number_format($producto->Costo, 2) }}</p>
    </div>
    <div class="col-md-4">
        <p><strong>Descuentos:</strong> ${{ number_format($producto->Descuentos, 2) }}</p>
    </div>
</div>

<div class="producto-item">
    <h3>Descripción:</h3>
    <p>{{ $producto->Descripcion }}</p>
</div>

<hr class="my-4">
<H2>Graficas</H2>

<div id="date-buttons" class="d-flex flex-wrap justify-content-start gap-2 mt-3">
    <button id="last_week" class="btn btn-outline-primary btn-sm">Última semana</button>
    <button id="last_two_weeks" class="btn btn-outline-primary btn-sm">Últimas dos semanas</button>
    <button id="one_month" class="btn btn-outline-primary btn-sm">Último mes</button>
    <button id="three_months" class="btn btn-outline-primary btn-sm">Últimos 3 meses</button>
    <button id="six_months" class="btn btn-outline-primary btn-sm">Últimos 6 meses</button>
    <button id="one_year" class="btn btn-outline-primary btn-sm">Último año</button>
    <button id="all" class="btn btn-outline-primary btn-sm">Todo</button>
</div>

<div class="container m-3">
    <!-- Gráfico Ganancia (superior) -->
    <div class="row">
        <div class="col-md-12">
            <div id="loadingGanancia" style="display: none; text-align: center;">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p>Cargando datos de ganancia...</p>
            </div>
            <div id="chartGanancia" data-idproducto="{{ $idProducto }}"></div>
        </div>
    </div>

    <!-- Gráficos Cantidad e Ingreso -->
    <div class="row">
        <!-- Gráfico Cantidad -->
        <div class="col-md-6">
            <div id="loadingCantidad" style="display: none; text-align: center;">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p>Cargando datos de cantidad...</p>
            </div>
            <div id="chartCantidad" data-idproducto="{{ $idProducto }}"></div>
        </div>

        <!-- Gráfico Ingreso -->
        <div class="col-md-6">
            <div id="loadingIngreso" style="display: none; text-align: center;">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p>Cargando datos de ingreso...</p>
            </div>
            <div id="chartIngreso" data-idproducto="{{ $idProducto }}"></div>
        </div>
    </div>
</div>
<hr class="my-4">
<h2>Patrones de compra de 2 dimensiones</h2>
<div class="container">
    <table id="PatronDimension2" class="table table-striped">
        <thead>
            <tr>
                <th>ID Producto</th>
                <th>Nombre</th>
                <th>Frecuencia</th>
                <th>Inventario Global</th>
                <th>Porcentaje de Probabilidad</th>
            </tr>
        </thead>
        <tbody>
            <!-- Los datos se llenarán dinámicamente aquí -->
        </tbody>
    </table>
</div>
<hr class="my-4">

<h2>Patrones de compra de 3 dimensiones</h2>
<hr class="my-4">
<div class="container">
    <table id="PatronDimension3" class="table table-striped">
        <thead>
            <tr>
                <th>ID Producto 2</th>
                <th>Nombre Producto 2</th>
                <th>Inventario Producto 2</th>
                <th>ID Producto 3</th>
                <th>Nombre Producto 3</th>
                <th>Inventario Producto 3</th>
                <th>Frecuencia</th>
                <th>Porcentaje de Probabilidad</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
</div>
<hr class="my-4">
<div class="d-flex justify-content-between">
    <strong>Fecha de Creación:</strong>
    <span>{{ \Carbon\Carbon::parse($producto->Fecha_creacion)->format('d/m/Y H:i') }}</span>
    <strong>Última Actualización:</strong>
    <span>{{ \Carbon\Carbon::parse($producto->Fecha_actualizacion)->format('d/m/Y H:i') }}</span>
</div>

@endsection

@section('scripts')
@vite('resources/js/graficoProducto.js')
@endsection