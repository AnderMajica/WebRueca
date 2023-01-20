<?php

namespace App\Http\Controllers;

use App\Models\Pisos;
use Illuminate\Http\Request;

class PisosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pisos = Pisos::all();
        return $pisos;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $piso = new Pisos();
        $piso->piso = $request->piso;
        $piso->activo = $request->activo;
        $piso->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $piso = Pisos::find($id);
        return $piso;
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
        $piso = Pisos::findOrfail($request->id);
        $piso->piso = $request->piso;
        $piso->activo = $request->activo;
        return $piso;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $piso = Pisos::destroy($id);
        return $piso;
    }
}
