<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductosReportesController;
use App\Http\Controllers\CategoriaReportesController;
use App\Http\Controllers\DepartamentoReportesController;
use App\Http\Controllers\SucursalReportesController;
use App\Http\Controllers\MetodoPagoReportesController;
use App\Http\Controllers\ProductoReporteController;

/*
|----------------------------------------------------------------------
| API Routes
|----------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Rutas de productos
Route::get('reportes/productos/cantidad', [ProductosReportesController::class, 'Cantidad']);
Route::get('reportes/productos/ingreso', [ProductosReportesController::class, 'Ingreso']);
Route::get('reportes/productos/ganancia', [ProductosReportesController::class, 'Ganancia']);
Route::get('reportes/productos/descuentos', [ProductosReportesController::class, 'Descuentos']);
Route::get('data/productos', [ProductosReportesController::class, 'Productos']);

// Rutas de categorías
Route::get('reportes/categoria/ventas', [CategoriaReportesController::class, 'Ventas']);
Route::get('reportes/categoria/cantidad-productos', [CategoriaReportesController::class, 'CantidadProductos']);
Route::get('reportes/categoria/ganancia', [CategoriaReportesController::class, 'Ganancia']);
Route::get('reportes/categoria/ingreso', [CategoriaReportesController::class, 'Ingreso']);
Route::get('reportes/categoria/transacciones', [CategoriaReportesController::class, 'Transacciones']);

// Rutas de departamentos
Route::get('reportes/departamentos/ventas', [DepartamentoReportesController::class, 'Ventas']);
Route::get('reportes/departamentos/cantidad-productos', [DepartamentoReportesController::class, 'CantidadProductos']);
Route::get('reportes/departamentos/ganancia', [DepartamentoReportesController::class, 'Ganancia']);
Route::get('reportes/departamentos/ingreso', [DepartamentoReportesController::class, 'Ingreso']);
Route::get('reportes/departamentos/transacciones', [DepartamentoReportesController::class, 'Transacciones']);


// Rutas para Sucursales
Route::get('reportes/sucursal/productos-vendidos', [SucursalReportesController::class, 'NumeroProductosVendidos']);
Route::get('reportes/sucursal/total-ventas', [SucursalReportesController::class, 'TotalVentas']);
Route::get('reportes/sucursal/productos-por-hora', [SucursalReportesController::class, 'CantidadProductosPorHora']);
Route::get('reportes/sucursal/transacciones-por-hora', [SucursalReportesController::class, 'TransaccionesPorHora']);
Route::get('reportes/sucursal/ventas-por-hora', [SucursalReportesController::class, 'VentasPorHora']);

// Rutas para Métodos de Pago
Route::get('reportes/metodo-pago/transacciones', [MetodoPagoReportesController::class, 'Transacciones']);
Route::get('reportes/metodo-pago/monto-recaudado', [MetodoPagoReportesController::class, 'MontoRecaudado']);

// Rutas para Producto
Route::get('reportes/producto/productos-relacionados-dimension2', [ProductoReporteController::class, 'productosRelacionadosDimension2']);
Route::get('reportes/producto/productos-relacionados-dimension3', [ProductoReporteController::class, 'productosRelacionadosDimension3']);
Route::get('reportes/producto/cantidad-historico', [ProductoReporteController::class, 'cantidadHistorico']);
Route::get('reportes/producto/ingreso-historico', [ProductoReporteController::class, 'IngresoHistorico']);
Route::get('reportes/producto/ganancia-historico', [ProductoReporteController::class, 'GananciaHistorico']);
