<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SucursalReportesController extends Controller
{
    public function NumeroProductosVendidos(Request $request)
    {
        $fechaInicio = $request->input('fechaInicio');
        $fechaFin = $request->input('fechaFin');

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
        $fechaInicio = $request->input('fechaInicio');
        $fechaFin = $request->input('fechaFin');

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
        $fechaInicio = $request->input('fechaInicio', );
        $fechaFin = $request->input('fechaFin');
        $horaInicio = $request->input('horaInicio');
        $horaFin = $request->input('horaFin');

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
        $fechaInicio = $request->input('fechaInicio', );
        $fechaFin = $request->input('fechaFin');
        $horaInicio = $request->input('horaInicio');
        $horaFin = $request->input('horaFin');

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
        $fechaInicio = $request->input('fechaInicio', );
        $fechaFin = $request->input('fechaFin');
        $horaInicio = $request->input('horaInicio');
        $horaFin = $request->input('horaFin');

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
