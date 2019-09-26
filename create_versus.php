<?php

header("Access-Control-Allow-Origin: *");

// Créer des variables où l'on stock les donnés envoyé par le JS en data
$nom = $_POST['nom'];
$pv = $_POST['pv'];
$pa = $_POST['pa'];
$url = $_POST['url'];

// Connexion base de donnée
$connexion = new mysqli("mysql-nectardedemo.alwaysdata.net", "170341_dev2019", "dev2019form", "nectardedemo_versus");

/* Vérification de la connexion */
if ($connexion->connect_errno) {
    printf("Echec de la connexion: %s\n", $connexion->connect_error);
    exit();
}

// Ecrire la requete SQL à exécuté avec des valeurs inconnues : VALUES (?, ?, ?, ?)
$request = $connexion->prepare("INSERT INTO `versus` (`nom`, `pv`, `pa`, `url`) VALUES (?, ?, ?, ?)");

// Remplace les valeurs inconnues (?, ?, ?, ?) par les variables déclarés au début du php
$request->bind_param("ssss", $nom, $pv, $pa, $url);

// Exécute la requête
$request->execute();
$request->close();

$connexion->close();

?>


 