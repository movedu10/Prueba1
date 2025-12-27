<?php
require 'conexion.php';

$r = $conn->query("SELECT contenido FROM noticias ORDER BY id DESC LIMIT 1");
$row = $r->fetch_assoc();

echo $row ? $row['contenido'] : '';
