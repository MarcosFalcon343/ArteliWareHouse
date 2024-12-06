<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MetodoPagoReportesController extends Controller
{
    public function Transacciones(Request $request)
    {
        $fechaInicio = $request->input('fechaInicio');
        $fechaFin = $request->input('fechaFin');

        $data = DB::table('metodopagopordia as R')
            ->join('MetodoPago as M', 'R.IdMetodoPago', '=', 'M.IdMetodoPago')
            ->select('M.Nombre', DB::raw('SUM(R.CantidadTransacciones) as Transacciones'))
            ->whereBetween('Fecha', [$fechaInicio, $fechaFin])
            ->groupBy('R.IdMetodoPago')
            ->orderBy('Transacciones', 'DESC')
            ->get();

        return response()->json($data);
    }

    public function MontoRecaudado(Request $request)
    {
        $fechaInicio = $request->input('fechaInicio');
        $fechaFin = $request->input('fechaFin');

        $data = DB::table('metodopagopordia as R')
            ->join('MetodoPago as M', 'R.IdMetodoPago', '=', 'M.IdMetodoPago')
            ->select('M.Nombre', DB::raw('SUM(R.TotalRecaudado) as Monto'))
            ->whereBetween('Fecha', [$fechaInicio, $fechaFin])
            ->groupBy('R.IdMetodoPago')
            ->orderBy('Monto', 'DESC')
            ->get();

        return response()->json($data);
    }
}
