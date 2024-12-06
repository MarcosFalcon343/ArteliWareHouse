<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DepartamentosController extends Controller
{
    public function index()
    {
        return view('departamentos.departamentos');
    }
}
