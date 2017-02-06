function transladarObjetos(dx, dy, mObj, tipo) {
    var mT = [
        [1, 0, dx],
        [0, 1, dy],
        [0, 0, 1]
    ];
    var result = multiplyMatrices(mT, mObj);
    clearCanvas();
		
	desenha(result, tipo);

}
