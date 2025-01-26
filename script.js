<script>
    function downloadFile(file) {
        var a = document.createElement('a');
        a.href = file;  // Le lien vers le fichier à télécharger
        a.download = file;  // Nom du fichier à télécharger
        document.body.appendChild(a); 
        a.click();  // Simuler un clic pour lancer le téléchargement
        document.body.removeChild(a);  // Enlever l'élément après le téléchargement
    }
</script>
