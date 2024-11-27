<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class CategoriaReportesController extends Controller
{
    public function Ventas(Request $request)
    {
        $request->validate([
            'fechaInicio' => 'required|date',
            'fechaFin' => 'required|date|after_or_equal:fechaInicio',
        ]);

        $fechaInicio = $request->input('fechaInicio');
        $fechaFin = $request->input('fechaFin');

        $ventasCategoria = DB::table('ReporteDiarioCategoria as R')
            ->join('Categorias as C', 'R.IdCategoria', '=', 'C.IdCategoria')
            ->select('C.Nombre', DB::raw('SUM(R.Ventas) as Ventas'))
            ->whereBetween('R.Fecha', [$fechaInicio, $fechaFin])
            ->groupBy('R.IdCategoria')
            ->orderByDesc('Ventas')
            ->limit(10)
            ->get();

        return response()->json($ventasCategoria, 200);
    }

    public function CantidadProductos(Request $request)
    {
        $request->validate([
            'fechaInicio' => 'required|date',
            'fechaFin' => 'required|date|after_or_equal:fechaInicio',
        ]);

        $fechaInicio = $request->input('fechaInicio');
        $fechaFin = $request->input('fechaFin');

        $cantidadProductosCategoria = DB::table('ReporteDiarioCategoria as R')
            ->join('Categorias as C', 'R.IdCategoria', '=', 'C.IdCategoria')
            ->select('C.Nombre', DB::raw('SUM(R.CantidadProductos) as CantidadProductos'))
            ->whereBetween('R.Fecha', [$fechaInicio, $fechaFin])
            ->groupBy('R.IdCategoria', 'C.Nombre')
            ->orderByDesc('CantidadProductos')
            ->limit(10)
            ->get();

        return response()->json($cantidadProductosCategoria, 200);
    }

    public function Ganancia(Request $request)
    {
        $request->validate([
            'fechaInicio' => 'required|date',
            'fechaFin' => 'required|date|after_or_equal:fechaInicio',
        ]);

        $fechaInicio = $request->input('fechaInicio');
        $fechaFin = $request->input('fechaFin');

        $gananciaCategoria = DB::table('ReporteDiarioCategoria as R')
            ->join('Categorias as C', 'R.IdCategoria', '=', 'C.IdCategoria')
            ->select('C.Nombre', DB::raw('SUM(R.Ganancia) as Ganancias'))
            ->whereBetween('R.Fecha', [$fechaInicio, $fechaFin])
            ->groupBy('R.IdCategoria', 'C.Nombre')
            ->orderByDesc('Ganancias')
            ->limit(10)
            ->get();

        return response()->json($gananciaCategoria, 200);
    }

    public function Ingreso(Request $request)
    {
        $request->validate([
            'fechaInicio' => 'required|date',
            'fechaFin' => 'required|date|after_or_equal:fechaInicio',
        ]);

        $fechaInicio = $request->input('fechaInicio');
        $fechaFin = $request->input('fechaFin');

        $ingresoCategoria = DB::table('ReporteDiarioCategoria as R')
            ->join('Categorias as C', 'R.IdCategoria', '=', 'C.IdCategoria')
            ->select('C.Nombre', DB::raw('SUM(R.Ingreso) as Ingreso'))
            ->whereBetween('R.Fecha', [$fechaInicio, $fechaFin])
            ->groupBy('R.IdCategoria', 'C.Nombre')
            ->orderByDesc('Ingreso')
            ->limit(10)
            ->get();

        return response()->json($ingresoCategoria, 200);
    }

    public function Transacciones(Request $request)
    {
        $request->validate([
            'fechaInicio' => 'required|date',
            'fechaFin' => 'required|date|after_or_equal:fechaInicio',
        ]);

        $fechaInicio = $request->input('fechaInicio');
        $fechaFin = $request->input('fechaFin');

        $transaccionesCategoria = DB::table('ReporteDiarioCategoria as R')
            ->join('Categorias as C', 'R.IdCategoria', '=', 'C.IdCategoria')
            ->select('C.Nombre', DB::raw('SUM(R.CantidadTickets) as Transacciones'))
            ->whereBetween('R.Fecha', [$fechaInicio, $fechaFin])
            ->groupBy('R.IdCategoria', 'C.Nombre')
            ->orderByDesc('Transacciones')
            ->limit(10)
            ->get();

        return response()->json($transaccionesCategoria, 200);
    }
}
