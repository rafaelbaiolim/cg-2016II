var drawType;
var canvas;
var ctx;
var elements = [];
var coordAtual = {x: 0, y: 0}
var pontos = [];
var draws = [];
var lastIdAtivo = "";
var janela;
var objAsjanela = false;

var btnCalcularTranslacao;
var btnCalcularMEscala;
var btnCalcularRotacao;
var btnCalcularZoomExtend;
var objSelecionado;

var areaZoom;
var areaTranslacao;
var areaEscala;
var areaRotacao;
var sX, sY, dX, dY, graus;

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
        case "SELECAO":
            drawType = "SELECAO";
            break;
        case "CIRCULO":
            drawType = "CIRCULO";
            break;
        default :
            drawType = "LINHA";
            break;
    }

    if (idElemento) {
        removeActiveClass("tipoLinha");
        removeActiveClass("tipoRetangulo");
        removeActiveClass("tipoTriangulo");
        document.getElementById(idElemento).className += " ativo";
    }
    resetPontos();
}

function construct() {
    canvas = document.getElementById('board');
    ctx = canvas.getContext('2d');
    fixYAbs();
    document.onkeydown = KeyPress;
    setDrawType("LINHA", 'tipoLinha');
    if (canvas) {
        $("#canvasAttr").html("Canvas (px) : " + canvas.width +
                " x " + canvas.height);
    }

    btnCalcularTranslacao = document.getElementById("calcTranslacao");
    btnCalcularMEscala = document.getElementById("calcMEscala");
    btnCalcularRotacao = document.getElementById("calcRotacao");
    btnCalcularZoomExtend = document.getElementById("calcZoomExtend");

}

function setMouseLabels() {
    var coordX = document.getElementById('coord-x');
    var coordY = document.getElementById('coord-y');
    coordX.value = coordAtual.x;
    coordY.value = coordAtual.y;

}

function inicializarMemo(memo, minX, maxX, minY, maxY) {
    for (var i = minX; i < maxX; i++) {
        memo[i] = new Array();
        for (var j = minY; j < maxY; j++) {
            memo[i][j] = false;
        }
    }
    return memo;
}

/**
 * Pega a posição atual do canvas
 * @param {type} evt
 * @returns {getMousePos.canvasAnonym$0}
 */
function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: (evt.clientY - rect.bottom) * -1
    };
}


function getObjOnjanela(matrizJanela) {
    var minX = Math.min.apply(null, matrizJanela[0]);
    var minY = Math.min.apply(null, matrizJanela[1]);
    var maxX = Math.max.apply(null, matrizJanela[0]);
    var maxY = Math.max.apply(null, matrizJanela[1]);
    try {
        var memo = [[], []];
        inicializarMemo(memo, minX, maxX, minY, maxY);
        var objNaJanela = [];
        var obj = false;
        for (var i = minX; i < maxX; i++) {
            for (var j = minY; j < maxY; j++) {
                obj = procurarObjPorInterseccao(i, j);
                if (obj) {
                    if (obj.matriz) {
                        var x = obj.matriz[0][0];
                        var y = obj.matriz[0][1];
                        if (!memo[x][y]) {
                            memo[x][y] = true;
                            objNaJanela.push(obj);
                        }
                    }
                }
            }
        }
    } catch (err) {
    }
    ;
    memo = [[], []];
    return objNaJanela;

}


function desenha(result, tipo) {
    if (tipo == "LINHA") {
        addDotToCanvas(result[0][0], result[1][0]);
        addDotToCanvas(result[0][1], result[1][1]);

        var linha = new Line({
            xO: result[0][0],
            yO: result[1][0],
            xD: result[0][1],
            yD: result[1][1],

        }).draw();
        draws.push(linha);
    }

    if (tipo == "RETANGULO") {
        var pi = addDotToCanvas(result[0][0], result[1][0]);
        var pii = addDotToCanvas(result[0][2], result[1][2]);

        var retangulo = new Rectangle(
                {
                    p0: pi,
                    p1: pii,

                }).draw();

        draws.push(retangulo);
    }
    resetPontos();

    if (tipo == "TRIANGULO") {

        var pi = addDotToCanvas(result[0][0], result[1][0]);
        var pii = addDotToCanvas(result[0][1], result[1][1]);

        var triangulo = new Triangle(
                {
                    p0: pi,
                    p1: pii,

                }).draw();

        resetPontos();
        draws.push(triangulo);
    }
}

