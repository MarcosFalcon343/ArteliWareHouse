<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ProductosReportesController extends Controller
{
    public function Cantidad(Request $request)
    {
        $request->validate([
            'fechaInicio' => 'required|date',
            'fechaFin' => 'required|date|after_or_equal:fechaInicio',
        ]);

        $fechaInicio = $request->input('fechaInicio');
        $fechaFin = $request->input('fechaFin');

        $CantidadProductos = DB::table('ReporteDiarioProductos as R')
            ->join('Productos as P', 'R.IdProducto', '=', 'P.IdProducto')
            ->select('P.IdProducto', 'P.Nombre', DB::raw('SUM(R.Cantidad) as TotalVendido'))
            ->whereBetween('R.Fecha', [$fechaInicio, $fechaFin])
            ->groupBy('R.IdProducto', 'P.Nombre')
            ->orderByDesc('TotalVendido')
            ->limit(10)
            ->get();

        return response()->json($CantidadProductos, 200);
    }

    public function Ingreso(Request $request)
    {
        $request->validate([
            'fechaInicio' => 'required|date',
            'fechaFin' => 'required|date|after_or_equal:fechaInicio',
        ]);

        $fechaInicio = $request->input('fechaInicio');
        $fechaFin = $request->input('fechaFin');

        $ingreseoProductos = DB::table('ReporteDiarioProductos as R')
            ->join('Productos as P', 'R.IdProducto', '=', 'P.IdProducto')
            ->select('P.IdProducto', 'P.Nombre', DB::raw('SUM(R.Ingreso) as TotalIngreso'))
            ->whereBetween('R.Fecha', [$fechaInicio, $fechaFin])
            ->groupBy('R.IdProducto', 'P.Nombre')
            ->orderByDesc('TotalIngreso')
            ->limit(10)
            ->get();

        return response()->json($ingreseoProductos, 200);
    }

    public function Ganancia(Request $request)
    {
        $request->validate([
            'fechaInicio' => 'required|date',
            'fechaFin' => 'required|date|after_or_equal:fechaInicio',
        ]);

        $fechaInicio = $request->input('fechaInicio');
        $fechaFin = $request->input('fechaFin');

        $ingreseoProductos = DB::table('ReporteDiarioProductos as R')
            ->join('Productos as P', 'R.IdProducto', '=', 'P.IdProducto')
            ->select('P.IdProducto', 'P.Nombre', DB::raw('SUM(R.Ganancia) as TotalGanancia'))
            ->whereBetween('R.Fecha', [$fechaInicio, $fechaFin])
            ->groupBy('R.IdProducto', 'P.Nombre')
            ->orderByDesc('TotalGanancia')
            ->limit(10)
            ->get();

        return response()->json($ingreseoProductos, 200);
    }

    public function Descuentos(Request $request)
    {
        $request->validate([
            'fechaInicio' => 'required|date',
            'fechaFin' => 'required|date|after_or_equal:fechaInicio',
        ]);

        $fechaInicio = $request->input('fechaInicio');
        $fechaFin = $request->input('fechaFin');

        $descuentosProductos = DB::table('ReporteDiarioProductos as R')
            ->join('Productos as P', 'R.IdProducto', '=', 'P.IdProducto')
            ->select('P.IdProducto', 'P.Nombre', DB::raw('SUM(R.Descuentos) as TotalDescuento'))
            ->whereBetween('R.Fecha', [$fechaInicio, $fechaFin])
            ->groupBy('R.IdProducto', 'P.Nombre')
            ->orderByDesc('TotalDescuento')
            ->limit(10)
            ->get();

        return response()->json($descuentosProductos, 200);
    }

    public function Productos(Request $request)
    {
        $Productos = Producto::all(['IdProducto', 'Nombre', 'Precio', 'Costo', 'Descuentos', 'Unidad_de_medida']);
        return response()->json($Productos, 200);
    }
}