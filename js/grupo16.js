//variables globales
var canvas, ctx;
var puntos = 000;
var vidas = 3;
var intervalo;
var distanciaDisparo = 150;
var distanciaDiferencia;
var distanciaMeta = 20000;
var tickerMovDerecha, tickerMovIzquierda;

//bandera
var seqDisparo = 0;

//Variables físicas
var velocidad = 4.2;
var gravedad = 1;
var velocidadCazador = 1;
var velocidadGlobal = 7;

//Posiciones fondos
var posA = 0,
    posB = 0,
    posC = 0,
    posD = 0,
    posE = 0;

var posPlataformaUno;
var posPlataformaDos;

// Instancias de imagenes
var imgPersonajeMono = new Image();
var imgPersonajeMonoIzq = new Image();
var imgPersonajeMonoSalta = new Image();
var imgPersonajeMonoSaltaIzq = new Image();
var imgPersonajeCazador = new Image();
var imgPersonajeCazadorDisparo = new Image();
var imgPlataforma = new Image();
var imgPlataformaDos = new Image();
var imgBanana = new Image();
var imgBananaOro = new Image();
var imgBananaPodrida = new Image();
var imgMeta = new Image();
// imagenes HUD
var hudDardoOn = new Image();
var hudDardoOff = new Image();
var hudProgresoMono = new Image();
var hudProgresoCazador = new Image();
var hudProgresoMeta = new Image();

//SRC Imagenes
imgPersonajeMono.src = 'img/monoSpritemono.png';
imgPersonajeMonoIzq.src = "img/monoSpritemono_flipped.png";//por el momento flipee la imagen desde archivo, despues vemos si lo podemos hacer desde aca
imgPersonajeMonoSalta.src = "img/monoSalto.png";
imgPersonajeMonoSaltaIzq.src = 'img/monoSaltoFlipped.png';
imgPersonajeCazador.src = 'img/spriteCazador2.png';
imgPersonajeCazadorDisparo.src = 'img/spriteCazadorDisparo.png';
imgPlataforma.src = 'img/plataforma.png';
imgPlataformaDos.src = 'img/plataforma_2.png';
imgBanana.src = 'img/bananaNM.png';
imgBananaOro.src = 'img/bananaRB.png';
imgBananaPodrida.src = 'img/bananaZB.png';
imgMeta.src = 'img/meta.png';
//SRC imagenes HUD
hudProgresoCazador.src = 'img/faceCazador.png';
hudProgresoMono.src = 'img/faceMono.png';
hudProgresoMeta.src = 'img/flag.png';
hudDardoOn.src = 'img/dardoOn.png';
hudDardoOff.src = 'img/dardoOff.png';

//Posicion Inicial Personajes
var posXMono = 350;
var posYMono = 300;
var posXCazador = -500;
var posYCazador = 275;
var posProgresoMono = 350;
var posProgresoCazador = 1;


//variables elementos
var posXPlataformaUno = 700;
var posYPlataformaUno = 235;
var posXPlataformaDos = 900;
var posYPlataformaDos = 120;
var alturaPlataforma = [235, 120];
//var alturaBananas = [235, 120, 275];
var posXBanana = 700;
var posYBanana = 235;


//Creacion Instancias
var mono = new Personaje(posXMono, posYMono, 465, 116, 4, 2);
var cazador = new Personaje(posXCazador, posYCazador, 608, 152, 4, 2);
var plataformaUno = new Plataforma(posXPlataformaUno, posYPlataformaUno, 180, 54, 23);
var plataformaDos = new Plataforma(posXPlataformaDos, posYPlataformaDos, 180, 54, 23);
var bananaUno = new Banana(posXBanana, posYBanana, "normal", 70, 70, 'plataformaUno', false);
var bananaOro = new Banana(posXBanana, posYBanana, "oro", 70, 70, 'plataformaDos', false);
var bananaPodrida = new Banana(posXBanana, posYBanana, "podrida", 70, 70, 'piso', false);
var vidaUno = new Hud(20, 25, 32, 32);
var vidaDos = new Hud(65, 25, 32, 32);
var vidaTres = new Hud(110, 25, 32, 32);
var posCazador = new Hud(200, 25, 18, 20);
var posMono = new Hud(250, 25, 28, 20);
var posMeta = new Hud(597, 23, 12, 22);

//var fuente = new FontFace('rainbowMonkey', "url('resources/rainbow_monkey.ttf')");
//document.fonts.add(fuente);

