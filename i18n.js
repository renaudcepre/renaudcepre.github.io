
function applyFadeEffect(element, callback) {
    console.log("apply")
    element.classList.add('fade-out');

    setTimeout(() => {
        callback();

        element.classList.remove('fade-out');
        element.classList.add('fade-in');

        setTimeout(() => {
            element.classList.remove('fade-in');
        }, 100);
    }, 100);
}
let quotesData = [];

function updateQuote(language) {
    const quoteElement = document.getElementById('quote');
    const quoteAuthorElement = document.getElementById('quote-author');
    if (quotesData.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotesData.length);
        const quoteData = quotesData[randomIndex];
        const quoteText = quoteData["quote"];
        const quoteAuthor = quoteData["author"] || "";  // utiliser une chaîne vide si "author" est indéfini

        applyFadeEffect(quoteElement, () => {
            quoteElement.textContent = quoteText;
            quoteAuthorElement.textContent = quoteAuthor ? quoteAuthor : ""; // Ajoute une virgule seulement si l'auteur existe
        });
    }
}


fetch('quotes.json')
    .then(response => response.json())
    .then(data => {
        quotesData = data;
        // updateQuote(currentLang);
    })
    .catch(error => console.error('Erreur lors de la récupération du fichier quotes.json:', error));

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
                element.innerHTML = translatedText;
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
            updateQuote(currentLang);
            updateButtonText();
            document.body.style.opacity = '1';
        })
        .catch(error => console.error('Erreur lors de la récupération du fichier i18n.json:', error));

    btnToggle.addEventListener('click', function () {
        currentLang = (currentLang === 'fr') ? 'en' : 'fr';
        translateText(currentLang);
        updateButtonText();
    });
});
