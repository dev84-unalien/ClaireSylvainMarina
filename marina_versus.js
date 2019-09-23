
// Ajouter un personnage
function ajoutPerso() {

    var nom = $(".ajout_nom_perso").val();
    var image = $(".ajout_image_perso").val();
    var pv = $(".ajout_pv_perso").val();
    var pa = $(".ajout_pa_perso").val();

    $.ajax({
        url: "http://localhost/ClaireSylvainMarina/create_versus.php",
        type: "POST",
        data: {
            nom: nom,
            image: image,
            pv: pv,
            pa: pa
        },
        success: function success(result) {
            alert("Perso ajouté");
            reload();
        },
        error: function error(erreur) {
            console.log("erreur");
        }
    });
}