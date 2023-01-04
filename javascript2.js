// //Hago que el usuario pueda ingresar nombre e interactúe con la página.
let nombreUsuario = prompt('Para comenzar el juego, ingresá tu nombre');
document.getElementById("nombreUsuario").innerHTML = nombreUsuario;

// El script para los fuegos artificiales
function fuegosArtificiales() {
const max_fireworks = 5,
  max_sparks = 50;
let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');
let fireworks = [];
 
for (let i = 0; i < max_fireworks; i++) {
  let firework = {
    sparks: []
  };
  for (let n = 0; n < max_sparks; n++) {
    let spark = {
      vx: Math.random() * 5 + .5,
      vy: Math.random() * 5 + .5,
      weight: Math.random() * .3 + .03,
      red: Math.floor(Math.random() * 2),
      green: Math.floor(Math.random() * 2),
      blue: Math.floor(Math.random() * 2)
    };
    if (Math.random() > .5) spark.vx = -spark.vx;
    if (Math.random() > .5) spark.vy = -spark.vy;
    firework.sparks.push(spark);
  }
  fireworks.push(firework);
  resetFirework(firework);
}
window.requestAnimationFrame(explode);
 
function resetFirework(firework) {
  firework.x = Math.floor(Math.random() * canvas.width);
  firework.y = canvas.height;
  firework.age = 0;
  firework.phase = 'fly';
}
 
function explode() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach((firework,index) => {
    if (firework.phase == 'explode') {
        firework.sparks.forEach((spark) => {
        for (let i = 0; i < 10; i++) {
          let trailAge = firework.age + i;
          let x = firework.x + spark.vx * trailAge;
          let y = firework.y + spark.vy * trailAge + spark.weight * trailAge * spark.weight * trailAge;
          let fade = i * 20 - firework.age * 2;
          let r = Math.floor(spark.red * fade);
          let g = Math.floor(spark.green * fade);
          let b = Math.floor(spark.blue * fade);
          context.beginPath();
          context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',1)';
          context.rect(x, y, 4, 4);
          context.fill();
        }
      });
      firework.age++;
      if (firework.age > 100 && Math.random() < .05) {
        resetFirework(firework);
      }
    } else {
      firework.y = firework.y - 10;
      for (let spark = 0; spark < 15; spark++) {
        context.beginPath();
        context.fillStyle = 'rgba(' + index * 50 + ',' + spark * 17 + ',0,1)';
        context.rect(firework.x + Math.random() * spark - spark / 2, firework.y + spark * 4, 4, 4);
        context.fill();
      }
      if (Math.random() < .001 || firework.y < 200) firework.phase = 'explode';
    }
  });
  window.requestAnimationFrame(explode);
}
}
// El script que tomé prestado para crear un cronómetro

window.onload = init;
function init() {
    document.querySelector(".start").addEventListener("click", cronometrar);
    document.querySelector(".stop").addEventListener("click", parar);
    h = 0;
    m = 0;
    s = 0;
    document.getElementById("hms").innerHTML = "00:00:00";
}

function cronometrar() {
    escribir();
    id = setInterval(escribir, 1000);
    document.querySelector(".start").removeEventListener("click", cronometrar);
}
function escribir() {
    var hAux, mAux, sAux;
    s++;
    if (s > 59) { m++; s = 0; }
    if (m > 59) { h++; m = 0; }
    if (h > 24) { h = 0; }

    if (s < 10) { sAux = "0" + s; } else { sAux = s; }
    if (m < 10) { mAux = "0" + m; } else { mAux = m; }
    if (h < 10) { hAux = "0" + h; } else { hAux = h; }

    document.getElementById("hms").innerHTML = hAux + ":" + mAux + ":" + sAux;
}
function parar() {
    clearInterval(id);
    document.querySelector(".start").addEventListener("click", cronometrar);

}

// Reproducir Sonidos

