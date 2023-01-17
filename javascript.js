// Sweet Alert Inicial

Swal.fire({
    title: "Para comenzar el juego, ¡ingresá tu nombre!",
    input: "text",
    confirmButtonText: "Comenzar",
    color: '#404034',
    background: '#fff',
    confirmButtonColor: '#434338',
}).then((result) => {
    if (result.isConfirmed) {
        document.getElementById("nombreUsuario").innerHTML = `${result.value}`;
    };
});

// Sweet Alert Final

function lanzarFuegos() {
    Swal.fire({
        title: 'En Japón, el muñeco Daruma se regala como símbolo de buena fortuna... ¡Felicitaciones!',
        width: 600,
        padding: '3em',
        color: '#404034',
        background: '#fff',
        confirmButtonColor: '#434338',
        backdrop: `
        rgba(153,153,102,0.8)
      url(./images/output.gif)
      center top
      no-repeat
    `
    });
};

// Cronómetro

window.onload = init;
function init() {
    document.querySelector(".start").addEventListener("click", cronometrar);
    document.querySelector(".stop").addEventListener("click", parar);
    h = 0;
    m = 0;
    s = -1;
    document.getElementById("hms").innerHTML = "00:00:00";
};

function cronometrar() {
    escribir();
    id = setInterval(escribir, 1000);
    document.querySelector(".start").removeEventListener("click", cronometrar);
};
function escribir() {
    let hAux, mAux, sAux;
    s++;
    if (s > 59) { m++; s = 0; }
    if (m > 59) { h++; m = 0; }
    if (h > 24) { h = 0; }

    if (s < 10) { sAux = "0" + s; } else { sAux = s; }
    if (m < 10) { mAux = "0" + m; } else { mAux = m; }
    if (h < 10) { hAux = "0" + h; } else { hAux = h; }

    document.getElementById("hms").innerHTML = hAux + ":" + mAux + ":" + sAux;
};
function parar() {
    clearInterval(id);
    document.querySelector(".start").addEventListener("click", cronometrar);
};

// Reproducir Sonidos

const sonidoCorrecto = document.getElementById("sonidoCorrecto");
const sonidoError = document.getElementById("sonidoError");
const sonidoGanador = document.getElementById("sonidoGanador");

function reproducirSonidoCorrecto() {
    sonidoCorrecto.play();
};

function reproducirSonidoError() {
    sonidoError.play();
};

function reproducirSonidoGanador() {
    sonidoGanador.play();
};

document.addEventListener('DOMContentLoaded', () => {

    let cartasArray = [];
    fetch('./dummy.json')
        .then(res => res.json())
        .then((data) => {
            cartasArray = data;
            cartasArray.sort(() => 0.5 - Math.random());

            const memoTest = document.getElementById("memoTest");
            const mostrarResultados = document.getElementById("resultado");
            let cartaElegida = [];
            let cartaElegidaId = [];
            let cartaGanada = [];

            const tiempoTotal = localStorage.getItem("tiempoTotal");
            document.getElementById("ultimoVisitante").innerHTML = tiempoTotal || 0;
            let empezarCronometro = '';

            function crearTablero() {
                for (let i = 0; i < cartasArray.length; i++) {
                    const carta = document.createElement('img');
                    carta.setAttribute('src', 'images/blank.png');
                    carta.setAttribute('data-id', i);
                    carta.addEventListener('click', darVueltaLaCarta);
                    memoTest.appendChild(carta);
                };
            };

            function chequearIguales() {
                const cartas = document.querySelectorAll('img:not(.excepcion)');
                const opcionUno = cartaElegidaId[0];
                const opcionDos = cartaElegidaId[1];
                const alerta = document.getElementById("alerta");

                if (opcionUno == opcionDos) {
                    cartas[opcionUno].setAttribute('src', 'images/blank.png');
                    cartas[opcionDos].setAttribute('src', 'images/blank.png');
                    alerta.textContent = "¡Tocaste dos veces la misma imagen!";

                } else if (cartaElegida[0] === cartaElegida[1]) {
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
                    reproducirSonidoError();
                };

                cartaElegida = [];
                cartaElegidaId = [];
                mostrarResultados.textContent = cartaGanada.length;
                if (cartaGanada.length === cartasArray.length / 2) {
                    const tiempoTotalActual = Math.floor((Date.now() - empezarCronometro) / 1000);
                    if (!tiempoTotal) {
                        localStorage.setItem('tiempoTotal', tiempoTotalActual);
                        document.getElementById("ultimoVisitante").innerHTML = tiempoTotalActual;
                    } else if (tiempoTotalActual < tiempoTotal) {
                        localStorage.setItem('tiempoTotal', tiempoTotalActual);
                        document.getElementById("ultimoVisitante").innerHTML = tiempoTotalActual;
                    };
                    alerta.textContent = "¡Ganaste!";
                    parar();
                    reproducirSonidoGanador();
                    lanzarFuegos();
                };
            };

            function darVueltaLaCarta() {
                if (!empezarCronometro) {
                    empezarCronometro = Date.now();
                }

                let cartaId = this.getAttribute('data-id');
                cartaElegida.push(cartasArray[cartaId].name);
                cartaElegidaId.push(cartaId);
                this.setAttribute('src', cartasArray[cartaId].img);

                if (cartaElegida.length === 2) {
                    setTimeout(chequearIguales, 300);
                };

            };

            crearTablero();
        })
        .catch(err => console.error(err));
});