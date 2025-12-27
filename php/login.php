<?php
session_start();
require 'conexion.php';

$data = json_decode(file_get_contents("php://input"), true);

$usuario = $data['usuario'];
$password = $data['password'];

$stmt = $conn->prepare("SELECT password FROM usuarios WHERE usuario=?");
$stmt->bind_param("s", $usuario);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 1) {
    $stmt->bind_result($hash);
    $stmt->fetch();

    if (password_verify($password, $hash)) {
        $_SESSION['admin'] = true;
        echo "ok";
        exit;
    }
}

http_response_code(401);
