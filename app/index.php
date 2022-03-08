<?php
require_once(realpath(dirname(__FILE__)) . "../../controller/auth/ControllerAuth.class.php");
$ControllerAuth::verificarSessao();



// echo session_status();
// echo PHP_SESSION_ACTIVE;
// echo $_SESSION["usuario"];
// echo $_SESSION;
// session_regenerate_id(true); // muda o ID da sessão para o ID corrente e invalidar o ID antigo



//Força abrir o endereço em HTTPS
//---------------------------------------------------------------------------------

//Endereços locais para não forçar o HTTPS enquanto estiver desenvolvendo
if ($_SERVER['SERVER_NAME'] !== "localhost" && $_SERVER['SERVER_NAME'] !== "192.168.1.50") {
    // if ($_SERVER['SERVER_NAME'] !== "192.168.0.10") {
    if (!$_SERVER['HTTPS']) {
        $protocolo = 'https://';
        header('Location: ' . $protocolo . $_SERVER['SERVER_NAME'] . $_SERVER['SCRIPT_NAME']);
    }
}




// echo ini_get('session.gc_maxlifetime');
// echo ini_get('session.cache_expire');
// echo session_cache_expire();
?>









<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="shortcut icon" href="/clinica/biblioteca/img/favicon.ico" type="image/x-icon">

    <title>Sistema de Controle</title>

    <!-- Regras gerais de css para todo sistema -->
    <link rel="stylesheet" href="/clinica/biblioteca/css/global.css">
    <link rel="stylesheet" href="/clinica/biblioteca/css/elements.css">
    <link rel="stylesheet" href="/clinica/biblioteca/css/presets.css">

    <!-- @imports do CSS de layouts default e das paginas-->
    <link rel="stylesheet" href="/clinica/biblioteca/css/layouts.css">


    <!-- <link rel="preload" as="script" href="/clinica/view/itens/main/itens.js"> -->


    <script type="module" src="app.js" defer="true"></script>
    <!-- <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script> -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/apexcharts" defer="true"></script> -->




</head>

<body>


    <div class="container">
        <input class="menu-checkbox" type="checkbox" name="" id="menu-checkbox">












        <!-- //HEADER ================================================================================================================= -->
        <header class="header">

            <div class="header__esquerda">
                <div class="menu-checkbox-div">

                    <label for="menu-checkbox" class="menu-checkbox-button">
                        <!-- <i class="fas fa-bars"></i> -->

                        <div class="hamburguer"></div>
                    </label>
                </div>

                <div class="header__esquerda-logo">
                    <div id="voltar-pagina"></div>
                    <span> <a href="/clinica/app/">SIS Clínica </a></span>
                </div>


            </div>


            <div class="header__direita">

                <div class="header__direita-notificacao"></div>

                <svg width="16" height="16" fill="currentColor" class="svg-usuario" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>


                <div class="header__direita-usuario">



                    <span class="header__direita-usuario-nome" id="header__direita-usuario-nome">

                        Admin
                    </span>

                    <div class="logout" id="logout">
                        Sair
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                            <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                        </svg>


                    </div>

                </div>



            </div>

        </header>












        <!-- //MAIN ================================================================================================================= -->
        <main class="main">

            <div class="main__content">




            </div> <!-- "main__content -->

        </main> <!-- main -->













        <!-- checkbox none que vai mostrar o side bar caso esteja  checked -->
        <!-- DEVE FICAR no fundo por conta da postion relative no modo mobile -->
        <!-- //SIDEBAR ================================================================================================================= -->
        <nav class="sidebar" id="sidebar">

            <div class="sidebar__nav-top">
                <h1 class="nav-top__title" id="nav-top__title">

                </h1>

            </div>




            <!-- <div class="sidebar-navegacao-main">                 -->
            <div class="sidebar__nav-menu">




                <!-- Dashboard -->
                <!----------------------------------------------------------------------->
                <a href="#/dashboard" id="dashboard-menu" data-url="dashboard" class="menu-option">
                    <i class="svg-chart"></i>
                    <span>Dashboard</span>
                </a>


               


            
                <!-- Atendimentos -->
                <!----------------------------------------------------------------------->
                <a href="#/atendimentos" id="paciente-menu" data-url="atendimentos" class="menu-option">
                    <i class="svg-cafe"></i>
                    <span>Atendimentos</span>
                </a>



                <!-- Pacientes -->
                <!----------------------------------------------------------------------->
                <a href="#/pacientes" id="paciente-menu" data-url="pacientes" class="menu-option">
                    <i class="svg-pacientes"></i>
                    <span>Pacientes</span>
                </a>


                <!-- Medicamentos -->
                <!----------------------------------------------------------------------->  
                <a href="#/produtos" id="produtos-menu" data-url="produtos" class="menu-option">
                    <!-- <i class="svg-bolsa-mais"></i> -->
                    <i class="svg-pill"></i>

                    <span>Medicamentos</span>
                </a>


                <!-- Estoques -->
                <!----------------------------------------------------------------------->
                <a href="#/estoques" id="estoque-menu" data-url="estoques" class="menu-option">
                    <i class="svg-estoque"></i>
                    <span>Estoques</span>
                </a>



                <!-- Usuários -->
                <!----------------------------------------------------------------------->
                <?php

                if ($_SESSION["acesso"] == "admin") {

                    echo ' 
                    <a href="#/usuarios" id="usuarios-menu" data-url="usuarios" class="menu-option">
                    <i class="svg-usuarios"></i>
                    <span>Usuários</span>
                    </a>';
                }

                ?>
                <!-- <a href="#/usuarios" id="usuarios-menu" data-value="usuarios">
                    <i class="svg-usuarios"></i>
                    <span>Usuários</span>
                </a> -->
                <!-- <li>
                    <i class="svg-usuarios"></i>
                    <a href="#/usuarios" id="usuarios-menu" data-value="usuarios">Usuários</a>
                </li> -->
                <!-- <a href="#/teste" id="teste-menu" data-value="teste">Teste</a> -->
            </div>
            <!-- </div> -->

        </nav>









    </div> <!-- container -->

















    <!-- MODAL============================================================================= -->

    <!-- Janelas ----------------------------------------------------------------- -->
    <!-- <div class="modal-fundo" id="modal-fundo">
        <div class="modal-window-default" id="modal-window">

        </div>
    </div> -->



    <!-- Criar esse elemento no proprio javascript -->
    <div class="modal-fundo" id="modal-fundo">
        <div class="modal-window-default" id="modal-window">

            <div class="modal-window__title">

                <h3 id="modal-window__title-texto"></h3>
                <button type="reset" class="btn-fechar-modal" id="btn-fechar-modal" data-class='fechar-modal'>X</button>

            </div>


            <div class="modal-window__content" id="modal-window__content">

            </div>
        </div>
    </div><!-- modal-container -->






    <!-- Criar esse elementos no proprio javascript -->
    <div class="modal-fundo" id="modal-fundo-custom">
        <div class="modal-window-custom" id="modal-window-custom">

            <div class="modal-window__title">

                <h3 id="modal-window__title-texto"></h3>
                <button type="reset" class="btn-fechar-modal" id="btn-fechar-modal" data-class='fechar-modal'>X</button>

            </div>


            <div class="modal-window__content" id="modal-window__content">

            </div>
        </div>
    </div><!-- modal-container -->














</body>

</html>