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
	console.table(result);

	clearCanvas();
	
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
    //mapeamentoCentro(result);
	
	
	

}
// function mapeamentoCentro(mObj){
// 	//calcular a proporcao Ratio da Janela e da Viewport
// 	var menores = pegaMenorPonto(mObj);
// 	var maiores = pegaMaiorPonto(mObj);


	
//     var xmin = menores.dx, 
//     	ymin = menores.dy,
//     	xmax = maiores.dx,
//     	ymax = maiores.dy;
	
	
// 	var uMax = canvas.width,
//         vMax = canvas.height;
    
//     var sx = (uMax - 0) / (xmax - xmin),
// 		sy = (vMax - 0) / (ymax - ymin);
// 	//Aspect Ratio
// 	var rw = (xmax-xmin)/(ymax - xmin);
// 	var rv = (uMax-0)/(vMax - 0);
// 	//se rw>rv
// 	var vMaxNovo = ((uMax-0)/rw)+0;
// 	//se rw<rv
// 	var uMaxNovo = (rw * (vMax-0))+0;


// 	var translacaoVertical = [ [x*sx -  sx*xmin],
// 	 							[-y*sy - sy*ymin - ((vMax-vMaxNovo)/2)],
// 	 							[1]];

// 	var translacaoHorizontal = [[x*sx - sx*xmin - ((uMax-uMaxNovo)/2)],
// 	 						   [-y*sy - sy*ymin],
// 	 						   [1]];
		
// 	//transladar para o centro
// 	if(rw > rv){ 
// 		//ajustar pela altura
// 		var result = (translacaoVertical, mObj);

// 	}
// 	if(rw < rv){
// 		//ajustar pela largura
// 		var result = (translacaoHorizontal, mObj);
// 	}	   		
// 	clearCanvas();

// 	if (tipo == "LINHA") {
//         addDotToCanvas(result[0][0], result[1][0]);
//         addDotToCanvas(result[0][1], result[1][1]);

//         var linha = new Line({
//             xO: pontos[0].posX,
//             yO: pontos[0].posY,
//             xD: pontos[1].posX,
//             yD: pontos[1].posY,

//         }).draw();
//         draws.push(linha);
//     }
    
//     if (tipo == "RETANGULO") {
//         addDotToCanvas(result[0][0], result[1][0]);
//         addDotToCanvas(result[0][2], result[1][2]);

//         var retangulo = new Rectangle(
//                 {
//                     p1: pontos[1],
//                     p0: pontos[0],

//                 }).draw();

//         draws.push(retangulo);
//     }
//     resetPontos();

//     if(tipo == "TRIANGULO"){   
//         addDotToCanvas(result[0][0],result[1][0]);
//         addDotToCanvas(result[0][1],result[1][1]);

//         console.log(result[0][0]);
//         console.log(result[1][0]);
        
//         var triangulo = new Triangle(
//                 {
//                     p1: pontos[1],
//                     p0: pontos[0],
                    
//                 }).draw();
        
//         resetPontos();
        
//         draws.push(triangulo);
        

//     }

// }











