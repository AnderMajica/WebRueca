<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salas extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'nombre_sala',
        'descripcion_sala',
        'precio_sala',
        'activo',
        'piso',
        'created_at',
        'updated_at'
    ];

    public function pagos()
    {
    return $this->hasMany(Pagos::class);
    }
}