const sonidoCorrecto = document.getElementById("sonidoCorrecto");
const sonidoError = document.getElementById("sonidoError");
const sonidoGanador = document.getElementById("sonidoGanador");

function reproducirSonidoCorrecto() {
    sonidoCorrecto.play();
}

function reproducirSonidoError() {
    sonidoError.play();
}

function reproducirSonidoGanador() {
    sonidoGanador.play();
}



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

    //Mezclo el Array de forma aleatoria, para que cada vez que actualizo la página aparezca de forma impredecible.
    cartasArray.sort(() => 0.5 - Math.random());

    const memoTest = document.getElementById("memoTest");
    const mostrarResultados = document.getElementById("resultado");
    let cartaElegida = [];
    let cartaElegidaId = [];
    let cartaGanada = [];

    // Iniciio Cronometro y tiempo record
    const tiempoTotal = localStorage.getItem("tiempoTotal");
    document.getElementById("ultimoVisitante").innerHTML = tiempoTotal || 0;
    let empezarCronometro = '';

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
        const alerta = document.getElementById("alerta");

        if (opcionUno == opcionDos) {
            cartas[opcionUno].setAttribute('src', 'images/blank.png');
            cartas[opcionDos].setAttribute('src', 'images/blank.png');
            // alert('Tocaste dos veces la misma imagen'); 
            alerta.textContent = "¡Tocaste dos veces la misma imagen!";


        } else if (cartaElegida[0] === cartaElegida[1]) {
            // alert('¡Encontraste dos darumas iguales!');
            alerta.textContent = "¡Encontraste dos darumas iguales!";
            cartas[opcionUno].setAttribute('src', 'images/blanco.png');
            cartas[opcionDos].setAttribute('src', 'images/blanco.png');
            cartas[opcionUno].removeEventListener('click', darVueltaLaCarta);
            cartas[opcionDos].removeEventListener('click', darVueltaLaCarta);
            cartaGanada.push(cartaElegida);
            reproducirSonidoCorrecto();
        } else {

            cartas[opcionUno].setAttribute('src', 'images/blank.png');
            cartas[opcionDos].setAttribute('src', 'images/blank.png');
            alerta.textContent = "No es correcto... ¡intentá nuevamente!";
            // alert('No es correcto... ¡intentá nuevamente!');
            reproducirSonidoError();
        }

        // //Llamo a las variables

        cartaElegida = [];
        cartaElegidaId = [];
        mostrarResultados.textContent = cartaGanada.length;
        if (cartaGanada.length === cartasArray.length / 2) {
            const tiempoTotalActual = Math.floor((Date.now() - empezarCronometro) / 1000); // Este es el tiempo ganador
            // Compara la primera vez que entras
            if (!tiempoTotal) {
                localStorage.setItem('tiempoTotal', tiempoTotalActual);
                document.getElementById("ultimoVisitante").innerHTML = tiempoTotalActual;
            } else if (tiempoTotalActual < tiempoTotal) {
                localStorage.setItem('tiempoTotal', tiempoTotalActual);
                document.getElementById("ultimoVisitante").innerHTML = tiempoTotalActual;
            }
            // Frena el cronómetro 
            parar();
            reproducirSonidoGanador();
            fuegosArtificiales();
            // alert('¡Felicitaciones! ¿Sabías que el muñeco Daruma es un amuleto muy importante en Japón ya que representa el esfuerzo, la perseverancia y la tenacidad por cumplir los objetivos que nos proponemos a lo largo de nuestra vida?');
            alerta.textContent = "¡Felicitaciones! ¿Sabías que el muñeco Daruma es un amuleto muy importante en Japón ya que representa el esfuerzo, la perseverancia y la tenacidad por cumplir los objetivos que nos proponemos a lo largo de nuestra vida?";
        }
    }

    function darVueltaLaCarta() {
        //Este IF es para comenzar el cronometro en cuanto se hace click
        if (!empezarCronometro) {
            empezarCronometro = Date.now();
        }

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