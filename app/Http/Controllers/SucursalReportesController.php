<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SucursalReportesController extends Controller
{
    public function NumeroProductosVendidos(Request $request)
    {
        $fechaInicio = $request->input('fecha_inicio', '2023-01-01');
        $fechaFin = $request->input('fecha_fin', '2023-01-01');

        $data = DB::table('reportediariosucursal as R')
            ->join('Sucursales as S', 'R.NoSucursal', '=', 'S.NoSucursal')
            ->select('S.Nombre', DB::raw('SUM(R.CantidadProductos) as Cantidad'))
            ->whereBetween('Fecha', [$fechaInicio, $fechaFin])
            ->groupBy('R.NoSucursal')
            ->orderBy('Cantidad', 'DESC')
            ->limit(10)
            ->get();

        return response()->json($data);
    }

    public function TotalVentas(Request $request)
    {
        $fechaInicio = $request->input('fecha_inicio', '2023-01-01');
        $fechaFin = $request->input('fecha_fin', '2023-01-31');

        $data = DB::table('reportediariosucursal as R')
            ->join('Sucursales as S', 'R.NoSucursal', '=', 'S.NoSucursal')
            ->select('S.Nombre', DB::raw('SUM(R.TotalVenta) as Venta'))
            ->whereBetween('Fecha', [$fechaInicio, $fechaFin])
            ->groupBy('R.NoSucursal')
            ->orderBy('Venta', 'DESC')
            ->limit(10)
            ->get();

        return response()->json($data);
    }

    public function CantidadProductosPorHora(Request $request)
    {
        $fechaInicio = $request->input('fecha_inicio', '2023-01-01');
        $fechaFin = $request->input('fecha_fin', '2023-01-31');
        $horaInicio = $request->input('hora_inicio', '07:00');
        $horaFin = $request->input('hora_fin', '22:00');

        $data = DB::table('reportehorasucursal as R')
            ->join('Sucursales as S', 'R.NoSucursal', '=', 'S.NoSucursal')
            ->select('S.Nombre', 'R.Hora', DB::raw('SUM(R.CantidadProductos) as Cantidad'))
            ->whereBetween('Fecha', [$fechaInicio, $fechaFin])
            ->whereBetween('Hora', [$horaInicio, $horaFin])
            ->groupBy('R.NoSucursal', 'R.Hora')
            ->orderBy('Hora')
            ->orderBy('Cantidad', 'DESC')
            ->get();

        return response()->json($data);
    }

    public function TransaccionesPorHora(Request $request)
    {
        $fechaInicio = $request->input('fecha_inicio', '2023-01-01');
        $fechaFin = $request->input('fecha_fin', '2023-01-31');
        $horaInicio = $request->input('hora_inicio', '07:00');
        $horaFin = $request->input('hora_fin', '22:00');

        $data = DB::table('reportehorasucursal as R')
            ->join('Sucursales as S', 'R.NoSucursal', '=', 'S.NoSucursal')
            ->select('S.Nombre', 'R.Hora', DB::raw('SUM(R.CantidadVentas) as Transacciones'))
            ->whereBetween('Fecha', [$fechaInicio, $fechaFin])
            ->whereBetween('Hora', [$horaInicio, $horaFin])
            ->groupBy('R.NoSucursal', 'R.Hora')
            ->orderBy('Hora')
            ->orderBy('Transacciones', 'DESC')
            ->get();

        return response()->json($data);
    }

    public function VentasPorHora(Request $request)
    {
        $fechaInicio = $request->input('fecha_inicio', '2023-01-01');
        $fechaFin = $request->input('fecha_fin', '2023-01-31');
        $horaInicio = $request->input('hora_inicio', '07:00');
        $horaFin = $request->input('hora_fin', '22:00');

        $data = DB::table('reportehorasucursal as R')
            ->join('Sucursales as S', 'R.NoSucursal', '=', 'S.NoSucursal')
            ->select('S.Nombre', 'R.Hora', DB::raw('SUM(R.TotalVentas) as Ventas'))
            ->whereBetween('Fecha', [$fechaInicio, $fechaFin])
            ->whereBetween('Hora', [$horaInicio, $horaFin])
            ->groupBy('R.NoSucursal', 'R.Hora')
            ->orderBy('Hora')
            ->orderBy('Ventas', 'DESC')
            ->get();

        return response()->json($data);
    }
}
