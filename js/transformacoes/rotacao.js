function rotacionarObjetos(graus, indexObj, mObj, tipo) {
    var menores = pegaMenorPonto(mObj);

    console.log(menores);

    var dx = menores.dx, dy = menores.dy;

    console.log(dx);
    console.log(dy);
    var cos = Math.round(Math.cos(graus * Math.PI / 180));
    var sen = Math.round(Math.sin(graus * Math.PI / 180));

    console.log(cos);
    console.log(sen);

    var R = [
        [cos, -sen, (dy * sen) - (dx * cos) + dx],
        [sen, cos, (-dx * sen) - (dy * cos) + dy],
        [0, 0, 1]
    ];

    var result = multiplyMatrices(R, mObj);
    clearCanvas(indexObj);

    desenha(result, tipo);

}