<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CantidadProductosDiario extends Model
{
    use HasFactory;

    /**
     * Indica el nombre de la tabla asociada al modelo.
     *
     * @var string
     */
    protected $table = 'CantidadProductosDiario';

    /**
     * Indica si el modelo tiene marcas de tiempo (timestamps).
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * Definición de las columnas que se pueden asignar masivamente.
     *
     * @var array
     */
    protected $fillable = [
        'Fecha',
        'NoSucursal',
        'IdProducto',
        'Cantidad',
    ];

    /**
     * Relación con el modelo Producto.
     */
    public function producto()
    {
        return $this->belongsTo(Producto::class, 'IdProducto', 'IdProducto');
    }

    /**
     * Relación con el modelo Sucursal.
     */
    public function sucursal()
    {
        return $this->belongsTo(Sucursal::class, 'NoSucursal', 'NoSucursal');
    }
}
