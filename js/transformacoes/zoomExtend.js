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

// function calcularProporcao(largura, altura){
// 	var R = this.largura / this.altura;
// }


function zoomExtend(janela, tipo, ListaObj) {
	
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
	

	var tJanelaViewport = [ 
						   [sx, 0 ,  (-sx*xmin)],
			   			   [0, sy , (-sy*ymin)],
			   			   [0, 0, 1]
			   			  ];

	clearCanvas();
		
	
	for(var i in ListaObj){
		var result = multiplyMatrices(tJanelaViewport, ListaObj[i].matriz);
		
		result.type = ListaObj[i].type;
		
		console.table(result);

		desenha(result, result.type)
	}
	console.log("quantidade");
	console.log(draws);

	//mapeamentoCentro(janela.matriz, result, result.type);
	
	

}
function mapeamentoCentro(janela, mObj, tipo){
	//calcular a proporcao Ratio da Janela e da Viewport

	var menores = pegaMenorPonto(janela);
	var maiores = pegaMaiorPonto(janela);

	var result;
	
    var xmin = 0, 
    	ymin = 0,
    	xmax = maiores.dx,
    	ymax = maiores.dy;
	
	
	var uMax = canvas.width,
        vMax = canvas.height;
    
    var sx = (uMax - 0) / (xmax - xmin),
		sy = (vMax - 0) / (ymax - ymin);
	//Aspect Ratio
	var rw = (xmax-xmin)/(ymax - xmin);
	var rv = (uMax-0)/(vMax - 0);
	//se rw>rv
	var vMaxNovo = ((uMax-0)/rw)+0;
	//se rw<rv
	var uMaxNovo = (rw * (vMax-0))+0;


	var translacaoVertical = [ [sx, 0, -sx*xmin],
	 						   [0,-sy, sy*ymin - ((vMax-vMaxNovo)/2)],
	 							[0, 0, 1]];

	var translacaoHorizontal = [[sx, 0, sx*xmin - ((uMax-uMaxNovo)/2)],
	 						   [0, -sy, -sy*ymin],
	 						   [0, 0, 1]];
		
	//transladar para o centro
	clearCanvas();
		
	
	if(rw > rv){ 
		//ajustar pela altura
		result = (translacaoVertical, mObj);
		result.type = tipo;
		desenha(result, result.type);

	}
	if(rw < rv){
		//ajustar pela largura
		result = (translacaoHorizontal, mObj);
		result.type = tipo;
		desenha(result, result.type);
	}	   		
	

	
}











