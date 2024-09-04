class juego{
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }

    //Todas las instancias van a compartir el valor de la variable "plataforma"
    
    static plataforma = `steam`;

    producto = () => {
        console.log(`El juego ${this.nombre} tiene un valor de ${this.precio} pesos argentinos`)
    }

    getplataforma = () => {
        console.log(`El juego funciona unicamente para ${juego.plataforma}`)
    }
}


let juego1 = new juego ("GOW 4", 3100);

juego1.producto();
juego1.getplataforma();