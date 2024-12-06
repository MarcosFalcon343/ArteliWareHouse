<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ProductoReporteController extends Controller
{
    /**
     * Obtener productos relacionados con la frecuencia, inventario y porcentaje de probabilidad.
     */
    public function productosRelacionadosDimension2(Request $request)
    {
        // Validar el parámetro de entrada
        $request->validate([
            'IdProducto' => 'required|integer',
        ]);

        $IdProducto = $request->input('IdProducto');

        // Consulta con nombre del producto, frecuencia, inventario global y porcentaje de probabilidad
        $productos = DB::select("
        WITH FrecuenciaTotal AS (
            SELECT 
                SUM(Frecuencia) AS TotalFrecuencia
            FROM 
                patrones_dimension2
            WHERE 
                Producto1 = ?
        )
        SELECT 
            p.Producto2 AS IdProducto,
            pr.Nombre AS Nombre,
            p.Frecuencia AS Frecuencia,
            SUM(i.Cantidad) AS InventarioGlobal,
            (p.Frecuencia / (SELECT TotalFrecuencia FROM FrecuenciaTotal)) * 100 AS PorcentajeProbabilidad
        FROM 
            patrones_dimension2 p
        JOIN inventario i ON p.Producto2 = i.IdProducto
        JOIN productos pr ON p.Producto2 = pr.IdProducto
        WHERE 
            p.Producto1 = ?
        GROUP BY 
            p.Producto2, pr.Nombre, p.Frecuencia
        ORDER BY 
            p.Frecuencia DESC, InventarioGlobal DESC;
    ", [$IdProducto, $IdProducto]);

        // Retornar los resultados como JSON
        return response()->json($productos, 200);
    }

    /**
     * Obtener productos relacionados con la frecuencia, inventario y porcentaje de probabilidad.
     */
    public function productosRelacionadosDimension3(Request $request)
    {
        // Validar el parámetro de entrada
        $request->validate([
            'IdProducto' => 'required|integer',
        ]);

        $IdProducto = $request->input('IdProducto');

        // Consulta con nombre de ambos productos, frecuencia, inventario y porcentaje de probabilidad
        $productos = DB::select("
        WITH FrecuenciaTotal AS (
            SELECT 
                SUM(Frecuencia) AS TotalFrecuencia
            FROM 
                patrones_dimension3
            WHERE 
                Producto1 = ?
        )
        SELECT 
            p.Producto2 AS IdProducto2,
            pr2.Nombre AS NombreProducto2,
            COALESCE(SUM(i2.Cantidad), 0) AS InventarioProducto2,
            p.Producto3 AS IdProducto3,
            pr3.Nombre AS NombreProducto3,
            COALESCE(SUM(i3.Cantidad), 0) AS InventarioProducto3,
            p.Frecuencia AS Frecuencia,
            (p.Frecuencia / (SELECT TotalFrecuencia FROM FrecuenciaTotal)) * 100 AS PorcentajeProbabilidad
        FROM 
            patrones_dimension3 p
        LEFT JOIN inventario i2 ON p.Producto2 = i2.IdProducto
        LEFT JOIN inventario i3 ON p.Producto3 = i3.IdProducto
        JOIN productos pr2 ON p.Producto2 = pr2.IdProducto
        JOIN productos pr3 ON p.Producto3 = pr3.IdProducto
        WHERE 
            p.Producto1 = ?
        GROUP BY 
            p.Producto2, pr2.Nombre, p.Producto3, pr3.Nombre, p.Frecuencia
        ORDER BY 
            p.Frecuencia DESC, InventarioProducto2 DESC, InventarioProducto3 DESC
            LIMIT 10000;
    ", [$IdProducto, $IdProducto]);


        // Retornar los resultados como JSON
        return response()->json($productos, 200);
    }




    /**
     * Obtener la cantidad de productos vendidos por fecha.
     */
    public function cantidadHistorico(Request $request)
    {
        // Validar el parámetro de entrada
        $request->validate([
            'IdProducto' => 'required|integer',
        ]);

        $IdProducto = $request->input('IdProducto');

        // Consulta para las ventas por fecha
        $ventas = DB::table('reportediarioproductos')
            ->select('Fecha', DB::raw('SUM(Cantidad) AS Cantidad'))
            ->where('IdProducto', $IdProducto)
            ->groupBy('Fecha')
            ->orderBy('Fecha')
            ->get();

        return response()->json($ventas, 200);
    }

    /**
     * Obtener el ingreso de productos vendidos por fecha.
     */
    public function IngresoHistorico(Request $request)
    {
        // Validar el parámetro de entrada
        $request->validate([
            'IdProducto' => 'required|integer',
        ]);

        $IdProducto = $request->input('IdProducto');

        // Consulta para las ventas por fecha
        $ventas = DB::table('reportediarioproductos')
            ->select('Fecha', DB::raw('SUM(Ingreso) AS Ingreso'))
            ->where('IdProducto', $IdProducto)
            ->groupBy('Fecha')
            ->orderBy('Fecha')
            ->get();

        return response()->json($ventas, 200);
    }

    /**
     * Obtener la ganancia del productos hisotorico
     */
    public function GananciaHistorico(Request $request)
    {
        // Validar el parámetro de entrada
        $request->validate([
            'IdProducto' => 'required|integer',
        ]);

        $IdProducto = $request->input('IdProducto');

        // Consulta para las ventas por fecha
        $ventas = DB::table('reportediarioproductos')
            ->select('Fecha', DB::raw('SUM(Ganancia) AS Ganancia'))
            ->where('IdProducto', $IdProducto)
            ->groupBy('Fecha')
            ->orderBy('Fecha')
            ->get();

        return response()->json($ventas, 200);
    }
}
