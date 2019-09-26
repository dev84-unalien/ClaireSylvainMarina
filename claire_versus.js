let personnage1 = [];
let personnage2 = [];

var myFight = 0;

$(document).ready(function() {

    let perso1JSON = localStorage.getItem("personnage1");
    if (!perso1JSON) {
      return;
    }
    personnage1 = JSON.parse(perso1JSON); // Transforme le json en tableau JS

    let perso2JSON = localStorage.getItem("personnage2");
    if (!perso2JSON) {
      return;}

    personnage2 = JSON.parse(perso2JSON); // Transforme le json en tableau JS

    console.log(personnage2[0].url);
    $("#img1").prop("src", personnage1[0].url);
    $("#img2").prop("src", personnage2[0].url);

    $(".name1").html(personnage1[0].nom);
    $(".name2").html(personnage2[0].nom);

    myFight = setInterval(fight, 2000);

    $("#health_1").prop("max", personnage1[0].pv);
    $("#health_2").prop("max", personnage2[0].pv);

});

let round = true;

function fight() {

    if ( round ) {
        personnage2[0].pv = personnage2[0].pv - personnage1[0].pa;
        console.log( personnage2[0].pv );

        $("#health_1").prop("value", personnage1[0].pv);

        round = false;
    } else {
        personnage1[0].pv = personnage1[0].pv - personnage2[0].pa;
        console.log( personnage1[0].pv );

        $("#health_2").prop("value", personnage2[0].pv);

         round = true; }

    if ( personnage1[0].pv <= 0 || personnage2[0].pv <= 0 ) {

        clearInterval(myFight);

        if ( personnage1[0].pv <= 0 ) {
            $("#health_1").prop("value", personnage1[0].pv);
            $("#health_2").prop("value", personnage2[0].pv);
            $("#img1").css("display", "none");
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
