// function intersecaoPontos(mousePos){
// 	for(var i in draws){
// 		var drawAtual = draws[i];
// 		for(var j in drawAtual.dots){
// 		   if(drawAtual.dots[j].posX == mouse.X && drawAtual.dots[j].posY == mouse.Y){
// 		      return i // Ou return drawAtual // que é o obj selecionado
// 		  }
// 		}
// 	}	
// };

function calcularProporcao(largura, altura){
	var R = this.largura / this.altura;
}

function zoomExtend(janela, tipo, mObj) {
	console.table(mObj);
	// var objetos = intersecaoPontos();
	// console.log("i"+objetos);
	// var E = [[1, 0, 0],
	// 		[0,-1, 0], 
	// 		[0, 0, 1]];
	var menores = pegaMenorPonto(janela);
	var maiores = pegaMaiorPonto(janela);


	
    var xmin = menores.dx, 
    	ymin = menores.dy,
    	xmax = maiores.dx,
    	ymax = maiores.dy;
	
	
	var uMax = canvas.width,
        vMax = canvas.height;
    
    var sx = (uMax - 0) / (xmax - xmin),
		sy = (vMax - 0) / (ymax - ymin);
	 
	

	var tJanelaViewport = [ [sx, 0 ,  (-sx*xmin)],
			   			[0, -sy , (-sy*ymin)],
			   			[0, 0, 1]];

	var result = multiplyMatrices(tJanelaViewport, mObj);
	//console.table(result);

	 if (tipo == "LINHA") {
        addDotToCanvas(result[0][0], result[1][0]);
        addDotToCanvas(result[0][1], result[1][1]);

        var linha = new Line({
            xO: pontos[0].posX,
            yO: pontos[0].posY,
            xD: pontos[1].posX,
            yD: pontos[1].posY,

        }).draw();
        draws.push(linha);
    }
    
    if (tipo == "RETANGULO") {
        addDotToCanvas(result[0][0], result[1][0]);
        addDotToCanvas(result[0][2], result[1][2]);

        var retangulo = new Rectangle(
                {
                    p1: pontos[1],
                    p0: pontos[0],

                }).draw();

        draws.push(retangulo);
    }
    resetPontos();

    if(tipo == "TRIANGULO"){   
        addDotToCanvas(result[0][0],result[1][0]);
        addDotToCanvas(result[0][1],result[1][1]);

        console.log(result[0][0]);
        console.log(result[1][0]);
        
        var triangulo = new Triangle(
                {
                    p1: pontos[1],
                    p0: pontos[0],
                    
                }).draw();
        
        resetPontos();
        
        draws.push(triangulo);
        

    }
	
	//calcular a proporcao Ratio da Janela e da Viewport
	var rw, rv;
	// var translacaoVertical1 = [ [x.Sx - Sx*Xmin],
	// 							[-y*Sy - Sy*Ymin - ((vMax-vMaxNovo)/2)],
	// 							[1]];

	// var translacaoVertical2 = [[x.Sx - Sx*Xmin - ((uMax-uMaxNovo)/2)],
	// 						   [-y*Sy - Sy*Ymin],
	// 						   [1]];
	if(rw > rv){ 
		//ajustar pela altura

	}
	if(rw < rv){
		//ajustar pela largura
	}	
	//transladar para o centro
	if(rw > rv){ 
		//ajustar pela altura

	}
	if(rw < rv){
		//ajustar pela largura
	}	   		

}

