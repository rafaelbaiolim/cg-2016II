/**
 * Apaga os pontos do canvas
 * @returns {undefined}
 */
function resetPontos() {
    pontos = [];
}

/**
 * Coloca o canvas na posição (0,0)
 * @returns {undefined}
 */
function fixYAbs() {
    ctx.transform(1, 0, 0, -1, 0, canvas.height);
}

/**
 * Volta o quadrante padrão do canvas
 * @returns {undefined}
 */
function defaultYAbs() {
    ctx.transform(1, 1, 0, 1, 0, 0);
}
