function mEscala(sx, sy, indexObj, mObj, tipo) {
    var menores = pegaMenorPonto(mObj);
    (sx === 0 ? 1 : sx);
    (sy === 0 ? 1 : sy);

    var dx = menores.dx, dy = menores.dy;

    var S = [
        [sx, 0, dx - (dx * sx)],
        [0, sy, dy - (dy * sy)],
        [0, 0, 1]
    ];

    var result = multiplyMatrices(S, mObj);
    clearCanvas(indexObj);

    desenha(result, tipo);

}
