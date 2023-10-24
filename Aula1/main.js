// Aula 1 - Conceptos básicos sobre variables y función alert()
var valorEnDolar = 60;
var cotizacionDelDolar = 349.93;

var valorEnPesosArgentinos = valorEnDolar * cotizacionDelDolar;

valorEnPesosArgentinos = valorEnPesosArgentinos.toFixed(2);

//alert("$" + valorEnPesosArgentinos);

/*  
    Desafíos - Aula1
    1.Agregar otras monedas para convertir;
    2.Conversor de temperaturas entre fahrenheit, kelvin y celsius;
    3.Agregar en el alert el nombre de la persona que está pidiendo la conversión;
    4.Agregar una línea al proyecto desarrollado para que aparezca el valor en bitcoin.

*/

var cotizacionDelEuro = 373.65;
var cotizacionDelReal = 69.79;
var valorBitcoin = 11082005.73; // Podría consultarse mediante una API
let bitcoin = document.getElementById('bitcoin');
bitcoin.innerHTML = `<p>Valor del bitcoin: $${valorBitcoin} pesos argentinos</p>`;

function calcular(){
    let cotizacion = document.querySelector("input[name='cotizacion']:checked").value;
    let cantidadDinero = document.getElementById('valor').value;
    console.log(cantidadDinero);
    switch (cotizacion){
        case "dolar":
            convertirMoneda(cotizacionDelDolar, cantidadDinero);
            break;
        case "euro":
            convertirMoneda(cotizacionDelEuro, cantidadDinero);
            break;
        case "real":
            convertirMoneda(cotizacionDelReal, cantidadDinero);
            break;
        default:
            alert("La cotizacion no existe");
            break;
    }
    
}

function convertirMoneda(cotizacion, cantidadDinero){
    let valorEnPesosArgentinos = cotizacion * cantidadDinero;
    valorEnPesosArgentinos = valorEnPesosArgentinos.toFixed(2);
    let nombre = document.getElementById('nombre').value;
    let resultado = document.getElementById('resultado');
    resultado.style.display = "block";
    resultado.innerHTML = `<p>Hola ${nombre}, la conversión es $${valorEnPesosArgentinos} pesos argentinos</p>`;
}