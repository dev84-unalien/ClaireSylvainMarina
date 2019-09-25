<?php

header("Access-Control-Allow-Origin: *");

$nom = $_POST['nom'];
$pv = $_POST['pv'];
$pa = $_POST['pa'];
$url = $_POST['url'];

$connexion = new mysqli("mysql-nectardedemo.alwaysdata.net", "170341_dev2019", "dev2019form", "nectardedemo_versus");

/* Vérification de la connexion */
if ($connexion->connect_errno) {
    printf("Echec de la connexion: %s\n", $connexion->connect_error);
    exit();
}

$request = $connexion->prepare("INSERT INTO `versus` (`nom`, `pv`, `pa`, `url`) VALUES (?, ?, ?, ?)");
                                // INSERT INTO `versus` (`id`, `nom`, `pv`, `pa`, `url`) VALUES (NULL, 'sylv', '15', '17', 'vvv');

$request->bind_param("ssss", $nom, $pv, $pa, $url);

$request->execute();
$request->close();

$connexion->close();

?>


 