<?php

namespace Database\Seeders;

use App\Models\Pisos;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PisosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $dataPisos = json_decode(file_get_contents(__DIR__ . '\data\Pisos.json'), true);
        for ($i = 0; $i < count($dataPisos); $i++) {
            Pisos::create([
                'id' => $dataPisos[$i]['id'],
                'piso' => $dataPisos[$i]['piso'],
                'activo' => $dataPisos[$i]['activo']
            ]);
        }
    }
}
