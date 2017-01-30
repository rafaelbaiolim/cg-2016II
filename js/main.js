var drawType;
var stage;
var ctx;
var elemLeft;
var elemTop;
var elements = [];


window.onload = function () {
    construct()
}

function construct() {
    stage = new createjs.Stage("board");
    for (var j = 10; j < 500; j += 22) {
        for (var i = 10; i < 500; i += 20) {
            var c1 = new Circle({x: i, y: j, radius: 6, fill: "blue"}).draw();
        }
    }
    stage.update();
}



function Line(props) {

    this.obj = new createjs.Shape();
    try {

        this.obj.posXO = props.xO;
        this.obj.posYO = props.yO;

        this.obj.posXD = props.xD;
        this.obj.posYD = props.yD;

        this.obj.width = props.width;
        this.obj.height = props.height;
        this.obj.fill = props.fill;


    } catch (err) {

    }
    this.draw = function () {
        this.obj.graphics.setStrokeStyle(3);
        this.obj.graphics.beginStroke("blue");
        this.obj.graphics.moveTo(this.obj.posXO, this.obj.posYO);
        this.obj.graphics.lineTo(this.obj.posXD, this.obj.posYD);
        stage.addChild(this.obj);
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
    this.obj = new createjs.Shape();
    try {
        this.obj.posX = props.x;
        this.obj.posY = props.y;

        this.obj.fill = props.fill;
        this.obj.strokeFill = props.strokeFill;
        this.obj.radius = props.radius;
    } catch (err) {

    }

    this.draw = function () {
        this.obj.graphics.beginFill(this.obj.fill).drawCircle(
                this.obj.posX,
                this.obj.posY,
                this.obj.radius);
        this.obj.addEventListener("click", function (event) {
            setLine(event);
        });
        stage.addChild(this.obj);

        return this.obj;
    }

}