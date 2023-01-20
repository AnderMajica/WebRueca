<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pagos extends Model
{
    use HasFactory;
    protected $fillable = [
        'precio_pagos',
        'sala_pagos',
        'usuario',
        'piso_pagos',
        'pagado',
        'mes_pago'
    ];

    
}
