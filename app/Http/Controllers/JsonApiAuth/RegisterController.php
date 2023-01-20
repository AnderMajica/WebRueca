<?php

namespace App\Http\Controllers\JsonApiAuth;

use App\Http\Controllers\JsonApiAuth\Traits\HasToShowApiTokens;
use App\Http\Requests\JsonApiAuth\RegisterRequest;
use App\Notifications\JsonApiAuth\VerifyEmailNotification;
use http\Env\Request;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class RegisterController
{
    use HasToShowApiTokens;

    public function __invoke(RegisterRequest $request): JsonResponse
    {
        try {

            /** @var User $user */
            $user = User::query()->create([
                 'name' => $request->get('name'),
                 'last_name' => $request->get('last_name'),
                 'email' => $request->get('email'),
                 'password' => Hash::make($request->get('password')),
                 'telephone' => $request->get('telephone'),
                 'address' => $request->get('address'),
                 'artist' => $request->get('artist'),
                 'type_of_art' => $request->get('type_of_art'),
                 'description_user' => $request->get('description_user'),
                 'image' => $this->uploadImage($request->file('image')),
             ]);

            if ($user instanceof MustVerifyEmail && !$user->hasVerifiedEmail()) {
                $user->notify(new VerifyEmailNotification);
            }

            // You can customize on config file if the user would show token on register to directly register and login at once.
            return $this->showCredentials($user, 201, config('json-api-auth.show_token_after_register'));

        } catch (\Exception $exception) {

            return response()->json([
                'message' => $exception->getMessage()
            ], 400);

        }
    }

    public function uploadImage($file)
    {

                $destinationPath = 'images/';
                $filename = time() .'.' .  $file->getClientOriginalName();
                $uploadSucess =  $file->move($destinationPath, $filename);
                return $destinationPath . $filename;

    }
}