function carga() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

}
function jugar() {
    document.getElementById('canvas').style.filter = 'none';
    document.getElementById('btnJugar').style.display = 'none';
    document.getElementById('btnTutorial').style.display = 'none';
    document.getElementById('btnCreditos').style.display = 'none';
    document.getElementById('logo').style.display = 'none';
    dibujar();
}
function menu() {
    document.getElementById('resultado').style.display = 'none';
    document.getElementById('btnMenu').style.display = 'none';
    document.getElementById('creditos').style.display = 'none';
    document.getElementById('btnJugar').innerHTML = 'JUGAR';
    document.getElementById('btnJugar').style.display = '';
    document.getElementById('btnTutorial').style.display = '';
    document.getElementById('btnCreditos').style.display = '';
    document.getElementById('logo').style.display = '';
    reinicio();
    
}
function reinicio() {
    seqDisparo = 0;
    puntos = 000;
    vidas = 3;
    velocidadGlobal = 7;
    velocidadCazador = 1;
    velocidad = 4.2;
    gravedad = 1;
    posA = 0;
    posB = 0;
    posC = 0;
    posD = 0;
    posE = 0;
    document.getElementById('canvas').style.backgroundPosition = "0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px"
    posXMono = 350;
    posYMono = 300;
    posXCazador = -500;
    posYCazador = 275;
    posXPlataformaUno = 700;
    posYPlataformaUno = 235;
    posXPlataformaDos = 900;
    posYPlataformaDos = 120;
    posXBanana = 700;
    posYBanana = 235;
    mono = new Personaje(posXMono, posYMono, 465, 116, 4, 2);
    cazador = new Personaje(posXCazador, posYCazador, 608, 152, 4, 2);
    plataformaUno = new Plataforma(posXPlataformaUno, posYPlataformaUno, 180, 54, 23);
    plataformaDos = new Plataforma(posXPlataformaDos, posYPlataformaDos, 180, 54, 23);
    bananaUno = new Banana(posXBanana, posYBanana, "normal", 70, 70, 'plataformaUno', false);
    bananaOro = new Banana(posXBanana, posYBanana, "oro", 70, 70, 'plataformaDos', false);
    bananaPodrida = new Banana(posXBanana, posYBanana, "podrida", 70, 70, 'piso', false);
    vidaUno = new Hud(20, 25, 32, 32);
    vidaDos = new Hud(65, 25, 32, 32);
    vidaTres = new Hud(110, 25, 32, 32);
    posCazador = new Hud(200, 25, 18, 20);
    posMono = new Hud(250, 25, 28, 20);
    posMeta = new Hud(597, 23, 12, 22);
}
function creditos(){
    document.getElementById('btnJugar').style.display = 'none';
    document.getElementById('btnTutorial').style.display = 'none';
    document.getElementById('btnCreditos').style.display = 'none';
    document.getElementById('logo').style.display = 'none';
    document.getElementById('creditos').style.display = '';
}
//canvas
function dibujar() {
    //document.getElementById('canvas').style.backgroundImage = "url(img/fondo_00.png), url(img/fondo_01.png), url(img/fondo_02.png), url(img/fondo_03.png), url(img/fondo_04.png)"
    //document.getElementById('canvas').style.backgroundPosition = "0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px"
    

    // que se dibuje al comienzo y luego entre al intervalo
    //imgPersonajeMono.onload = function() {
    //    mono.dibujar(imgPersonajeMono);
    // }
    //imgPersonajeCazador.onload = function() {
    //    cazador.dibujar(imgPersonajeCazador);
    //}



    intervalo = setInterval(function() {
        borrar();
        if (vidas == 0) {
            document.getElementById('canvas').style.filter = 'blur(6px)';
            document.getElementById('resultado').style.display = '';
            document.getElementById('btnMenu').style.display = '';
            clearInterval(intervalo);
        } else {
            plataformaUno.dibujar(imgPlataforma);
            plataformaDos.dibujar(imgPlataformaDos);
            mono.velocidad += gravedad;
            mono.y += mono.velocidad;
            if (mono.y > 416 - mono.alto) {
                frenarSalto(416)
            } else if (mono.y > (plataformaUno.y + plataformaUno.offset) - mono.alto && mono.y < (plataformaUno.y + plataformaUno.offset - 80) && mono.velocidad >= 0 && mono.x > (plataformaUno.x - 62) && mono.x < (plataformaUno.x + plataformaUno.ancho - 60)) {
                frenarSalto(plataformaUno.y + plataformaUno.offset)
            } else if (mono.y > (plataformaDos.y + plataformaDos.offset) - mono.alto && mono.y < (plataformaDos.y + plataformaDos.offset - 80) && mono.velocidad >= 0 && mono.x > (plataformaDos.x - 62) && mono.x < (plataformaDos.x + plataformaDos.ancho - 60)) {
                frenarSalto(plataformaDos.y + plataformaDos.offset)
            }
            if (plataformaDos.x > plataformaUno.x && plataformaDos.x < plataformaUno.x + plataformaUno.ancho) {
                plataformaDos.sortear()
            }
            if (plataformaUno.x > plataformaDos.x && plataformaUno.x < plataformaDos.x + plataformaDos.ancho) {
                plataformaUno.sortear()
            }
            if (mono.saltando == true){
                
                if (mono.orientacion == "der") {
                    mono.dibujaPose(imgPersonajeMonoSalta, 0);
                    if (mono.corre == true) {
                        mono.derecha();
                        //mono.dibujar(imgPersonajeMono);
                    }
                } else {
                    mono.dibujaPose(imgPersonajeMonoSaltaIzq, 0);
                    if (mono.corre == true) {
                        mono.izquierda();
                        //mono.dibujar(imgPersonajeMonoIzq);
                    }
                }
            } else {
                if (mono.orientacion == "der") {
                    if (mono.corre == true) {
                        mono.derecha();
                        mono.dibujar(imgPersonajeMono);
                    } else if (mono.corre == false) {
                        mono.dibujaPose(imgPersonajeMono, 3);
                    }
                } else {
                    if (mono.corre == true) {
                        mono.izquierda();
                        mono.dibujar(imgPersonajeMonoIzq);
                    } else if (mono.corre == false) {
                        mono.dibujaPose(imgPersonajeMonoIzq, 0);
                    }
                }
            }
            
            if (mono.x - cazador.x < distanciaDisparo) {
                cazador.disparar();
            }
            cazador.actualizar();
            if (cazador.disparando == false){
                cazador.dibujar(imgPersonajeCazador);
            } else {
                if (seqDisparo <50){
                    seqDisparo ++
                    cazador.dibujar(imgPersonajeCazadorDisparo);
                }else{
                                        seqDisparo = 0;
                    cazador.disparando = false;
                    cazador.cazadorCorre = true;
                }
            }
            if (seqDisparo == 25){
                vidas -=1
            }    
           
            mono.actualizar();
            
            console.log(cazador.x);

            //pruebas con bananas
            if (plataformaUno.x > 800 && plataformaUno.x < 850) {
                bananaUno.activa = true;
            }
            if (bananaUno.activa == true) {
                bananaUno.dibujar(imgBanana);
                bananaUno.posicionBanana();
            } else {
                bananaUno.x = 850;
            }
            if (plataformaDos.x > 800 && plataformaDos.x < 850) {
                bananaOro.activa = true;
            }
            if (bananaOro.activa == true) {
                bananaOro.dibujar(imgBananaOro);
                bananaOro.posicionBanana();
            } else {
                bananaOro.x = 850;
            }
            
            
            bananaUno.colision();
            bananaOro.colision();
            

            ui();
            
            

        }
    }, 1000 / 25);
}

