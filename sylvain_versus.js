let _personnages = [];
var newFight1 = {};
var newFight2 = {};

$(document).ready(getPersonnage());

function getPersonnage() {

    $.ajax({
        url: "http://localhost/ClaireSylvainMarina/get_versus.php",
        type: 'GET',
        // Recoit le résultat du php (echo json_encode($personnage))
        success: function success(personnage) {

            personnage = JSON.parse(personnage);
            _personnages = personnage;
            var length = personnage.length;
            
            $("#image1").empty();
            $("#image2").empty();

            $("#image1").append(` 
                <img src="kirby.png" alt="" class="img1"></img>
            `);

            $("#image2").append(` 
                <img src="kirby.png" alt="" class="img2"></img>
            `);

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

function selecPersonnage1(id) {    
    // Grace a l'id recuperé, on pioche dans _personnages les infos du perso
    let perso1 = _personnages.find(perso1 => perso1.id == id);

    $(".img1").prop("src", perso1.url);

    newFight1 = {
        nom: perso1.nom,
        url: perso1.url,
        pv: perso1.pv,
        pa: perso1.pa
      };
      
}

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

let launchFight1 = [];
let launchFight2 = [];

function fight() {
   
  // ON pousse / ajoute l'objet au tableau global
  launchFight1.push(newFight1);
  launchFight2.push(newFight2);

  // On prepare le JSON pour le stockage dans le localStorage
  let json1 = JSON.stringify(launchFight1); // Moulinette du JSON
  let json2 = JSON.stringify(launchFight2); 

  // On insert dans le localStorage
  localStorage.setItem("personnage1", json1); // F12 -> Application -> localstorage
  localStorage.setItem("personnage2", json2); // F12 -> Application -> localstorage

  location = "index.html";
}


// Ajouter un personnage
function ajoutPerso() {
    
    var nom = $("#nom").val();
    var url = $("#url").val();
    var pv = $("#pv").val();
    var pa = $("#pa").val();

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

    getPersonnage();
}