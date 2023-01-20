<?php

namespace Database\Seeders;

use App\Models\Salas;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SalasTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $dataSalas = json_decode(file_get_contents(__DIR__ . '\data\salas.json'), true);
       for ($i = 0; $i < count($dataSalas); $i++) {
           Salas::create([
                'id' => $dataSalas[$i]['id'],
                'nombre_sala' => $dataSalas[$i]['nombre_sala'],
                'descripcion_sala' => $dataSalas[$i]['descripcion_sala'],
                'precio_sala' => $dataSalas[$i]['precio_sala'],
                'activo' => $dataSalas[$i]['activo'],
                'piso' => $dataSalas[$i]['piso'],
              ]);
       }
    }
}
