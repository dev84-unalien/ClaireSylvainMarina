<?php

header("Access-Control-Allow-Origin: *");

// Connexion base de donnée
$connexion = new mysqli("mysql-nectardedemo.alwaysdata.net", "170341_dev2019", "dev2019form", "nectardedemo_versus");

/* Vérification de la connexion */
if ($connexion->connect_errno) {
    printf("Echec de la connexion: %s\n", $connexion->connect_error);
    exit();
}

// Ecrire la requete SQL à exécuté
$request = $connexion->prepare("SELECT `id`, `nom`, `pv`, `pa`, `url` FROM `versus`");

// Exécute la requete
$request->execute();

// Initialiser des variables vide pour utiliser plus tard
$bdd_id = null;
$bdd_nom = null;
$bdd_pv = null;
$bdd_pa = null;
$bdd_url = null;

// Associe les valeurs recues par la base de donnée aux variables déclarées précedement 
$request->bind_result($bdd_id, $bdd_nom, $bdd_pv, $bdd_pa, $bdd_url);

// Initialise une variable vide sous forme de tableau
$personnage = [];

// Une boucle qui permet d'associer les valeurs de la BDD en créant une nouvelle ligne dans le tableau 
while ($request->fetch()) {    
    $personnage[] = [
        "id" => $bdd_id,
        "nom" => $bdd_nom,
        "pv" => $bdd_pv,
        "pa" => $bdd_pa,
        "url" => $bdd_url
    ];
}

// Encode notre tableau $personnage en JSON pour pouvoir le récupérer avec le JS
echo json_encode($personnage);

$request->close();
$connexion->close();

?>