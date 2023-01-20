<?php

use App\Actions\JsonApiAuth\AuthKit;
use App\Http\Controllers\PagosController;
use App\Http\Controllers\PisosController;
use App\Http\Controllers\SalasController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(SalasController::class)->group(function(){
    route::get("/sala",  "index");
    route::get("/sala/usuario",  "bought");
    route::post("/sala", "store");
    route::get("/sala/{idSala}", "show");
    route::put("/sala/{id}", "update");
    route::put("/sala/estado/{id}", "updateEstado");
    route::delete("/sala/{id}", "destroy");
});
Route::controller(PisosController::Class)->group(function(){
    route::get("/piso", "index");
    route::post("/piso", "store");
    route::get("/piso/{id}", "show");
    route::put("/piso/{id}", "update");
    route::delete("/piso/{id}", "destroy");
});
Route::controller(PagosController::Class)->group(function(){
    route::get("/pago", "listaCompra");
    route::get("/pago/all", "all");
    route::post("/pago", "store");
    route::get("/pago/{id}", "show");
    route::put("/pago/{id}", "update");
    route::delete("/pago/{id}", "destroy");
});


require __DIR__ . '/json-api-auth.php';

/*
|--------------------------------------------------------------------------
| An example of how to use the verified email feature with api endpoints
|--------------------------------------------------------------------------
|
| Here examples of a route using Sanctum middleware and verified middleware.
| And another route using Passport middleware and verified middleware.
| You can install and use one of this official packages.
|
*/

Route::get('/verified-middleware-example', function () {
   return response()->json([
        'message' => 'the email account is already confirmed now you are able to see this message...',
   ]);
})->middleware('auth:sanctum', 'verified');

/*Route::get('/verified-middleware-example', function () {
   return response()->json([
      'message' => 'the email account is already confirmed now you are able to see this message...',
  ]);
})->middleware('auth:api', 'verified');*/
