// --- main.js ---

document.addEventListener("DOMContentLoaded", function() {
    // ----------- Parte 1: Navegación de pestañas -----------
    const navLinks = document.querySelectorAll('.nav-list a');
    const sections = document.querySelectorAll('.info-content');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Quitar el id "seleccionado" de todos los enlaces
            navLinks.forEach(l => l.removeAttribute('id'));
            // Asignar el id "seleccionado" al enlace clickeado
            this.id = "seleccionado";

            // Mostrar solo la sección correspondiente
            const targetId = this.getAttribute('href').replace('#', '') + '-content';
            sections.forEach(sec => sec.classList.remove('active'));
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                e.preventDefault();
                targetSection.classList.add('active');
            }
        });
    });

    // Mostrar la primera sección por defecto
    if (sections.length) sections[0].classList.add('active');

    // ----------- Parte 2: Carrusel de referencias -----------
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let index = 0;
    let autoplayInterval;

    function updateCarousel() {
        const width = items[0].offsetWidth;
        track.style.transform = `translateX(-${index * width}px)`;
    }

    function goNext() {
        index = (index + 1) % items.length;
        updateCarousel();
    }

    function goPrev() {
        index = (index - 1 + items.length) % items.length;
        updateCarousel();
    }

    nextBtn.addEventListener('click', () => {
        goNext();
        restartAutoplay();
    });

    prevBtn.addEventListener('click', () => {
        goPrev();
        restartAutoplay();
    });

    function startAutoplay() {
        autoplayInterval = setInterval(goNext, 4000); // Cambia cada 4 segundos
    }

    function restartAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    window.addEventListener('resize', updateCarousel);

    // Inicialización del carrusel
    updateCarousel();
    startAutoplay();
});


