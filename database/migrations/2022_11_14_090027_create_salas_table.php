<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('salas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_sala',50);
            $table->string('descripcion_sala',50);
            //$table->set('precio_sala',['0','1','2'])->index();
            $table->set('precio_sala',['0','1','2']);
            $table->enum('activo',['Disponible','Ocupado'])->default('Disponible');
            $table->foreignId('piso')->constrained('pisos');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('salas');
    }
};
