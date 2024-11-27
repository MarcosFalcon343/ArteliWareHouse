<?php

namespace App\Http\Controllers;

use App\Models\CantidadProductosDiario;
use LaravelDaily\LaravelCharts\Classes\LaravelChart;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function index()
    {
        return view('index');
    }
}
