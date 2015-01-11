gol3DRule455 = function(grid, x,y,z){
	//var neighbor = grid.get(x-1,y+1,z);
	var nabes = 0;

	for(var i = -1; i<= 1; i++){
		for(var j = -1; j<= 1; j++){
			for(var k = -1; k<= 1; k++){
				if((i!=0 || j!=0 || k!=0) && grid.get(x+i,y+j, z+k)){
					nabes++;
				}
			}
		}
	}
	if(nabes == 0){
		return 0;		
	}
	// console.log("NABES and xyz: ", nabes, [x,y,z]);
	if(grid.get(x,y,z)){
		if(nabes<4 || nabes > 5){
			return 0;
		}else{
			return 1;
		}
	}else{
		if(nabes === 5){
			return 1;
		}else{
			return 0;
		}
		
	}
}

