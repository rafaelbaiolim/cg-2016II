function multiplyMatrices(m1, m2) {
    var result = [];
    for (var i = 0; i < m1.length; i++) {
        result[i] = [];
        for (var j = 0; j < m2[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < m1[0].length; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}




function transladarObjetos(dx, dy, mObj, tipo) {
    var mT = [
        [1, 0, dx],
        [0, 1, dy],
        [0, 0, 1]
    ];
    var result = multiplyMatrices(mT, mObj);
    console.log(result);

    clearCanvas();

    if (tipo == "LINHA") {
        addDotToCanvas(result[0][0], result[1][0]);
        addDotToCanvas(result[0][1], result[1][1]);

        var linha = new Line({
            xO: pontos[0].posX,
            yO: pontos[0].posY,
            xD: pontos[1].posX,
            yD: pontos[1].posY,

        }).draw();
        draws.push(linha);
    }
    
    if (tipo == "RETANGULO") {
        addDotToCanvas(result[0][0], result[1][0]);
        addDotToCanvas(result[0][2], result[1][2]);

        var retangulo = new Rectangle(
                {
                    p1: pontos[1],
                    p0: pontos[0],

                }).draw();

        draws.push(retangulo);
    }
    resetPontos();

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
