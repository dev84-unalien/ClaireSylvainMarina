
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
}