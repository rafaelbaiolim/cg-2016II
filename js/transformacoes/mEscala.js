
function mEscala(sx, sy, mObj, tipo) {
    console.log("mobj");
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
        [sx, 0, dx - (dx * sx)],
        [0, sy, dy - (dy * sy)],
        [0, 0, 1]
    ];
    console.log("S");
    console.table(S);

    //var tRetorno = [
    //    [1, 0, dx],
    //    [0, 1, dy],
     //   [0, 0, 1]
    //];
    //console.log("tRetorno");
    //console.table(tRetorno);

    //var subResult = multiplyMatrices(tRetorno, S);
    //console.log("subResult");
    //console.table(subResult);

    var result = multiplyMatrices(S, mObj);
    console.log("Final");
    console.table(result);
   

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

        console.log(result[0][0]);
        console.log(result[1][0]);
        
        var retangulo = new Rectangle(
                {
                    p1: pontos[1],
                    p0: pontos[0],
                    
                }).draw();
        
        resetPontos();
        
        draws.push(retangulo);
        

    }
}
