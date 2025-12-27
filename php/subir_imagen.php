<?php
session_start();
if (!isset($_SESSION['admin'])) exit;

$nombre = uniqid() . "_" . $_FILES['image']['name'];
$ruta = "../uploads/" . $nombre;

move_uploaded_file($_FILES['image']['tmp_name'], $ruta);
echo "uploads/" . $nombre;
