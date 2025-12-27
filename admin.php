<?php
session_start();
if (!isset($_SESSION['admin'])) {
    header("Location: Noticias.html");
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Panel Admin - Parroquia San Rafael Arcángel</title>
    <link rel="icon" type="image/x-icon" href="images/SRA.ico" />
    <link rel="stylesheet" href="css/Noticias.css" />
</head>
<body>

<!--/////////// ENCABEZADO (MISMO NAVBAR) ///////////-->
<header class="encabezado">
    <nav class="navbar">
        <div class="navbar-container">
            <a href="index.html" class="navbar-logo"></a>

            <button class="navbar-toggle" aria-label="Abrir menú">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </button>

            <ul class="navbar-menu">
                <li><a href="index.html"><b>INICIO</b></a></li>
                <li><a href="Informes.html"><b>INFORMES</b></a></li>
                <li><a href="Comunidad.html"><b>COMUNIDAD</b></a></li>
                <li><a href="Contactos.html"><b>CONTACTOS</b></a></li>
                <li><a href="horarios.html"><b>HORARIOS</b></a></li>
                <li><a href="Noticias.html"><b>Avisos y Eventos</b></a></li>
                <li><a href="php/logout.php" style="color:#ffb3b3;"><b>CERRAR SESIÓN</b></a></li>
            </ul>
        </div>
    </nav>
</header>

<!-- TÍTULO -->
<section class="titulo-principal">
    <h1>Panel de Administración</h1>
    <p style="margin-top:10px;">Modo edición activo</p>
</section>

<!-- TOOLBAR ADMIN -->
<div id="toolbar">
    <button id="addParrafo">➕ Añadir Noticia</button>
    <button id="addImagen">🖼️ Subir Imagen</button>
    <button id="guardar">💾 Guardar Cambios</button>
</div>

<!-- CONTENIDO EDITABLE -->
<div id="contenido" contenteditable="true"></div>

<!-- SCRIPTS -->
<script src="js/admin.js"></script>

</body>
</html>
