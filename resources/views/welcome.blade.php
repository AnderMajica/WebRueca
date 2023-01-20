<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/png" href="{{ asset('/images/icono.png') }}">
    <link rel="shortcut icon" sizes="192x192" href="{{ asset('/images/icono.png') }}">
    <title>Virtual Museum</title>

    <!-- Fonts -->
    <link href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    @viteReactRefresh
    @vite(['resources/css/app.css','resources/js/app.jsx'])
</head>

<body>
    <div id="app"></div>
</body>

</html>