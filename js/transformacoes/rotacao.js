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
    
    var dx = menores.dx, 
        dy = menores.dy;

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
        
    
    desenha(result, tipo);
    
}