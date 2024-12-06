<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;

class ProductosController extends Controller
{
    public function index()
    {
        return view('Productos.productos');
    }

    public function show($id)
    {
        $producto = Producto::find($id);
        return view('Productos.producto', ['idProducto' => $id, 'producto' => $producto]);
    }
}
