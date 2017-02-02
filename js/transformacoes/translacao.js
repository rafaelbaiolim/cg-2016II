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


function transladarObjetos(dx, dy, mObj) {
    var mT = [
        [1, 0, dx],
        [0, 1, dy],
        [0, 0, 1]
    ];
    var result = multiplyMatrices(mT, mObj);
    clearCanvas();
    addDotToCanvas(result[0][0],result[0][1]);
    addDotToCanvas(result[2][0],result[2][1]);

    var retangulo = new Rectangle(
            {
                p0: pontos[0],
                p1: pontos[1],
            }).draw();
    resetPontos();
    draws.push(retangulo);
    console.table(result);
}
