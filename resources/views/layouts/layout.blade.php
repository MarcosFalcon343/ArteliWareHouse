<!DOCTYPE html>
<html lang="es" data-bs-theme="light">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Arteli Warehouse - @yield('title')</title>
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])
    <link rel="icon" href="{{asset('assets/img/icono.png')}}" type="image/png">
    @yield('head')
</head>

<body>
    <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
        style="width: 280px; position: fixed; height: 100vh;">
        <a href="/"
            class="d-flex flex-column align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <img src="{{asset('assets/img/Arteli.png')}}" alt="logo.png"
                style="width: 200px; height: auto; margin-right: 10px">
            <h1 class="display-6">Warehouse</h1>
        </a>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
                <a href="/" class="nav-link text-white">
                    <i class="bi bi-house"></i>
                    Inicio
                </a>
            </li>
            <li>
                <a href="{{route('productos.index')}}" class="nav-link text-white">
                    <i class="bi bi-box-seam"></i>
                    Productos
                </a>
            </li>
            <li>
                <a href="{{route("departamentos.index")}}" class="nav-link text-white">
                    <i class="bi bi-grid"></i>
                    Departamentos
                </a>
            </li>
            <li>
                <a href="{{route('categorias.index')}}" class="nav-link text-white">
                    <i class="bi bi-tags"></i>
                    Categorias
                </a>
            </li>
            <li>
                <a href="{{route('sucursales.index')}}" class="nav-link text-white">
                    <i class="bi bi-shop"></i>
                    Sucursales
                </a>
            </li>
        </ul>
        <hr>
        <a href="{{route('logout')}}" class="d-flex align-items-center text-white text-decoration-none">
            <i class="bi bi-person-circle rounded-circle me-2" style="font-size: 25px;"></i>
            <strong>Cerrar Sesion</strong>
        </a>

    </div>

    <main class="main-content " style="margin-left: 280px;">
        <div class="container ">
            @yield('content')

        </div>
    </main>
    @yield('scripts')  
</body>

</html>