function frenarSalto(ubicacionY) {
    mono.velocidad = 0;
    mono.y = ubicacionY - mono.alto;
    mono.saltando = false;
}

//Creacion Objeto Personaje
function Personaje(x, y, ancho, alto, fotogramasTotales, tiempoPorFotograma) { // x,y, ancho, alto, fotogramas totales, framerate
    this.x = x;
    this.y = y;
    this.alto = alto;
    this.ancho = ancho;
    this.orientacion = "der";
    this.velocidad = 0;
    
    this.saltando = false;
    this.corre = false;
    
    this.cazadorCorre = true;
    this.disparando = false;

    //atributos animacion personaje
    this.fotogramasTotales = fotogramasTotales;
    this.tiempoPorFotograma = tiempoPorFotograma;
    this.contador = 0;
    this.fotogramaActual = 0;

    //metodos
    //metodo actualizar los fotogramas de animacion
    this.actualizar = function() {
        this.contador += 1;
        if (this.contador > tiempoPorFotograma) {
            this.contador = 0;
            // va pasando de fotogramas
            if (this.fotogramaActual < fotogramasTotales - 1) {
                //ir al fotograma siguiente
                this.fotogramaActual += 1;
            } else {
                //sino el siguiente es el primer fotograma
                this.fotogramaActual = 0;
            }
        }
    }
    this.dibujar = function(img) {
        ctx.drawImage(
            img,
            this.fotogramaActual * this.ancho / this.fotogramasTotales,
            0,
            this.ancho / this.fotogramasTotales,
            this.alto,
            this.x,
            this.y,
            this.ancho / this.fotogramasTotales,
            this.alto);
    }
    this.dibujaPose = function(img, fotograma) {
        ctx.drawImage(
            img,
            fotograma * this.ancho / this.fotogramasTotales,
            0,
            this.ancho / this.fotogramasTotales,
            this.alto,
            this.x,
            this.y,
            this.ancho / this.fotogramasTotales,
            this.alto);
        if (cazador.cazadorCorre == true && mono.saltando != true){
            cazador.cazadorAvanza();
        }
            

    }
    this.derecha = function() {
        if (this.x >= 350) {
            plataformaUno.mover();
            plataformaDos.mover();
            // movimiento del fondo
            posA -= velocidadGlobal;
            posB = posA * 0.5;
            posC = posB * 0.5;
            posD = posC * 0.5;
            posE = posD * 0.5;
            canvas.style.backgroundPosition = posA + "px 0px, " + posB + "px 0px, " + posC + "px 0px, " + posD + "px 0px, " + posE + "px 0px";
            
        } else {
            this.x += velocidadGlobal;
            this.orientacion = "der"
        }
    }
    this.izquierda = function() {
        if (this.x >= 30) {
            this.x -= velocidadGlobal;
            this.orientacion = "izq"
            if (cazador.cazadorCorre == true){
                cazador.cazadorAvanza();
            }
            

        }
    }
    this.saltar = function() {
        if (this.saltando == false) {
            this.saltando = true;
            this.velocidad -= velocidad * 4.5;
        } else {
            if (this.y == 300) {
                this.saltando = false;
                this.velocidad = 0;
            }
        }
    }
    this.disparar = function() {
        this.cazadorCorre = false;
        this.contador = 0;
        this.disparando = true;
        cazador.x = 10;
        this.cazadorCorre = false;
        
    }
    this.cazadorAvanza = function() {
        cazador.x += 3;
    }
    this.cazadorRetrocede = function() {
        cazador.x -= 5;
    }
}

