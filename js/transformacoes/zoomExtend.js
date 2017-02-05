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

function zoomExtend(mousePos, tipo) {
	var objetos = intersecaoPontos();
	console.log("i"+objetos);
	// var E = [[1, 0, 0],
	// 		[0,-1, 0], 
	// 		[0, 0, 1]];

	var Tjv = [[Sx, 0 , -Sx*Xmin],
			   [0, -Sy , -Sy*Ymin],
			   [0, 0, 1]
			   ];

	//calcular a proporcao Ratio da Janela e da Viewport
	var rw, rv;
	var translacaoVertical1 = [[x.Sx - Sx*Xmin],
									 [-y*Sy - Sy*Ymin - ((vMax-vMaxNovo)/2)],
									 [1]];

	var translacaoVertical2 = [[x.Sx - Sx*Xmin - ((uMax-uMaxNovo)/2)],
							   [-y*Sy - Sy*Ymin],
							   [1]];
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

