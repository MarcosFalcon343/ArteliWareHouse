<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sucursal extends Model
{
    use HasFactory;

    /**
     * Indica el nombre de la tabla asociada al modelo.
     *
     * @var string
     */
    protected $table = 'Sucursales';

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
        'RFC',
        'Telefono',
        'Direccion',
        'HoraApertura',
        'HoraCierre',
        'FechaCreacion',
        'FechaActualizacion',
    ];

    /**
     * Relación con el modelo CantidadProductosDiario.
     */
    public function cantidadProductosDiarios()
    {
        return $this->hasMany(CantidadProductosDiario::class, 'NoSucursal', 'NoSucursal');
    }
}