function addListners() {

    btnCalcularTranslacao.addEventListener("click", function () {
        if (!objSelecionado) {
            alert("Selecione um desenho para calcular.");
            return;
        }

        dX = document.getElementById("deslocDx").value;
        if (!dX) {
            alertProsseguir("o valor dX");
            return;
        }

        dY = document.getElementById("deslocDy").value;
        if (!dY) {
            alertProsseguir("o valor dY");
            return;
        }

        showLoadCursor();
        var indexObj = draws.indexOf(objSelecionado);
        transladarObjetos(dX, dY, indexObj, objSelecionado.matriz, objSelecionado.type);
        showDefaultCursor();

        objSelecionado = undefined;
    });

    btnCalcularMEscala.addEventListener("click", function () {
        if (!objSelecionado) {
            alert("Selecione um desenho para calcular.");
            return;
        }

        sX = document.getElementById("escalaSx").value;
        if (!sX) {
            alertProsseguir("o valor Sx");
            return;
        }

        sY = document.getElementById("escalaSy").value;
        if (!sY) {
            alertProsseguir("o valor Sy");
            return;
        }

        showLoadCursor();
        var indexObj = draws.indexOf(objSelecionado);
        mEscala(sX, sY, indexObj, objSelecionado.matriz, objSelecionado.type);
        showDefaultCursor();
        objSelecionado = undefined;
    });

    btnCalcularRotacao.addEventListener("click", function () {
        if (!objSelecionado) {
            alert("Selecione um desenho para calcular.");
            return;
        }

        graus = document.getElementById("grausRotacao").value;
        if (!graus) {
            alertProsseguir("o grau de rotação");
            return;
        }
        showLoadCursor();
        var indexObj = draws.indexOf(objSelecionado);
        rotacionarObjetos(graus, indexObj, objSelecionado.matriz, objSelecionado.type);
        showDefaultCursor();
        objSelecionado = undefined;
    });

    var firstClick = 0;
    btnCalcularZoomExtend.addEventListener("click", function (evt) {
        $("#calcZoomExtend").html("Calcular");
        $("#calcZoomExtend").addClass("ativo-zoom-calc");

        objAsjanela = true;
        setDrawType("SELECAO", false);

        desativarBtnDrawsType();
        if (janela != undefined) {
            ativarBtnDrawsType();
            var objNaJanela = [];
            showLoadCursor();
            objNaJanela = getObjOnjanela(janela.matriz);
            if (!objNaJanela) {
                return;
            }

            zoomExtend(janela.matriz, objNaJanela);

            janela = undefined;
            objAsjanela = false;
            reDrawCtrlZ(true);//apenas redesenha o canvas sem a janela
            showDefaultCursor();
            firstClick = -1;
            $("#calcZoomExtend").html("Criar Seleção");
            $("#calcZoomExtend").removeClass("ativo-zoom-calc");
        } else {
            if (firstClick > 0) {
                alert("Crie a seleção do zoom para prosseguir!");
                firstClick = 0;
                desativarBtnDrawsType();
            }
        }

        firstClick++;

        return;

    });

    canvas.addEventListener("mouseout", function () {
        coordAtual = {x: 0, y: 0};
        setMouseLabels();
    }, false);

    canvas.addEventListener('mousemove', function (evt) {
        var mousePos = getMousePos(evt);
        coordAtual = {x: mousePos.x, y: mousePos.y};
        setMouseLabels();
        document.getElementById("board").style.cursor = "default";
        if (procurarObjPorInterseccao()) {
            document.getElementById("board").style.cursor = "pointer";
        }

    }, false);

    canvas.addEventListener('mousedown', function (evt) {
        objSelecionado = procurarObjPorInterseccao();

        if (objSelecionado) {
            setObjSelecionado();
            resetPontos();

        } else {
            addDotToCanvas();
        }

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
                            selecao: false

                        }).draw();

                resetPontos();
                draws.push(retangulo);
            }
        }

        if (drawType == "SELECAO") {
            if (pontos.length >= 2) {
                janela = undefined;
                var retangulo = new Rectangle(
                        {
                            p0: pontos[0],
                            p1: pontos[1],
                            selecao: true
                        }).draw();
                janela = retangulo;
                resetPontos();
            }
        }

        if (drawType == "TRIANGULO") {
            if (pontos.length >= 2) {
                var triangulo = new Triangle({p0: pontos[0],
                    p1: pontos[1], dots: pontos}).draw();
                resetPontos();
                draws.push(triangulo);
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
        reDrawCtrlZ();
        resetPontos();
    }
}

