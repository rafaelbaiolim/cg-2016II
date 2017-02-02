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


function multiplyMatrix(a, b) {
    c = [];
 
    for (i = 0; i < a.length; i++) {
        r = [];
        for (j = 0; j < b[0].length; j++) {
            s = 0;
            for (k = 0; k < b.length; k++) {
                s += a[i][k] * b[k][j];
            }
            r.push(s);
        }
        c.push(r);
    }
    return c;
} 

function transladarObjetos(dx, dy, mObj) {
    console.log("dx: "+dx);
    console.log("dy: "+dy);
    var mT = [
        [1, 0, dx],
        [0, 1, dy],
        [0, 0, 1]
    ];
    var result = multiplyMatrix(mT, mObj);
    
    console.log("wow");   
    console.table(result);


    clearCanvas();
       
    console.log("x> "+result[0][0]);
    console.log("y> "+result[1][0]);   
    addDotToCanvas(result[0][0],result[1][0]);

    console.log("x2> "+result[0][2]);
    console.log("y2> "+result[1][2]);
    addDotToCanvas(result[0][2],result[1][2]);

    var retangulo = new Rectangle(
            {
                p1: pontos[1],
                p0: pontos[0],
                
            }).draw();
    
    resetPontos();
    
    draws.push(retangulo);
    //console.table(result);
}
