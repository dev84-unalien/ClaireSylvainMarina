function recupDeDonnees() {

    $.ajax({
        url: "http://localhost/ClaireSylvainMarina/get_versus.php",
        type: 'GET',
        success: function success(result) {
            result = JSON.parse(result);
            console.log(result); 
    },
    error: function error(erreur) {
        alert("erreur");
    }
});
}           