function setObjSelecionado(pSelecionado) {
    if (draws.length <= 0) {
        return;
    }
    var fill;
    if (pSelecionado) {
        objSelecionado = pSelecionado;
    }

    var index = draws.indexOf(objSelecionado);
    if (index == -1) {
        return;
    }
    clearOnlyDrawScreen();
    draws.push(draws[index]);
    draws.splice(index, 1);

    for (var i = 0; i < draws.length; i++) {

        if (!draws[i].props) {
            continue;
        } else {
            fill = "";
        }

        if (i == (draws.length - 1)) {
            fill = "red";
        }

        draws[i].props.drawDots = true;
        draws[i].props.fill = fill;

        switch (draws[i].type) {
            case "LINHA":
                new Line(draws[i].props).draw();
                break;
            case "RETANGULO":
                new Rectangle(draws[i].props).draw();
                break;
            case "TRIANGULO":
                new Triangle(draws[i].props).draw();
                break;

        }
    }


}

/**
 * Apaga apenas o canvas, mantém os pontos
 * @returns {undefined}
 */
function clearOnlyDrawScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pontos = [];
}

/**
 * Re-desenha / Apaga o ultimo desenho
 * @param {type} justReDraw 
 * if TRUE -> apenas redesenha
 * else -> remove o ultimo desenho
 * @returns {undefined}
 */
function reDrawCtrlZ(justReDraw) {
    if (draws.length <= 0) {
        return;
    }

    if (!justReDraw) {
        draws.pop();
    }

    clearOnlyDrawScreen();

    for (var i in draws) {
        if (!draws[i].props) {
            continue;
        }
        draws[i].props.drawDots = true;
        switch (draws[i].type) {
            case "LINHA":
                new Line(draws[i].props).draw();
                break;
            case "RETANGULO":
                new Rectangle(draws[i].props).draw();
                break;
            case "TRIANGULO":
                new Triangle(draws[i].props).draw();
                break;
        }
    }
}

/**
 * Shape Triângulo
 * @param {type} props
 * @returns {Triangle}
 */
function Triangle(props) {
    this.obj = {};
    this.obj.type = "TRIANGULO";
    this.linhas = {};
    this.obj.linhas = [];
    this.obj.matriz = [];
    this.obj.dots = [];
    this.obj.props = props;

    if (props.drawDots) {
        addDotToCanvas(props.p0.posX, props.p0.posY, props.fill);
        addDotToCanvas(props.p1.posX, props.p1.posY, props.fill);
    }

    this.linha1 = new Line({
        xO: props.p0.posX,
        yO: props.p0.posY,
        xD: props.p1.posX,
        yD: props.p1.posY
    }).draw();

    this.obj.linhas.push(this.linha1);
    this.linha2 = new Line({

        xO: this.linha1.posXD,
        yO: this.linha1.posYD,
        xD: this.linha1.posXO,
        yD: props.p1.posY

    }).draw();

    addDotToCanvas(this.linha2.posXD, this.linha2.posYD, props.fill);
    this.obj.linhas.push(this.linha2);
    this.linha3 = new Line({
        xO: this.linha1.posXO,
        yO: this.linha2.posYD,
        xD: this.linha1.posXO,
        yD: this.linha1.posYO

    }).draw();

    this.obj.linhas.push(this.linha3);
    this.obj.matriz.push([this.linha1.posXO, this.linha1.posXD, this.linha2.posXD, ]);
    this.obj.matriz.push([this.linha1.posYO, this.linha1.posYD, this.linha2.posYD, ]);
    this.obj.matriz.push([1, 1, 1]);
    this.draw = function () {
        return this.obj;
    }
}

