<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DepartamentoReportesController extends Controller
{
    public function Ventas(Request $request)
    {
        $request->validate([
            'fechaInicio' => 'required|date',
            'fechaFin' => 'required|date|after_or_equal:fechaInicio',
        ]);

        $fechaInicio = $request->input('fechaInicio');
        $fechaFin = $request->input('fechaFin');

        $ventasDepartamentos = DB::table('ReporteDiarioDepartamento as R')
            ->join('Departamentos as D', 'R.IdDepartamento', '=', 'D.IdDepartamento')
            ->select('D.Nombre', DB::raw('SUM(R.Ventas) as TotalVentas'))
            ->whereBetween('R.Fecha', [$fechaInicio, $fechaFin])
            ->groupBy('R.IdDepartamento', 'D.Nombre')
            ->orderByDesc('TotalVentas')
            ->limit(10)
            ->get();

        return response()->json($ventasDepartamentos, 200);
    }

    public function CantidadProductos(Request $request)
    {
        $request->validate([
            'fechaInicio' => 'required|date',
            'fechaFin' => 'required|date|after_or_equal:fechaInicio',
        ]);

        $fechaInicio = $request->input('fechaInicio');
        $fechaFin = $request->input('fechaFin');

        $cantidadProductos = DB::table('ReporteDiarioDepartamento as R')
            ->join('Departamentos as D', 'R.IdDepartamento', '=', 'D.IdDepartamento')
            ->select('D.Nombre', DB::raw('SUM(R.CantidadProductos) as TotalCantidadProductos'))
            ->whereBetween('R.Fecha', [$fechaInicio, $fechaFin])
            ->groupBy('R.IdDepartamento', 'D.Nombre')
            ->orderByDesc('TotalCantidadProductos')
            ->limit(10)
            ->get();

        return response()->json($cantidadProductos, 200);
    }

    public function Ganancia(Request $request)
    {
        $request->validate([
            'fechaInicio' => 'required|date',
            'fechaFin' => 'required|date|after_or_equal:fechaInicio',
        ]);

        $fechaInicio = $request->input('fechaInicio');
        $fechaFin = $request->input('fechaFin');

        $gananciaDepartamentos = DB::table('ReporteDiarioDepartamento as R')
            ->join('Departamentos as D', 'R.IdDepartamento', '=', 'D.IdDepartamento')
            ->select('D.Nombre', DB::raw('SUM(R.Ganancia) as TotalGanancia'))
            ->whereBetween('R.Fecha', [$fechaInicio, $fechaFin])
            ->groupBy('R.IdDepartamento', 'D.Nombre')
            ->orderByDesc('TotalGanancia')
            ->limit(10)
            ->get();

        return response()->json($gananciaDepartamentos, 200);
    }

    public function Ingreso(Request $request)
    {
        $request->validate([
            'fechaInicio' => 'required|date',
            'fechaFin' => 'required|date|after_or_equal:fechaInicio',
        ]);

        $fechaInicio = $request->input('fechaInicio');
        $fechaFin = $request->input('fechaFin');

        $ingresoDepartamentos = DB::table('ReporteDiarioDepartamento as R')
            ->join('Departamentos as D', 'R.IdDepartamento', '=', 'D.IdDepartamento')
            ->select('D.Nombre', DB::raw('SUM(R.Ingreso) as TotalIngreso'))
            ->whereBetween('R.Fecha', [$fechaInicio, $fechaFin])
            ->groupBy('R.IdDepartamento', 'D.Nombre')
            ->orderByDesc('TotalIngreso')
            ->limit(10)
            ->get();

        return response()->json($ingresoDepartamentos, 200);
    }

    public function Transacciones(Request $request)
    {
        $request->validate([
            'fechaInicio' => 'required|date',
            'fechaFin' => 'required|date|after_or_equal:fechaInicio',
        ]);

        $fechaInicio = $request->input('fechaInicio');
        $fechaFin = $request->input('fechaFin');

        $transaccionesDepartamentos = DB::table('ReporteDiarioDepartamento as R')
            ->join('Departamentos as D', 'R.IdDepartamento', '=', 'D.IdDepartamento')
            ->select('D.Nombre', DB::raw('SUM(R.CantidadTickets) as TotalTransacciones'))
            ->whereBetween('R.Fecha', [$fechaInicio, $fechaFin])
            ->groupBy('R.IdDepartamento', 'D.Nombre')
            ->orderByDesc('TotalTransacciones')
            ->limit(10)
            ->get();

        return response()->json($transaccionesDepartamentos, 200);
    }
}
