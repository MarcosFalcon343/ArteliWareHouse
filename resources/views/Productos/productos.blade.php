@extends('layouts.layout')

@section('title', 'Productos')

@section('head')
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
<link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.min.css">
<script src="https://code.jquery.com/jquery-3.5.1.js"></script>
<script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
@endsection

@section('content')
<div class=" sticky-top bg-white p-3">
    <div class="d-flex justify-content-between align-items-center">
        <h1>Productos page</h1>
        <div>
            <!--Boton para abrir modal con el catalogo de productos-->
            <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#productosModal">
                <i class="bi bi-search"></i>
            </button>
            <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#dateModal">
                <i class="bi bi-funnel"></i>
            </button>
        </div>
    </div>
    <h2 id="periodoFechas" class="text-muted text-center fs-4">dddd</h2>
</div>

<!-- Modal para mostrar la tabla -->
<div class="modal fade" id="productosModal" tabindex="-1" aria-labelledby="productosModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="productosModalLabel">Productos</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table id="tablaProductos" class="display" style="width:100%">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Costo</th>
                            <th>Descuento</th>
                            <th>Unidad</th>
                            <th>Ir</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
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



<!-- Contenedor del gráfico -->
<div class="container">
    <div class="row">
        <!-- Gráfico Cantidad -->
        <div class="col-md-6 mb-1">
            <div id="loadingCantidad" style="display: none; text-align: center;">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p>Cargando datos de cantidad...</p>
            </div>
            <div id="chartCantidad" style="height: 300px;"></div>
        </div>

        <!-- Gráfico Ingreso -->
        <div class="col-md-6 mb-1">
            <div id="loadingIngreso" style="display: none; text-align: center;">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p>Cargando datos de ingreso...</p>
            </div>
            <div id="chartIngreso" style="height: 300px;"></div>
        </div>

        <!-- Gráfico Ganancia -->
        <div class="col-md-6 mb-1">
            <div id="loadingGanacia" style="display: none; text-align: center;">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p>Cargando datos de ganancia...</p>
            </div>
            <div id="chartGanancia" style="height: 300px;"></div>
        </div>

        <!-- Gráfico Descuentos -->
        <div class="col-md-6 mb-">
            <div id="loadingDescuento" style="display: none; text-align: center;">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p>Cargando datos de descuento...</p>
            </div>
            <div id="chartDescuento" style="height: 300px;"></div>
        </div>

    </div>
</div>

@endsection

@section('scripts')
@vite('resources/js/graficosProductos.js')
<script>
    document.addEventListener("DOMContentLoaded", async function () {
        try {
            const response = await fetch(`/api/data/productos`);
            if (!response.ok) {
                throw new Error("Error al obtener los datos de la API");
            }
            const data = await response.json();
            const tableBody = document.querySelector("#tablaProductos tbody");

            data.forEach((item) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                <td>${item.IdProducto}</td>
                <td>${item.Nombre}</td>
                <td>${parseFloat(item.Precio).toFixed(2)}</td>
                <td>${parseFloat(item.Costo).toFixed(2)}</td>
                <td>${parseFloat(item.Descuentos).toFixed(2)}</td>
                <td>${item.Unidad_de_medida}</td>
                <td class="text-center">
                    <button class="btn btn-outline-primary btn-sm" onclick="window.location.href = '/productos/${item.IdProducto}'">
                        <i class="bi bi-arrow-right"></i>
                    </button>
                </td>
            `;
                tableBody.appendChild(row);
            });

            // Inicializar DataTable después de cargar los datos
            $('#tablaProductos').DataTable({
                responsive: true,
                pageLength: 8,
                autoWidth: false,
                columnDefs: [
                    { width: "10%", targets: 0 }, // ID
                    { width: "40%", targets: 1 }, // Nombre
                    { width: "10%", targets: 2 }, // Precio
                    { width: "10%", targets: 3 }, // Costo
                    { width: "10%", targets: 4 }, // Descuento
                    { width: "10%", targets: 5 }, // Unidad
                    { width: "10%", targets: 6, orderable: false } // Botón
                ],
                language: {
                    url: "https://cdn.datatables.net/plug-ins/1.12.1/i18n/es-ES.json"
                }
            });
        } catch (error) {
            console.error("Error al obtener los datos:", error);
            alert("Hubo un problema al cargar los datos.");
        }
    });
</script>
@endsection