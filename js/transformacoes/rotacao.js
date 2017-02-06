function pegaMenorPonto(mObj){
    

    var dx = Math.min.apply(null, mObj[0]);
    var dy = Math.min.apply(null, mObj[1]);
    
    return {dx:dx, dy:dy};

}

Array.prototype.min = function(){
    return Math.min.apply(null, this);
};
function pegaMaiorPonto(mObj){
    

    var dx = Math.max.apply(null, mObj[0]);
    var dy = Math.max.apply(null, mObj[1]);
    
    return {dx:dx, dy:dy};

}
Array.prototype.max = function(){
    return Math.max.apply(null, this);
};

function rotacionarObjetos(graus, mObj, tipo){
    var menores = pegaMenorPonto(mObj);
    
    var dx = menores.dx, dy = menores.dy;

    console.log(dx);
    console.log(dy);
    var cos = Math.round(Math.cos(graus * Math.PI / 180));      
    var sen = Math.round(Math.sin(graus * Math.PI / 180)); 
    
    console.log(cos);
    console.log(sen);	

    var R = [
        [cos, -sen, (dy*sen) - (dx * cos) + dx],
        [sen, cos, (-dx*sen) - (dy * cos) + dy],
        [0, 0, 1]
    ];

    var result = multiplyMatrices(R, mObj);
    
    clearCanvas();

    if(tipo == "LINHA"){
        addDotToCanvas(result[0][0],result[1][0]);
        addDotToCanvas(result[0][1],result[1][1]);
        
        var linha = new Line({
            xO: pontos[0].posX,
            yO: pontos[0].posY,
            xD: pontos[1].posX,
            yD: pontos[1].posY,
            
        }).draw();

        resetPontos();
        draws.push(linha);
    }
     if(tipo == "RETANGULO"){   
        addDotToCanvas(result[0][0],result[1][0]);
        addDotToCanvas(result[0][2],result[1][2]);

        var retangulo = new Rectangle(
                {
                    p1: pontos[1],
                    p0: pontos[0],
                    
                }).draw();
        
        resetPontos();
        
        draws.push(retangulo);
        

    }  
    if(tipo == "TRIANGULO"){   
        addDotToCanvas(result[0][0],result[1][0]);
        addDotToCanvas(result[0][1],result[1][1]);

        console.log(result[0][0]);
        console.log(result[1][0]);
        
        var triangulo = new Triangle(
                {
                    p1: pontos[1],
                    p0: pontos[0],
                    
                }).draw();
        
        resetPontos();
        
        draws.push(triangulo);
        

    }
}