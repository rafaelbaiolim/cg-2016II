var drawType = "QUADRADO";
var canvas;
var ctx;
var elements = [];
var coordAtual = {x: 0, y: 0}
var pontos = [];
var draws = [];

window.onload = function () {
    construct();
    addListners();
}

function setDrawType(drawTp) {
    switch (drawTp) {
        case "LINHA":
            drawType = "LINHA";
            break;
        case "TRIANGULO":
            drawType = "TRIANGULO";
            break;
        case "QUADRADO":
            drawType = "QUADRADO";
            break;
        case "CIRCULO":
            drawType = "CIRCULO";
            break;
        default :
            drawType = "LINHA";
            break;
    }

}

function construct() {
    canvas = document.getElementById('board');
    ctx = canvas.getContext('2d');



//    for (var j = 10; j < 500; j += 22) {
//        for (var i = 10; i < 500; i += 20) {
//            var c1 = new Circle({x: i, y: j, radius: 6, fill: "blue"}).draw();
//        }
//    }
    //stage.update();
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
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
    canvas.addEventListener('mousemove', function (evt) {
        var mousePos = getMousePos(canvas, evt);
        coordAtual = {x: mousePos.x, y: mousePos.y};
        setMouseLabels();
    }, false);

    canvas.addEventListener('mousedown', function (evt) {
        addDotToCanvas();
        var obj = checkColision();

        if (drawType == "LINHA") {
            if (pontos.length == 2) {
                var linha = new Line({
                    xO: pontos[0].posX,
                    yO: pontos[0].posY,
                    xD: pontos[1].posX,
                    yD: pontos[1].posY
                }).draw();
                resetPontos();
                draws.push(linha);
            }
        }

        if (drawType == "QUADRADO") {
            createSquare();
        }

    });


    canvas.addEventListener('mouseup', function (evt) {

        if (drawType == "QUADRADO") {
            addDotToCanvas();
            createSquare();
        }
    });
}

function createSquare() {
    if (pontos.length >= 2) {

        var linha1 = new Line({
            xO: pontos[0].posX,
            yO: pontos[0].posY,
            xD: pontos[1].posX,
            yD: pontos[0].posY
        }).draw();

        var linha2 = new Line({
            xO: linha1.posXD,
            yO: linha1.posYD,
            xD: pontos[1].posX,
            yD: pontos[1].posY
        }).draw();


        var linha2 = new Line({
            xO: linha1.posXD,
            yO: linha1.posYD,
            xD: pontos[1].posX,
            yD: pontos[1].posY
        }).draw();

        var linha3 = new Line({
            xO: pontos[0].posX,
            yO: pontos[0].posY,
            xD: pontos[0].posX,
            yD: pontos[1].posY
        }).draw();


        var linha4 = new Line({
            xO: linha3.posXD,
            yO: linha3.posYD,
            xD: pontos[1].posX,
            yD: pontos[1].posY
        }).draw();

        resetPontos();
        // draws.push(linha);
    }
}


function clearCanvas() {


    ctx.clearRect(0, 0, canvas.width, canvas.height);


}

function addDotToCanvas() {
    var ponto = new Circle({
        x: coordAtual.x,
        y: coordAtual.y,
        radius: 5,
        fill: "#000000",
    }).draw();

    pontos.push(ponto);

}


function Line(props) {

    this.obj = {};
    try {

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
        ctx.fill();
        return this.obj;
    }

}