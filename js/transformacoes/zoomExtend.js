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

function zoomExtend(mousePos, tipo) {
	var objetos = intersecaoPontos();
	console.log("i"+objetos);
	// var E = [[1, 0, 0],
	// 		[0,-1, 0], 
	// 		[0, 0, 1]];

	var Tjv = [[Sx, 0 , -Sx*Xmin],
		   [0, -Sy , -Sy*Ymin],
		   [0, 0, 1]];		

}