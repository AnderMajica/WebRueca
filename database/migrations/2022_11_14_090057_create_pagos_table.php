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
        Schema::create('pagos', function (Blueprint $table) {
            $table->id();
            $table->string('precio_pagos');
            $table->foreignId('sala_pagos')->constrained('salas');
            $table->foreignId('usuario')->constrained('users');
            $table->foreignId('piso_pagos')->constrained('pisos');
            //$table->foreign('precios_pagos')->references('precio_sala')->on('salas');
            $table->enum('pagado',['true','false'])->default('false');
            $table->enum('mes_pago',['mensual','trimestral'])->default(null);
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
        Schema::dropIfExists('pagos');
    }
};
