
function mEscala(sx, sy, mObj, tipo) {
    console.log("entrei");
    console.table(mObj);

    var dx, dy;

    
    for (var i = 0; i < mObj.length; i++) {
        for (var j = 0; j < mObj[0].length; j++) {
            if(i == 0 && 0==j){
                dx = mObj[i][j];
     
            }
            if(i == 1 && j==0){
                dy = mObj[i][j];   
     
            }
        }
    }    
    
    var S = [
        [sx, 0, (-dx)],
        [0, sy, (-dy)],
        [0, 0, 1]
    ];
    console.table(S);

    var tRetorno = [
        [1, 0, dx],
        [0, 1, dy],
        [0, 0, 1]
    ];
    console.table(tRetorno);

    var subResult = multiplyMatrices(S, tRetorno);
    console.log("yeah");
    console.table(subResult);

    var result = multiplyMatrices(subResult, mObj);
    console.log("Final");
    console.table(result);
   

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
