// Déclare & Initialise des variables globales sous forme de tableau vide
let personnage1 = [];
let personnage2 = [];

// Déclare & Initialise une variable globale
var myFight = 0;

// S'éxécute après le chargement de la page
$(document).ready(function() {

    // Déclare une variable où on lui assigne les clés et valeurs stocké dans le localstorage qui est sous forme de JSON
    let perso1JSON = localStorage.getItem("personnage1");
    
    // Si la variable qui récupère le localstorage est vide alors : "return" (arrete et sort de la fonction)
    if (!perso1JSON) {
      return;
    }

    personnage1 = JSON.parse(perso1JSON); // Transforme le json en tableau JS

    // Voir dessus
    let perso2JSON = localStorage.getItem("personnage2");

    // Voir dessus
    if (!perso2JSON) {
      return;}
    
    // Voir dessus
    personnage2 = JSON.parse(perso2JSON); // Transforme le json en tableau JS

    // Change l'attribut html (avec .prop), dans ce cas là <img src=""> et lui donne l'image reçu par le localstorage stocké dans la variable personnage1
    $("#img1").prop("src", personnage1[0].url);
    $("#img2").prop("src", personnage2[0].url);
    
    // Change le contenu du html dans la balise selectionné (.name1) avec le nom reçu par le localstorage stocké dans la variable personnage1
    $(".name1").html(personnage1[0].nom);
    $(".name2").html(personnage2[0].nom);
    
    // Créer un fonction setInterval qui permet d'éxécuté la fonction contenue à l'interieur (fight) toute les milisecondes donnés en paramètre (2000) et stock le tout dans une variable myFight
    myFight = setInterval(fight, 2000);
    
    // Change l'attribut html (avec .prop), dans ce cas là <progress max="" et lui donne les pv reçus par le localstorage stocké dans la variable personnage1
    $("#health_1").prop("max", personnage1[0].pv);
    $("#health_2").prop("max", personnage2[0].pv);

});

// Déclare & Initialise la variable globale round à "true"
let round = true;

function fight() {

    // Si round est "true" :
    if ( round ) {
        // Calcul les pv du personnage2 : pv actuel - pa reçu
        personnage2[0].pv = personnage2[0].pv - Math.floor(Math.random() * (personnage1[0].pa - 0 + 1)) + 0;
        // Affiche dans la console les pv actuels
        console.log( personnage2[0].pv );

        // Change l'attribut html (avec .prop), dans ce cas là <progress value="" et lui donne les pv actuels
        $("#health_1").prop("value", personnage1[0].pv);

        // Passe round à "false" pour une fois que le if ce soit exécuté, le else s'éxécute au tour d'àprès
        round = false;
    } else {
        // Voir dessus
        personnage1[0].pv = personnage1[0].pv - Math.floor(Math.random() * (personnage1[0].pa - 0 + 1)) + 0;
        console.log( personnage1[0].pv );

        $("#health_2").prop("value", personnage2[0].pv);

         round = true; }

         // Si les pv d'un personnage sont égales où inferieur à 0 :
    if ( personnage1[0].pv <= 0 || personnage2[0].pv <= 0 ) {

        // Arrete la fonction setInterval qui exécutait la fonction fight toute les 2000ms
        clearInterval(myFight);

        // Si personnage1 <= à 0 :
        if ( personnage1[0].pv <= 0 ) {
            // Change l'attribut html (avec .prop), dans ce cas là <progress value="" et lui donne les pv actuels
            $("#health_1").prop("value", personnage1[0].pv);
            $("#health_2").prop("value", personnage2[0].pv);
            // Cache le personnage mort
            $("#img1").css("display", "none");
            // Change le contenu du html dans la balise selectionné (.name1) par "DIED"
            $(".name1").html("DIED");
        }
        else {
            $("#health_1").prop("value", personnage1[0].pv);
            $("#health_2").prop("value", personnage2[0].pv);
            $("#img2").css("display", "none");
            $(".name2").html("DIED");
        }
    }
}

