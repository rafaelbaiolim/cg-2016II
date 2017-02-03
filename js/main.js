var drawType;
var canvas;
var ctx;
var elements = [];
var coordAtual = {x: 0, y: 0}
var pontos = [];
var draws = [];
var lastIdAtivo = "";

var btnCalcularTranslacao;
var btnCalcularMEscala;
var btnCalcularRotacao;

window.onload = function () {
    construct();
    addListners();
}

function removeActiveClass(idElemento) {
    var oldClass = document.getElementById(idElemento).className.replace(" ativo", '');
    document.getElementById(idElemento).className = oldClass;
}

function setDrawType(drawTp, idElemento) {
    switch (drawTp) {
        case "LINHA":
            drawType = "LINHA";
            break;
        case "TRIANGULO":
            drawType = "TRIANGULO";
            break;
        case "RETANGULO":
            drawType = "RETANGULO";
            break;
        case "CIRCULO":
            drawType = "CIRCULO";
            break;
        default :
            drawType = "LINHA";
            break;
    }
    removeActiveClass("tipoLinha");
    removeActiveClass("tipoRetangulo");
    removeActiveClass("tipoTriangulo");
    document.getElementById(idElemento).className += " ativo";
    resetPontos();
}

function fixYAbs() {
    ctx.transform(1, 0, 0, -1, 0, canvas.height);
}

function defaultYAbs() {
    ctx.transform(1, 1, 0, 1, 0, 0);
}

function construct() {
    canvas = document.getElementById('board');
    ctx = canvas.getContext('2d');
    fixYAbs();
    document.onkeydown = KeyPress;
    setDrawType("LINHA", 'tipoLinha');

    btnCalcularTranslacao = document.getElementById("calcTranslacao");
    btnCalcularMEscala = document.getElementById("calcMEscala");
    btnCalcularRotacao = document.getElementById("calcRotacao");

//    for (var j = 10; j < 500; j += 22) {
//        for (var i = 10; i < 500; i += 20) {
//            var c1 = new Circle({x: i, y: j, radius: 6, fill: "blue"}).draw();
//        }
//    }
    //stage.update();
}

function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: (evt.clientY - rect.bottom) * -1
    };
}

function setMouseLabels() {
    var coordX = document.getElementById('coord-x');
    var coordY = document.getElementById('coord-y');
    coordX.value = coordAtual.x;
    coordY.value = coordAtual.y;

}

function resetPontos() {
    pontos = [];
}

function checkColision() {
    for (var index in draws) {
        console.log(index);
    }
}

function addListners() {

    btnCalcularTranslacao.addEventListener("click", function () {
        transladarObjetos(10, 10, draws[0].matriz, draws[0].type);
        
    });
    btnCalcularMEscala.addEventListener("click", function () {
        mEscala(1, 2, draws[0].matriz, draws[0].type);

        
    });
    btnCalcularRotacao.addEventListener("click", function () {
        rotacionarObjetos(90, draws[0].matriz, draws[0].type);

        
    });


    canvas.addEventListener('mousemove', function (evt) {
        var mousePos = getMousePos(evt);
        coordAtual = {x: mousePos.x, y: mousePos.y};
        setMouseLabels();
    }, false);

    canvas.addEventListener('mousedown', function (evt) {
        addDotToCanvas();
        //var obj = checkColision();
        if (drawType == "LINHA") {
            if (pontos.length == 2) {
                var linha = new Line({
                    xO: pontos[0].posX,
                    yO: pontos[0].posY,
                    xD: pontos[1].posX,
                    yD: pontos[1].posY,
                    dots: pontos
                }).draw();
                resetPontos();
                draws.push(linha);
            }
        }

        if (drawType == "RETANGULO") {
            if (pontos.length >= 2) {
                var retangulo = new Rectangle(
                        {
                            p0: pontos[0],
                            p1: pontos[1],
                        }).draw();
                resetPontos();
                draws.push(retangulo);
            }
        }

        if (drawType == "TRIANGULO") {
            if (pontos.length >= 2) {
                var retangulo = new Triangle({p0: pontos[0],
                    p1: pontos[1], dots: pontos}).draw();
                resetPontos();
                draws.push(retangulo);
            }
        }

    });
}

/**
 * Remove o ultimo elemento utilizando ctrl+z
 * @param {type} e
 * @returns {undefined}
 */
function KeyPress(e) {
    var evtobj = window.event ? event : e
    if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
        removeLastObj();
        resetPontos();
    }
}

function removeLastObj() {
    draws.pop();
    clearCanvas();
    for (var i in draws) {
        draws[i].props.drawDots = true
        switch (draws[i].type) {
            case "LINHA":
                new Line(draws[i].props).draw();
                break;
            case "RETANGULO":
                new Rectangle(draws[i].props).draw();
                break;
        }
    }
}

//function Triangle(props) {
//    this.obj = {};
//    this.obj.type = "RETANGULO";
//    this.linhas = {};
//    this.obj.linhas = [];
//    this.obj.props = props;
//
//
//    if (props.drawDots) {
//        addDotToCanvas(props.p0.posX, props.p0.posY);
//        addDotToCanvas(props.p1.posX, props.p1.posY);
//    }
//
//    this.linha1 = new Line({
//        xO: props.p0.posX,
//        yO: props.p0.posY,
//        xD: props.p1.posX,
//        yD: props.p0.posY
//    }).draw();
//    this.obj.linhas.push(this.linha1);
//
//    addDotToCanvas(this.linha1.posXD, this.linha1.posYD);
//    this.linha2 = new Line({
//        xO: this.linha1.posXD,
//        yO: this.linha1.posYD,
//        xD: props.p1.posX,
//        yD: props.p1.posY
//    }).draw();
//    this.obj.linhas.push(this.linha2);
//
//    addDotToCanvas(props.p0.posX, props.p1.posY);
//    this.linha3 = new Line({
//        xO: props.p0.posX,
//        yO: props.p0.posY,
//        xD: props.p0.posX,
//        yD: props.p1.posY
//    }).draw();
//    this.obj.linhas.push(this.linha3);
//
//    this.linha4 = new Line({
//        xO: this.linha3.posXD,
//        yO: this.linha3.posYD,
//        xD: props.p1.posX,
//        yD: props.p1.posY
//    }).draw();
//    this.obj.linhas.push(this.linha4);
//
//    this.draw = function () {
//        return this.obj;
//    }
//}

