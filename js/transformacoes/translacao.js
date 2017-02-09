function transladarObjetos(dx, dy, indexObj, mObj, tipo) {
    dx = (dx === 0 ? 1 : dx);
    dy = (dy === 0 ? 1 : dy);

    var mT = [
        [1, 0, dx],
        [0, 1, dy],
        [0, 0, 1]
    ];
    var result = multiplyMatrices(mT, mObj);
    clearCanvas(indexObj);

    desenha(result, tipo);

}
