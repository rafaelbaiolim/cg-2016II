
function mEscala(sx, sy, mObj, tipo) {
    console.log("entrei");
    

    var S = [
        [sx, 0, 0],
        [0, sy, 0],
        [0, 0, 1]
    ];
    var dx, dy;
    var tOrigem = [
        [1, 0, dx],
        [0, 1, dy],
        [0, 0, 1]
    ];

    var tRetorno = [
        [1, 0, dx],
        [0, 1, dy],
        [0, 0, 1]
    ];

    var subResult = multiplyMatrices(S, tOrigem);
    var result = multiplyMatrices(subResult, tRetorno);
    var result = multiplyMatrices(result, mObj);

    console.log(result);

    clearCanvas();
    
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
}