function Rectangle(props) {

    this.obj = {};
    this.obj.type = "RETANGULO";
    this.linhas = {};
    this.obj.linhas = [];
    this.obj.matriz = [];
    this.obj.props = props;

    if (props.drawDots) {
        addDotToCanvas(props.p0.posX, props.p0.posY);
        addDotToCanvas(props.p1.posX, props.p1.posY);
    }

    this.linha1 = new Line({
        xO: props.p0.posX,
        yO: props.p0.posY,
        xD: props.p1.posX,
        yD: props.p0.posY
    }).draw();

    this.obj.linhas.push(this.linha1);

    addDotToCanvas(this.linha1.posXD, this.linha1.posYD);
    this.linha2 = new Line({
        xO: this.linha1.posXD,
        yO: this.linha1.posYD,
        xD: props.p1.posX,
        yD: props.p1.posY
    }).draw();
    this.obj.linhas.push(this.linha2);


    addDotToCanvas(props.p0.posX, props.p1.posY);
    this.linha3 = new Line({
        xO: props.p0.posX,
        yO: props.p0.posY,
        xD: props.p0.posX,
        yD: props.p1.posY
    }).draw();
    this.obj.linhas.push(this.linha3);


    this.linha4 = new Line({
        xO: this.linha3.posXD,
        yO: this.linha3.posYD,
        xD: props.p1.posX,
        yD: props.p1.posY
    }).draw();
    this.obj.linhas.push(this.linha4);


    this.obj.matriz.push([this.linha1.posXO, this.linha1.posXD, this.linha2.posXD, this.linha4.posXO]);
    this.obj.matriz.push([this.linha1.posYO, this.linha1.posYD, this.linha2.posYD, this.linha4.posYO]);
    this.obj.matriz.push([1, 1, 1, 1]);

    //console.table(this.obj.matriz);

    
        
    this.draw = function () {
        return this.obj;
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

}

function addDotToCanvas(coordX, coordY) {

    if (!coordX) {
        coordX = coordAtual.x;
    }

    if (!coordY) {
        coordY = coordAtual.y;
    }

    var ponto = new Circle({
        x: coordX,
        y: coordY,
        radius: 5,
        fill: "#000000",
    }).draw();

    pontos.push(ponto);

}


function Line(props) {
    this.obj = {};
    this.obj.type = "LINHA";
    this.obj.matriz = [];
    
    this.obj.props = props;

    try {

        if (props.drawDots) {
            addDotToCanvas(props.xO, props.yO);
            addDotToCanvas(props.xD, props.yD);

        }

        this.obj.posXO = props.xO;
        this.obj.posYO = props.yO;

        this.obj.posXD = props.xD;
        this.obj.posYD = props.yD;

        this.obj.width = props.width;
        this.obj.height = props.height;
        this.obj.fill = props.fill;


    } catch (err) {
        console.log(err);
    }


    this.obj.matriz.push([this.obj.posXO, this.obj.posXD]);
    this.obj.matriz.push([this.obj.posYO, this.obj.posYD]);
    this.obj.matriz.push([1, 1]);
    
    

    //console.table(this.obj.matriz);

    this.draw = function () {
        ctx.beginPath();
        ctx.moveTo(this.obj.posXO, this.obj.posYO);
        ctx.lineTo(this.obj.posXD, this.obj.posYD);
        ctx.stroke();
        

        return this.obj;
    }
}

function setObjSelected(obj, flagBack = false) {
    var auxObj = obj;
    var color = "red";
    if (flagBack) {
        color = "blue";
    }
    obj.graphics.clear();
    obj.graphics.beginFill(color).drawCircle(
            auxObj.posX,
            auxObj.posY,
            auxObj.radius);
    stage.update();
}

var lastObj = null;
function setLine(evt) {

    if (lastObj == null) {
        lastObj = evt.target;
    }

    var currentObj = evt.target;
    setObjSelected(currentObj);


    if (lastObj != null && currentObj != lastObj) {
        var obj = new Line({
            xO: lastObj.posX,
            yO: lastObj.posY,
            xD: currentObj.posX,
            yD: currentObj.posY
        }).draw();
        setObjSelected(currentObj, true);
        setObjSelected(lastObj, true);
        lastObj = null;
    }

    stage.update();
}


function Circle(props) {
    this.obj = {};
    try {

        this.obj.posX = props.x;
        this.obj.posY = props.y;
        this.obj.fill = props.fill;
        this.obj.strokeFill = props.strokeFill;
        this.obj.radius = props.radius;
    } catch (err) {
        console.log(err);
    }

    this.draw = function () {
        ctx.fillStyle = this.obj.fill;
        ctx.beginPath();
        ctx.arc(this.obj.posX,
                this.obj.posY,
                this.obj.radius, 0, 2 * Math.PI);
        ctx.fillText("(" + this.obj.posX + "," + this.obj.posY + ")", this.obj.posX, this.obj.posY);
        ctx.fill();
        return this.obj;
    }

}