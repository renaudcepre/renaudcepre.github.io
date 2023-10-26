document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById('emailModal');
    const btn = document.getElementById('showEmail');
    const span = document.getElementById('closeModal');
    const copyBtn = document.getElementById('copyEmail');
    const mainContent = document.querySelector('.main-content');


    btn.addEventListener('click', function () {
        mainContent.classList.add('blur');
        modal.style.display = "block";
    });

    function closeModal() {
        mainContent.classList.remove('blur');
        modal.style.display = "none";
    }

    span.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });


    copyBtn.addEventListener('click', function () {
        navigator.clipboard.writeText('renaudcepre-dev@gmail.com').then(() => {
            copyBtn.innerHTML = "👌"
        }).catch(err => {
            console.log('Impossible de copier l\'e-mail');
        });
    });
});
