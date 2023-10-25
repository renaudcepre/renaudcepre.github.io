document.addEventListener("DOMContentLoaded", function () {
    // ... Votre code existant ...

    // Gestion de la boîte modale
    const modal = document.getElementById('emailModal');
    const btn = document.getElementById('showEmail');
    const span = document.getElementById('closeModal');
    const copyBtn = document.getElementById('copyEmail');
    const mainContent = document.querySelector('.main-content');  // Obtenir l'élément avec la classe "main-content"

    // Quand l'utilisateur clique sur le bouton, ouvre la boîte modale
    btn.addEventListener('click', function () {
        mainContent.classList.add('blur');  // Ajoute l'effet de flou à main-content
        modal.style.display = "block";
    });

// Fonction pour fermer la boîte modale
    function closeModal() {
        mainContent.classList.remove('blur');
        modal.style.display = "none";
    }

// Lorsque l'utilisateur clique sur (x)
    span.addEventListener('click', closeModal);

// Lorsque l'utilisateur appuie sur la touche "Escape"
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });


    // Quand l'utilisateur clique sur "Copier", copie l'email dans le presse-papier
    copyBtn.addEventListener('click', function () {
        navigator.clipboard.writeText('renaudcepre-dev@gmail.com').then(() => {
            alert('E-mail copié dans le presse-papier');
        }).catch(err => {
            alert('Impossible de copier l\'e-mail');
        });
    });
});
