// Déclare & Initialise des variables globales que l'on peut utiliser partout dans notre JS
let _personnages = []; // Tableau
var newFight1 = {}; // Objet
var newFight2 = {};

// Exécute cette fonction une fois que le document est chargé
$(document).ready(getPersonnage());

// Fonction pour récupérer les différents personnages de la base de donnée
function getPersonnage() {

    $.ajax({
        url: "http://localhost/ClaireSylvainMarina/get_versus.php",
        type: 'GET',
        // Recoit le résultat du php : (echo json_encode($personnage)) dans get_versus.php
        success: function success(personnage) {

            // Transforme le JSON en tableau 
            personnage = JSON.parse(personnage);
            // Stock le tableau dans la variable globale _personnages
            _personnages = personnage;
            // Déclare une variable lenght qui prend en valeur la longueur du tableau personnage
            var length = personnage.length;
            
            // Vide les balises images
            $("#image1").empty();
            $("#image2").empty();
            
            // Créer une balise image avec une image initiale kirby.png
            $("#image1").append(` 
                <img src="kirby.png" alt="" class="img1"></img>
            `);

            $("#image2").append(` 
                <img src="kirby.png" alt="" class="img2"></img>
            `);

            // Une boucle qui parcour le tableau personnage[] et ajoute des options avec chaque nom des différents personnages
            for (var i = 0 ; i < length ; i++ ){

                $("#joueur1").append(` 
                    <option value="` + personnage[i].id + `">` + personnage[i].nom + `</option>                    
                `);              
                
                $("#joueur2").append(` 
                    <option value="` + personnage[i].id + `">` + personnage[i].nom + `</option>                    
                `);
            }
        },

        error: function error(erreur) {
            console.log(erreur);
        }
    })
}

// Selectionne le personnage voulu
function selecPersonnage1(id) {    
    // Grace a l'id recuperé, on pioche dans _personnages les infos du perso
    let perso1 = _personnages.find(perso1 => perso1.id == id);

    // Modifie l'image initial par l'image du personnage selectionné
    $(".img1").prop("src", perso1.url);

    // Envoie dans la variable globalequi est sous forme d'objet et lui stock le nom, url, pv, pa contenu dans perso1
    newFight1 = {
        nom: perso1.nom,
        url: perso1.url,
        pv: perso1.pv,
        pa: perso1.pa
      };      
}

// Voir au_dessus
function selecPersonnage2(id) {  
    // Grace a l'id recuperé, on pioche dans _personnages les infos du perso
    let perso2 = _personnages.find(perso2 => perso2.id == id);

    $(".img2").prop("src", perso2.url);
    
    newFight2 = {
        nom: perso2.nom,
        url: perso2.url,
        pv: perso2.pv,
        pa: perso2.pa
      };
}

// Déclare & initialise les variables globales sous formes de tableau launchFight1 & launchFight2
let launchFight1 = [];
let launchFight2 = [];

function fight() {
   
  // On pousse / ajoute l'objet au tableau global
  launchFight1.push(newFight1);
  launchFight2.push(newFight2);

  // On prepare le JSON pour le stockage dans le localStorage
  let json1 = JSON.stringify(launchFight1); // Moulinette du JSON
  let json2 = JSON.stringify(launchFight2); 

  // On insert dans le localStorage
  localStorage.setItem("personnage1", json1); // F12 -> Application -> localstorage
  localStorage.setItem("personnage2", json2); // F12 -> Application -> localstorage

  // On redirige vers la page index.html
  location = "index.html";
}


// Ajouter un personnage
function ajoutPerso() {
    
    // Récupère les valeurs dans les inputs et les stock dans les variables correspondantes
    var nom = $("#nom").val();
    var url = $("#url").val();
    var pv = $("#pv").val();
    var pa = $("#pa").val();

    // Envoie dans la base de donné notre personnage avec leur nom, url, pv et pa
    $.ajax({
        url: "http://localhost/ClaireSylvainMarina/create_versus.php",
        type: "POST",
        data: {
            nom: nom,
            url: url,
            pv: pv,
            pa: pa
        },
        success: function success(result) {
            console.log(result);
            // alert("Perso ajouté");
        },
        error: function error(erreur) {
            console.log("erreur");
        }
    });

    // Exécute la fonction getPersonnage() pour actualiser la liste des personnages une fois le personnage créé 
    getPersonnage();
}