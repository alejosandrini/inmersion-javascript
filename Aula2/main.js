// Aula 2 - Mentalista
var numeroSecreto = parseInt(Math.random() * 1000);
var intentos = 0;
console.log(numeroSecreto)
/*while(numeroDigitado != numeroSecreto) {
  var numeroDigitado = prompt('Ingrese un número entre 1 y 1000');
  //si el numeroDigitado es igual al número secreto
  if (numeroDigitado == numeroSecreto) {
    alert('¡Acertaste!');
  } else if (numeroDigitado > numeroSecreto) {
    alert('Te equivocaste... el número secreto es menor');
  } else if (numeroDigitado < numeroSecreto) {
    alert('Te equivocaste... el número secreto es mayor');
  }
}*/

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = element;

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });

function jugar(){
  const container = document.getElementById('container');
  let dificultad = document.querySelector("input[name='dificultad']:checked").value;
  container.classList.add('animate__animated', 'animate__zoomOutLeft');
  container.style.setProperty('--animate-duration', '1.5s');

  container.addEventListener('animationend', () => {
    cargarJuego(dificultad, container)
  });
}

function cargarJuego(dificultad, container){
  switch (dificultad){
    case "facil":
      intentos = 25;
      break;
    case "intermedio":
      intentos = 15;
      break;
    case "dificil":
      intentos = 8;
      break;
    default: 
      intentos = 100
      break;
  }
  container.innerHTML = `
  <div class="container">
    <div class="d-flex justify-content-center">
        <p>El número se encuentra entre 1 y 1000</p>
        <span class="position-absolute posicion-vidas">
            <p>Intentos restantes : <span id="intentos">${intentos}</span></p>
        </span>
    </div>
    <div>
      <input type="number" class="input-valor" name="valor" id="valor" placeholder="Ingrese un número" autocomplete="off" min="1" max="1000">
      <input type="submit" class="boton-adivinar" value="Adivinar" onclick="adivinar()" id="submit">
    </div>
    <div class="resultados-container mt-3 d-none" id="resultados"></div>
    </div>
  `
  container.classList.remove('animate__zoomOutLeft'); 
  container.classList.add('animate__backInRight');
  container.style.setProperty('--animate-duration', '0.8s');
  document.getElementById("valor")
    .addEventListener("keyup", function(e) {
        if (e.code === 'Enter') {
            document.getElementById("submit").click();
        }
    });
}

function adivinar(){
  let respuesta = document.getElementById('valor');
  if(respuesta.value.trim()==""){
    respuesta.focus()
  }else{
    let resultados = document.getElementById('resultados');
    if(resultados.classList.contains('d-none')){
      resultados.classList.remove('d-none')
    }
    if(parseInt(respuesta.value)==numeroSecreto){
      generarRespuestaCorrecta(resultados)
    }else{
      generarRespuestaIncorrecta(resultados, respuesta.value)
      restarIntentos(resultados)
      respuesta.value=""
      respuesta.focus()
    }
  }
}

function generarRespuestaCorrecta(resultados){
  let node = document.createElement("p");
  node.innerText = `Correcto! El número secreto era ${numeroSecreto}`
  node.classList.add('resultado-correcto')
  resultados.appendChild(node)

  finalizarJuego(resultados)
}

function cercania(respuesta){
  let diferencia = Math.abs(respuesta - numeroSecreto)
  console.log(diferencia)
  let cercania = ""
  if(diferencia>250){
    cercania = "Muy lejos!"
  }else if(diferencia>100){
    cercania = "Te vas acercando!"
  }else if(diferencia>25){
    cercania = "Casi!"
  }else{
    cercania = "Demasiado cerca!"
  }
  return cercania
}

function generarRespuestaIncorrecta(resultados, respuesta){
  let node = document.createElement("p");
  let comparacion = "";
  if(respuesta>numeroSecreto){
    comparacion = `menor a ${respuesta}`
  }else{
    comparacion = `mayor a ${respuesta}`
  }
  let valorCercania = cercania(respuesta)
  node.innerText = `${valorCercania} El número secreto es ${comparacion}`
  node.classList.add('resultado-incorrecto')
  resultados.appendChild(node)
}

function restarIntentos(resultados){
  let node = document.getElementById('intentos');
  let container = document.querySelector(".posicion-vidas")
  intentos-=1
  if(intentos>5){
    node.innerHTML = intentos
  }else if(intentos == 5){
    let texto = node.parentNode
    texto.classList.add("d-none")
    for(let i=0; i<intentos; i++){
      console.log("Creo corazon")
      let vida = document.createElement("i")
      vida.classList.add("fa-solid", "fa-heart", "fa-xl")
      vida.setAttribute("style", "color:#ff0000")
      container.appendChild(vida);
    }
  }else if(intentos<5){
    let vida = document.querySelector(".fa-heart")
    vida.classList.replace("fa-heart", "fa-heart-crack")
    vida.style.color = "#980000"
    animateCSS(vida, 'bounce');
  }
  if(intentos==0){
    console.log("Se quedo sin intentos")
    avisarPerdio(resultados)
  }
}

function avisarPerdio(resultados){
  let node = document.createElement("p");
  node.innerText = `Que lastima, te quedaste sin intentos! El número secreto era ${numeroSecreto}`
  node.classList.add('resultado-incorrecto')
  resultados.appendChild(node)

  finalizarJuego(resultados)
}

function finalizarJuego(resultados){
  let boton = document.createElement("input");
  boton.setAttribute('type', 'button')
  boton.setAttribute('value', 'Volver')
  boton.setAttribute('onclick', 'location.reload()')
  boton.classList.add('boton')
  resultados.insertAdjacentElement("afterend", boton);

  let botonAdivinar = document.querySelector(".boton-adivinar")
  botonAdivinar.setAttribute('disabled', '')
}