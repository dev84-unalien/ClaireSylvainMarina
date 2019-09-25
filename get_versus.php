<?php

header("Access-Control-Allow-Origin: *");

$connexion = new mysqli("mysql-nectardedemo.alwaysdata.net", "170341_dev2019", "dev2019form", "nectardedemo_versus");

/* Vérification de la connexion */
if ($connexion->connect_errno) {
    printf("Echec de la connexion: %s\n", $connexion->connect_error);
    exit();
}

$request = $connexion->prepare("SELECT `id`, `nom`, `pv`, `pa`, `url` FROM `versus`");

$request->execute();

$bdd_id = null;
$bdd_nom = null;
$bdd_pv = null;
$bdd_pa = null;
$bdd_url = null;

$request->bind_result($bdd_id, $bdd_nom, $bdd_pv, $bdd_pa, $bdd_url);


$personnage = [];


while ($request->fetch()) {    
    $personnage[] = [
        "id" => $bdd_id,
        "nom" => $bdd_nom,
        "pv" => $bdd_pv,
        "pa" => $bdd_pa,
        "url" => $bdd_url
    ];
}

echo json_encode($personnage);

$request->close();
$connexion->close();

?>