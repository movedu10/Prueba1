<?php
$ipsPermitidas = [
    "127.0.0.1",
    "TU.IP.PUBLICA"
];

if (!in_array($_SERVER['REMOTE_ADDR'], $ipsPermitidas)) {
    http_response_code(403);
    exit("Acceso denegado");
}