//Objeto Plataformas
function Plataforma(x, y, ancho, alto, offsetPiso) {
    this.x = x;
    this.y = y;
    this.alto = alto;
    this.ancho = ancho;
    this.offset = offsetPiso;
    this.dibujar = function(img) {
        ctx.drawImage(img, this.x, this.y, this.ancho, this.alto)
    }
    this.mover = function() {
        if (this.x > (-this.ancho)) {
            this.x -= velocidadGlobal
        } else {
            this.sortear();
            
        }
    }

    this.sortear = function() {
        var ubicArray = Math.floor(Math.random() * 2)
        //console.log(ubicArray)
        this.y = alturaPlataforma[ubicArray]
        this.x = Math.floor(
            Math.random() * (1600 - 900 + 1)
        ) + 800;

    }
}

//Objeto Bananas
function Banana(x, y, tipo, ancho, alto, posAlto, activa) {
    this.x = x;
    this.y = y;
    this.tipo = tipo;
    this.alto = alto;
    this.ancho = ancho;
    this.activa = activa;
    this.posAlto = posAlto;

    //metodos
    this.dibujar = function(img) {
        ctx.drawImage(img, this.x, this.y, this.ancho, this.alto)
    }
    this.posicionBanana = function() {
        if (posAlto == 'plataformaUno'){
            this.x = plataformaUno.x + plataformaUno.ancho / 3;
            this.y = plataformaUno.y - 50;
        }
        if (posAlto == 'plataformaDos'){
            this.x = plataformaDos.x + plataformaDos.ancho / 3;
            this.y = plataformaDos.y - 50;
        }
        
    }
    this.colision = function() {
        if (
            (this.x < mono.x + mono.ancho / 4) &&
            (this.x > mono.x - this.ancho) &&
            (this.y > mono.y - this.alto + 10) &&
            (this.y < mono.y + mono.alto)
        ) {
            if (this.tipo == "normal") {
                console.log("soy normal");
                puntos += 5;
                var boost = setInterval(function() {
                    velocidadGlobal = 12;
                    cazador.cazadorRetrocede();
                    //mono.derecha();
                }, 1000 / 25);
                setTimeout(function() {
                        velocidadGlobal = 7;
                        clearInterval(boost);
                    }, 2000) // boost por 2 segundos


            } else if (this.tipo == "oro") {
                console.log("soy rainbow");
                puntos += 10;
                var boost = setInterval(function() {
                    velocidadGlobal = 18;
                    //mono.derecha();
                    cazador.cazadorRetrocede();
                }, 1000 / 25);
                setTimeout(function() {
                        velocidadGlobal = 7;
                        clearInterval(boost);
                    }, 3000) // boost por 3 segundos



            } else if (this.tipo == "podrida") {
                var boost = setInterval(function() {
                    velocidadGlobal = 3;
                    cazador.cazadorAvanza();
                    //mono.derecha();
                }, 1000 / 25);
                setTimeout(function() {
                        console.log("Listo")
                        velocidadGlobal = 7;
                        clearInterval(boost);
                    }, 3000) // pierde velocidad por 3 segundos

            }
            this.activa = false;
            //this.sortear();
        }
    }
}

