<?php
require_once(realpath(dirname(__FILE__)) . "../../controller/auth/ControllerAuth.class.php");

$ControllerAuth::verificarSessaoTelaLogin();

// echo session_status();


//a

?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>

    <link rel="stylesheet" href="login.css">


    <link rel="stylesheet" href="/cafe/biblioteca/css/elements.css">
    <link rel="stylesheet" href="/cafe/biblioteca/css/presets.css">

    <!-- @imports do CSS de layouts default e das paginas-->
    <link rel="stylesheet" href="/cafe/biblioteca/css/layouts.css">
    <!-- <link rel="stylesheet" href="/cafe/biblioteca/css/global.css"> -->

    
    <script src="login.js" type="module" defer="true"></script>
</head>

<body>
    <div class="login-fundo">

        <div class="login-centro">
            <div class="login-centro__titulo"> Login</div>


            <form class="login-centro__form" id="login-centro__form" autocomplete="off">



                <input type="text" id="usuario" name="usuario" class="usuario"  placeholder="Usuário" required>


                <input type="password" name="senha" class="senha" id="senha" placeholder="Senha" autocomplete="off" required>

                <button id="btn-login" class="btn-login">Login</button>



            </form>

        </div>



        <div class="login-direitos">
            <div>
                Powered by Mantovani Soluções Tecnológicas.
            </div>
            <div>
                <!-- © 2021 Todos os direitos reservados . -->
            </div>


        </div>




    </div>
</body>

</html>