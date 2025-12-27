<?php
session_start();
session_destroy();
header("Location: ../Noticias.html");
exit;