/**
 * Shape Retangulo
 */
function Rectangle(props) {

    this.obj = {};
    this.obj.type = "RETANGULO";
    this.linhas = {};
    this.obj.linhas = [];
    this.obj.matriz = [];
    this.obj.dots = [];
    this.obj.fill;
    this.obj.props = props;

    if (props.drawDots) {
        addDotToCanvas(props.p0.posX, props.p0.posY, props.fill);
        addDotToCanvas(props.p1.posX, props.p1.posY, props.fill);
    }

    this.linha1 = new Line({
        xO: props.p0.posX,
        yO: props.p0.posY,
        xD: props.p1.posX,
        yD: props.p0.posY,
        selecao: props.selecao

    }).draw();

    this.obj.linhas.push(this.linha1);

    addDotToCanvas(this.linha1.posXD, this.linha1.posYD, props.fill);
    this.linha2 = new Line({
        xO: this.linha1.posXD,
        yO: this.linha1.posYD,
        xD: props.p1.posX,
        yD: props.p1.posY,
        selecao: props.selecao
    }).draw();
    this.obj.linhas.push(this.linha2);


    addDotToCanvas(props.p0.posX, props.p1.posY, props.fill);
    this.linha3 = new Line({
        xO: props.p0.posX,
        yO: props.p0.posY,
        xD: props.p0.posX,
        yD: props.p1.posY,
        selecao: props.selecao
    }).draw();
    this.obj.linhas.push(this.linha3);


    this.linha4 = new Line({
        xO: this.linha3.posXD,
        yO: this.linha3.posYD,
        xD: props.p1.posX,
        yD: props.p1.posY,
        selecao: props.selecao
    }).draw();
    this.obj.linhas.push(this.linha4);

    this.obj.matriz.push([this.linha1.posXO, this.linha1.posXD, this.linha2.posXD, this.linha4.posXO]);
    this.obj.matriz.push([this.linha1.posYO, this.linha1.posYD, this.linha2.posYD, this.linha4.posYO]);
    this.obj.matriz.push([1, 1, 1, 1]);

    this.draw = function () {
        return this.obj;
    }
}

/**
 * Limpa a área do canvas
 * @returns {undefined}
 */
function clearCanvas(clearIndex) {
    pontos = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!clearIndex) {
        draws = [];
    } else {
        draws.splice(clearIndex, 1);
        reDrawCtrlZ(true);
    }

}

function addDotToCanvas(coordX, coordY, propFill) {
    if (!propFill) {
        propFill = "#000000";
    }

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
        fill: propFill,
    }).draw();
    pontos.push(ponto);
    return ponto;
}

/**
 * Shape Linha
 * @param {type} props
 * @returns {Line}
 */
function Line(props) {
    this.obj = {};
    this.obj.type = "LINHA";
    this.obj.matriz = [];
    this.obj.dots = [];

    this.obj.props = props;

    try {

        if (props.drawDots) {
            addDotToCanvas(props.xO, props.yO, props.fill);
            addDotToCanvas(props.xD, props.yD, props.fill);
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

    this.draw = function () {
        ctx.beginPath();
        if (props.selecao && props.selecao != undefined) {
            ctx.setLineDash([5, 6]);
        } else {
            ctx.setLineDash([0, 0]);
        }
        ctx.moveTo(this.obj.posXO, this.obj.posYO);
        ctx.lineTo(this.obj.posXD, this.obj.posYD);
        ctx.stroke();
        return this.obj;
    }
}

function Circle(props) {
    this.obj = {};
    this.obj.dots = [];
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



/**
 * Informa qual campo deve ser informado para 
 * prosseguir
 * @returns {undefined}
 */
function alertProsseguir(campo) {
    alert("Informe " + campo + " para prosseguir");
}

/**
 * Mostra o cursor de espera no canvas
 */
function showLoadCursor() {
    $(".container").css("cursor", "wait");
}


/**
 * Mostra o cursor de espera no canvas
 */
function showDefaultCursor() {
    $(".container").css("cursor", "default");
}