<?php
session_start();
if (!isset($_SESSION['admin'])) exit;

require 'conexion.php';

$contenido = file_get_contents("php://input");

$conn->query("DELETE FROM noticias");

$stmt = $conn->prepare("INSERT INTO noticias (contenido) VALUES (?)");
$stmt->bind_param("s", $contenido);
$stmt->execute();

echo "Guardado correctamente";
