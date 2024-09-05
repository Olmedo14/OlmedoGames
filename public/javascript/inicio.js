let diapositivaActual = 0;
const diapositivas = document.querySelectorAll('.carrusel .diapositiva');
const numeroDeDiapositivas = diapositivas.length;

setInterval(() => {
  diapositivas[diapositivaActual].classList.remove('activa');
  
  diapositivaActual = (diapositivaActual + 1) % numeroDeDiapositivas;
  
  diapositivas[diapositivaActual].classList.add('activa');
}, 5000); // Cambia cada 3 segundos