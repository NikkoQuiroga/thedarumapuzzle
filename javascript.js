// //Hago que el usuario pueda ingresar nombre e interactúe con la página.
let nombreUsuario = prompt('Para comenzar el juego, ingresá tu nombre');
document.getElementById("nombreUsuario").innerHTML = nombreUsuario;

//Creo un Array con todos los elementos que va a utilizar el código.
document.addEventListener('DOMContentLoaded', () => {

    const cartasArray = [
        {
            name: 'daruma-verde',
            img: 'images/daruma-verde.png',
          },
          {
            name: 'daruma-multicolor',
            img: 'images/daruma-multicolor.png',
          },
          {
            name: 'daruma-celeste',
            img: 'images/daruma-celeste.png',
          },
          {
            name: 'daruma-hannya',
            img: 'images/daruma-hannya.png',
          },
          {
            name: 'daruma-blanco',
            img: 'images/daruma-blanco.png',
          },
          {
            name: 'daruma-rosa',
            img: 'images/daruma-rosa.png',
          },
          {
            name: 'daruma-verde',
            img: 'images/daruma-verde.png',
          },
          {
            name: 'daruma-multicolor',
            img: 'images/daruma-multicolor.png',
          },
          {
            name: 'daruma-celeste',
            img: 'images/daruma-celeste.png',
          },
          {
            name: 'daruma-hannya',
            img: 'images/daruma-hannya.png',
          },
          {
            name: 'daruma-blanco',
            img: 'images/daruma-blanco.png',
          },
          {
            name: 'daruma-rosa',
            img: 'images/daruma-rosa.png',
          }
    ]

//     //Mezclo el Array de forma aleatoria, para que cada vez que actualizo la página aparezca de forma impredecible.
    cartasArray.sort(() => 0.5 - Math.random());

const memoTest = document.getElementById("memoTest");
const mostrarResultados = document.getElementById("resultado");
let cartaElegida = [];
let cartaElegidaId = [];
let cartaGanada = [];

//Armo el tablero del memoTest
function crearTablero() {
    for (let i = 0; i < cartasArray.length; i++) {
        const carta = document.createElement('img');
        carta.setAttribute('src', 'images/blank.png');
        carta.setAttribute('data-id', i);
        carta.addEventListener('click', darVueltaLaCarta);
        memoTest.appendChild(carta);
    }
}

// //Hago que el código tome todas las imágenes de la página para el juego, menos la imágen del header. Creo el par de cartas a elegir.
function chequearIguales() {
const cartas = document.querySelectorAll('img:not(.excepcion)');
const opcionUno = cartaElegidaId[0];
const opcionDos = cartaElegidaId[1];

if (opcionUno == opcionDos) {
    cartas[opcionUno].setAttribute('src', 'images/blank.png');
    cartas[opcionDos].setAttribute('src', 'images/blank.png');
    alert('Tocaste dos veces la misma imagen');
} else if (cartaElegida[0] === cartaElegida[1]) {
    alert('¡Encontraste dos darumas iguales!');
    cartas[opcionUno].setAttribute('src', 'images/blanco.png');
    cartas[opcionDos].setAttribute('src', 'images/blanco.png');
    cartas[opcionUno].removeEventListener('click', darVueltaLaCarta);
    cartas[opcionDos].removeEventListener('click', darVueltaLaCarta);
    cartaGanada.push(cartaElegida);
} else {

    cartas[opcionUno].setAttribute('src', 'images/blank.png');
    cartas[opcionDos].setAttribute('src', 'images/blank.png');
    alert('No es correcto... ¡intentá nuevamente!');
}

// //Llamo a las variables

cartaElegida = [];
cartaElegidaId = [];
mostrarResultados.textContent = cartaGanada.length;
if (cartaGanada.length === cartasArray.length / 2) {
    alert('¡Felicitaciones! ¿Sabías que el muñeco Daruma es un amuleto muy importante en Japón ya que representa el esfuerzo, la perseverancia y la tenacidad por cumplir los objetivos que nos proponemos a lo largo de nuestra vida?');
}
}

function darVueltaLaCarta() {

    let cartaId = this.getAttribute('data-id');
    cartaElegida.push(cartasArray[cartaId].name);
    cartaElegidaId.push(cartaId);
    this.setAttribute('src', cartasArray[cartaId].img);
    if (cartaElegida.length === 2) {
        setTimeout(chequearIguales, 500);
    }

}
    
   crearTablero(); 
});