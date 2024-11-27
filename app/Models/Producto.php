<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    /**
     * Indica el nombre de la tabla asociada al modelo.
     *
     * @var string
     */
    protected $table = 'Productos';

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
        'Nombre',
        'Precio',
        'Costo',
        'Descuentos',
        'Unidad_de_medida',
        'Descripcion',
        'Notas',
        'Fecha_creacion',
        'Fecha_actualizacion',
    ];

    /**
     * Relación con el modelo CantidadProductosDiario.
     */
    public function cantidadProductosDiarios()
    {
        return $this->hasMany(CantidadProductosDiario::class, 'IdProducto', 'IdProducto');
    }
}
