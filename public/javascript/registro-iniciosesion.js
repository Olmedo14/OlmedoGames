document.getElementById("linkIniciarSesion").addEventListener("click", function(event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
    document.getElementById("formularioRegistro").style.display = "none";
    document.getElementById("formularioInicioSesion").style.display = "block";
});

document.getElementById("linkRegistro").addEventListener("click", function(event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
    document.getElementById("formularioRegistro").style.display = "block";
    document.getElementById("formularioInicioSesion").style.display = "none";
});