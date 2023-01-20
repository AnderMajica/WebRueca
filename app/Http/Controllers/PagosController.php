<?php

namespace App\Http\Controllers;

use App\Models\Pagos;
use Illuminate\Http\Request;

class PagosController extends Controller
{
    /**
     * Display a listing of the resource. 
     *
     * @return \Illuminate\Http\Response
     */
    public function listaCompra(Request $request)
    {
        $listaCompra = Pagos::where('usuario', "=", $request->usuario)
                              ->where("pagado", "=", "false")
                              ->get();
        return $listaCompra;
    }


    public function all()
    {
        $pagosAll = Pagos::all();
        return $pagosAll;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $pago = new Pagos();
        $pago->precio_pagos = $request->precio_pagos;
        $pago->sala_pagos = $request->sala_pagos;
        $pago->piso_pagos = $request->piso_pagos;
        $pago->mes_pago = $request->mes_pago;
        $pago->usuario = $request->usuario;
        $pago->pagado = $request->pagado;
        $pago->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // $pago = Pagos::find($id);
        $pago = Pagos::all()->where("sala_pagos", $id);
        return $pago;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        if($request->pagoo === "pagoTrue"){
            // $pago = Pagos::where("sala_pagos", $id);
            $pago = Pagos::where('sala_pagos', $id)->first();;
            $pago->pagado = $request->pagado;
            $pago->save();
        } else{
            $pago = Pagos::findOrFail($id);
            $pago->precio_pagos = $request->precio;
            $pago->pagado = $request->pagado;
            $pago->save();
        }
        // return $pago;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $pago = Pagos::where("sala_pagos", $id)->delete();
        return $pago;
    }
}
