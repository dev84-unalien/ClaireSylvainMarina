$(document).ready(getPersonnage());

function getPersonnage() {

    $.ajax({
        url: "http://localhost/ClaireSylvainMarina/get_versus.php",
        type: 'GET',
        // Recoit le résultat du php (echo json_encode($personnage))
        success: function success(personnage) {

            personnage = JSON.parse(personnage);
            var length = personnage.length;

            $("#image1").append(` 
                <img src="` + personnage[0].url + `" alt="" class="img1"></img>
            `);

            $("#image2").append(` 
                <img src="` + personnage[0].url + `" alt="" class="img2"></img>
            `);

            for (var i = 0 ; i < length ; i++ ){

                $("#joueur1").append(` 
                    <option value="` + personnage[i].url + `">` + personnage[i].nom + `</option>                    
                `);              
                
                $("#joueur2").append(` 
                    <option value="` + personnage[i].url + `">` + personnage[i].nom + `</option>                    
                `);
            }
        },

        error: function error(erreur) {
            console.log(erreur);
        }
    })

    var personnage1 = $("option:joueur1").val();
    var personnage2 = $("option:joueur2").val();
}

function selecImg1(url) {    
    $(".img1").prop("src", url);
}

function selecImg2(url) {
    $(".img2").prop("src", url);
}

function launchFight() {
    // setInterval(fight, 2000);
    fight();
}

function fight() {
}