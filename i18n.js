
function applyFadeEffect(element, callback) {
    element.classList.add('fade-out');

    setTimeout(() => {
        // Appliquer la mise à jour du texte ou autres choses
        callback();

        element.classList.remove('fade-out');
        element.classList.add('fade-in');

        setTimeout(() => {
            element.classList.remove('fade-in');
        }, 100);
    }, 100);
}

document.addEventListener("DOMContentLoaded", function () {
    let translationData = {};

    let browserLang = navigator.language.substr(0, 2).toLowerCase();
    let currentLang = ['fr', 'en'].includes(browserLang) ? browserLang : 'en';

    const btnToggle = document.getElementById('toggle-translate');

function translateText(language) {
    document.querySelectorAll('[data-translate-key]').forEach(element => {
        let key = element.getAttribute('data-translate-key');
        let translatedText = translationData[key][language];
        if (translatedText) {
            applyFadeEffect(element, () => {
                element.textContent = translatedText;
            });
        }
    });
}


    function updateButtonText() {
        btnToggle.textContent = (currentLang === 'fr') ? 'FR' : 'EN';
    }

    fetch('i18n.json')
        .then(response => response.json())
        .then(data => {
            translationData = data;
            translateText(currentLang);
            updateButtonText();
        })
        .catch(error => console.error('Erreur lors de la récupération du fichier i18n.json:', error));

    btnToggle.addEventListener('click', function () {
        currentLang = (currentLang === 'fr') ? 'en' : 'fr';
        translateText(currentLang);
        updateButtonText();
    });
});