//Objetod HUD
function Hud(x, y, ancho, alto) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;

    this.dibujar = function(img) {
        ctx.drawImage(img, this.x, this.y, this.ancho, this.alto)
    }
}

function borrar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function ui() {
    ctx.font = "40px rainbowMonkey";
    ctx.fillStyle = "#2b2b2b";
    //ctx.fillText("Vidas: " + vidas, 715, 40); //el primero es el texto, el segundo es x y el tercero es y
    ctx.fillText(puntos, 690, 50);
    ctx.fillStyle = '#3f3f3f';
    //dibuja rectangulo (x, y, widtth, height) en realidad linea
    ctx.fillRect(200, 47, 400, 3);

    posProgresoMono = -(posA)+mono.x+350;
    distanciaDiferencia = mono.x-(cazador.x);
    posProgresoCazador = posProgresoMono-distanciaDiferencia;

    posMono.x = (posProgresoMono*400/distanciaMeta)+200;
    posCazador.x = (posProgresoCazador*400/distanciaMeta)+200;
    posMono.dibujar(hudProgresoMono);
    posCazador.dibujar(hudProgresoCazador);
    posMeta.dibujar(hudProgresoMeta);
    

    if (vidas == 3){
        vidaUno.dibujar(hudDardoOff);
        vidaDos.dibujar(hudDardoOff);
        vidaTres.dibujar(hudDardoOff);
    } else if (vidas == 2) {
        vidaUno.dibujar(hudDardoOn);
        vidaDos.dibujar(hudDardoOff);
        vidaTres.dibujar(hudDardoOff);
    } else if (vidas == 1) {
        vidaUno.dibujar(hudDardoOn);
        vidaDos.dibujar(hudDardoOn);
        vidaTres.dibujar(hudDardoOff);
    } else {
        vidaUno.dibujar(hudDardoOn);
        vidaDos.dibujar(hudDardoOn);
        vidaTres.dibujar(hudDardoOn);
    }
}

//Inputs Movimiento personaje
document.addEventListener('keydown', function(e) {
    //console.log('keydown'+mono.corre)
    switch (e.keyCode) {
        case 38:
            mono.saltar();
            mono.saltando = true;
            break;
        case 87:
            mono.saltar();
            mono.saltando = true;
            break;
        case 32:
            mono.saltar();
            mono.saltando = true;
            break;
        case 39:
            //mono.derecha();
            mono.corre = true;
            mono.orientacion = 'der';
            break;
        case 68:
            //mono.derecha();
            mono.corre = true;
            mono.orientacion = 'der';
            break;
        case 37:
           // mono.izquierda();
            mono.corre = true;
            mono.orientacion = 'izq';
            break;
        case 65:
            //mono.izquierda();
            mono.corre = true;
            mono.orientacion = 'izq';
            break;
    }
});

document.addEventListener('keyup', function(e) {
    //console.log('keyup'+e.key)
    switch (e.keyCode) {
        case 38:

            break;
        case 87:

            break;
        case 32:

            break;
        case 39:
            mono.corre = false;
            break;
        case 68:
            mono.corre = false;
            break;
        case 37:
            mono.corre = false;
            break;
        case 65:
            mono.corre = false;
            break;
    }
});

//Esc a menu
document.addEventListener('keyup', function(e) {
    if (e.keyCode == 27) {
        //console.log("Salir a menu")
        clearInterval(intervalo);
        document.getElementById('canvas').style.filter = 'blur(6px)';
        document.getElementById('btnJugar').style.display = '';
        document.getElementById('btnJugar').innerHTML = 'REANUDAR';        
        document.getElementById('btnTutorial').style.display = '';
        document.getElementById('btnCreditos').style.display = '';
        document.getElementById('logo').style.display = '';
    }
});

