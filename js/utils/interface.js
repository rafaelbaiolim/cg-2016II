$(document).ready(function () {
    var classBtnAtivo = "btn-tranformacao-ativa";

    var btnRotacao = $("#btnRotacao");
    var btnMudanca = $("#btnMudanca");
    var btnTranslacao = $("#btnTranslacao");
    var btnExtend = $("#btnExtend");

    construtor();

    /**
     * Esconde todos os campos
     * @returns {undefined}
     */
    function hideAllFields() {
        $("#areaZoom").hide();
        $("#areaEscala").hide();
        $("#areaTranslacao").hide();
        $("#areaRotacao").hide();
    }

    /**
     * Retira a classe ativa dos botões
     * @returns {undefined}
     */
    function removerBtnAtivo() {
        btnMudanca.removeClass(classBtnAtivo);
        btnTranslacao.removeClass(classBtnAtivo);
        btnRotacao.removeClass(classBtnAtivo);
        btnExtend.removeClass(classBtnAtivo);
    }

    /**
     * 
     * @returns {undefined}
     */
    function ativarBotao(idBtn) {
        ativarBtnDrawsType();
        removerBtnAtivo();
        $("#" + idBtn).addClass(classBtnAtivo);
    }


    /**
     * Mostra área de calculo apenas do obj 
     * clicado
     * @param {type} idArea
     * @returns {undefined}
     */
    function showOnly(idArea) {
        hideAllFields();
        $("#" + idArea).show();
    }

    function construtor() {
        hideAllFields();
        $("#canvasAttr").html(
                "Canvas (px) : " +
                canvas.width + " x " +
                canvas.height);
    }


    btnMudanca.on("click", function () {
        showOnly("areaEscala");
        ativarBotao(btnMudanca.attr("id"));

    });

    btnTranslacao.on("click", function () {
        showOnly("areaTranslacao");
        ativarBotao(btnTranslacao.attr("id"));
    });

    btnRotacao.on("click", function () {
        showOnly("areaRotacao");
        ativarBotao(btnRotacao.attr("id"));
    });

    btnExtend.on("click", function () {
        showOnly("areaZoom");
        ativarBotao(btnExtend.attr("id"));
    });


});


/**
 * Informa qual campo deve ser informado para 
 * prosseguir
 * @returns {undefined}
 */
function alertProsseguir(campo) {
    alert("Informe " + campo + " para prosseguir");
}

/**
 * Mostra o cursor de espera no canvas
 */
function showLoadCursor() {
    $(".container").css("cursor", "wait");
}


/**
 * Mostra o cursor de espera no canvas
 */
function showDefaultCursor() {
    $(".container").css("cursor", "default");
}

/**
 * Desativa os botões de desenho para o zoom
 * @returns {undefined}
 */
function desativarBtnDrawsType() {
    $("#tipoLinha").prop("disabled", true);
    $("#tipoRetangulo").prop("disabled", true);
    $("#tipoTriangulo").prop("disabled", true);
    var classAtivo = "ativo";

    $("#tipoLinha").removeClass(classAtivo);
    $("#tipoRetangulo").removeClass(classAtivo);
    $("#tipoTriangulo").removeClass(classAtivo);

    var classDisabled = "btn-disabled";
    $("#tipoLinha").addClass(classDisabled);
    $("#tipoRetangulo").addClass(classDisabled);
    $("#tipoTriangulo").addClass(classDisabled);
}

function ativarBtnDrawsType() {
    $("#tipoLinha").prop("disabled", false);
    $("#tipoRetangulo").prop("disabled", false);
    $("#tipoTriangulo").prop("disabled", false);

    var classDisabled = "btn-disabled";
    $("#tipoLinha").removeClass(classDisabled);
    $("#tipoRetangulo").removeClass(classDisabled);
    $("#tipoTriangulo").removeClass(classDisabled);


}