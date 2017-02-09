/**
 * Pega o menor ponto
 * @param {type} mObj
 * @returns {pegaMenorPonto.mathAnonym$0}
 */
function pegaMenorPonto(mObj) {
    var dx = Math.min.apply(null, mObj[0]);
    var dy = Math.min.apply(null, mObj[1]);
    return {dx: dx, dy: dy};
}

/**
 * Pega o maior Ponto 
 * @param {type} mObj
 * @returns {pegaMaiorPonto.mathAnonym$1}
 */
function pegaMaiorPonto(mObj) {
    var dx = Math.max.apply(null, mObj[0]);
    var dy = Math.max.apply(null, mObj[1]);
    return {dx: dx, dy: dy};

}

/**
 * Pega o maior elemento do vetor
 * @returns {unresolved}
 */
Array.prototype.max = function () {
    return Math.max.apply(null, this);
};

/**
 * Pega o menor elemento do vetor
 */
Array.prototype.min = function () {
    return Math.min.apply(null, this);
};


/**
 * Multiplica matrizes
 * @param {type} m1
 * @param {type} m2
 * @returns {Array}
 */
function multiplyMatrices(m1, m2) {
    var result = [];
    try {
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
    } catch (err) {
    }
    return result;
}


/**
 * Procura se já existe um valor no array
 * considerado uma margem de erro de 10pt
 * @param {type} value
 * @param {type} arr
 * @returns {Number|nearByDot.arr}
 */
function nearByDot(value, arr) {
    for (var i in arr) {
        for (j = 0; j < 10; j++) {
            if (!isNaN(arr[i])) {
                if (Math.floor(arr[i]) == Math.floor(value) + j ||
                        Math.floor(arr[i]) == Math.floor(value) - j) {
                    return i;
                }

            }
        }
    }
    return -1;
}


/**
 * Procura intersecções do obj
 * @param {type} x
 * @param {type} y
 * @returns {undefined|Boolean}
 */
function procurarObjPorInterseccao(x, y) {
    if (draws <= 0) {
        return;
    }

    if (!x) {
        x = coordAtual.x;
    }

    if (!y) {
        y = coordAtual.y;
    }

    for (var i in draws) {
        if (draws[i].matriz) {
            if (nearByDot(x, draws[i].matriz[0]) !== -1 &&
                    nearByDot(y, draws[i].matriz[1]) !== -1
                    ) {
                return draws[i];
            }
        }
    }
    return false;
}

/**
 * Pega o maior dos maiores elementos de 
 * um vetor
 * @param {type} objs
 * @returns {getMaxOfObjs.mathAnonym$2}
 */
function getMaxOfObjs(objs) {
    var maior = [];
    var menor = [];
    for (var i in objs) {
        maior.push(pegaMaiorPonto(objs[i]));
        menor.push(pegaMenorPonto(objs[i]));
    }
    return {
        menor: Math.min.apply(null, menor),
        maior: Math.max.apply(null, maior)
    };
}