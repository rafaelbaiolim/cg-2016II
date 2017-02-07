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

function getMaxOfObjs(objs){
	var maior =  [];
	var menor = [];
	for(var i in objs){
		maior.push(pegaMaiorPonto(objs[i]));
		menor.push(pegaMenorPonto(objs[i]));
	}
	return {
	  	menor:	Math.min.apply(null,menor),
	 	maior:	Math.max.apply(null,maior)
	};
}




function zoomExtend(janela, ListaObj) {
	
	var menores = pegaMenorPonto(janela);
	var maiores = pegaMaiorPonto(janela);

	var MaiorMenor = getMaxOfObjs(ListaObj);

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
		
	

	if(ListaObj.length > 0){
		for(var i in ListaObj){
			var result = multiplyMatrices(tJanelaViewport, ListaObj[i].matriz);
			
			desenha(result, ListaObj[i].type);
			
			mapeamentoCentro(result, ListaObj[i].type, this.janela, MaiorMenor);
			
		}
	}
	//console.log("quantidade");
	//console.log(draws);
}



function mapeamentoCentro(mobj, tipo, janela,MaiorMenor) {
	//calcular a proporcao Ratio da Janela e da Viewport
//	var menores = pegaMenorPonto(janela);
//	var maiores = pegaMaiorPonto(janela);
	var menores = pegaMenorPonto(MaiorMenor.menor);
	var maiores = pegaMaiorPonto(MaiorMenor.maior);

	var result;
	
    var xmin = menores.dx, 
    	ymin = menores.dy,
    	xmax = maiores.dx,
    	ymax = maiores.dy;

	console.log("xmin"+xmin);
	console.log("ymin"+ymin);

	console.log("xmax"+xmax);
	console.log("ymax"+ymax);

	var uMax = canvas.width,
        vMax = canvas.height;
    
    console.log("uMax "+uMax);
    console.log("vMax "+vMax);

    var rw = (xmax - xmin)/(ymax - ymin);
	
	var rv = uMax/vMax;

	var uMaxNovo = 0;

	var vMaxNovo = 0;

	//se rw>rv
	 if(rw > rv){ 
	 	vMaxNovo = (uMax/rw);
	 	console.log("vMaxNovo "+vMaxNovo);
	}
	//se rw<rv
	if(rw < rv){ 
		uMaxNovo = rw * vMax;
		console.log("uMaxNovo "+uMaxNovo);
	}

	var tHorizontal = (uMax-uMaxNovo)/2;
	var tVertical= (vMax-vMaxNovo)/2;
	
	console.log("H " + tHorizontal);
	//console.log("V"+tVertical);

	var translacaoVertical = [ [1, 0, 0],
	  						   [0, 1, tVertical],
	  						   [0, 0, 1]];

	var translacaoHorizontal = [[1, 0, tHorizontal],
	 						   [0, 1, 0],
	 						   [0, 0, 1]];
	
	//transladar para o centro
	
	
	if(rw > rv){ 
		console.log("maior");
		//ajustar pela altura

		result = multiplyMatrices(translacaoVertical, mobj);
		console.table(result);
		clearCanvas();
		desenha(result, tipo);

	}
	if(rw < rv){
		console.log("menor");
		//ajustar pela largura
		result = multiplyMatrices(translacaoHorizontal, mobj);
		console.table(result);
		clearCanvas();
		desenha(result, tipo);
	}	
	console.log("------------------------");   	
	

	
}











