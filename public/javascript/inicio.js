let diapositivaActual = 0;
const diapositivas = document.querySelectorAll('.carrusel .diapositiva');
const numeroDeDiapositivas = diapositivas.length;

setInterval(() => {
  diapositivas[diapositivaActual].classList.remove('activa');
  
  diapositivaActual = (diapositivaActual + 1) % numeroDeDiapositivas;
  
  diapositivas[diapositivaActual].classList.add('activa');
}, 5000); // Cambia cada 3 segundos

// Funcionalidad de la Lupa //

document.getElementById('search-icon').addEventListener('click', function() {
  var searchContainer = document.querySelector('.search-container');
  searchContainer.classList.toggle('active');
});