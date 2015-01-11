golRule = function(grid, x,y,z){
	//if cell is alive--kill it
	//var cell = this.get(x,y,z);

	//var neighbor = grid.get(x-1,y+1,z);
	var nabes = 0;

	for(var i = -1; i<= 1; i++){
		for(var j = -1; j<= 1; j++){
		
			if((i!=0 || j!=0) && grid.get(x+i,y, z+j)){
				nabes++;
			}
		}
	}
	if(nabes == 0){
		return 0;		
	}
	// console.log("NABES and xyz: ", nabes, [x,y,z]);
	if(grid.get(x,y,z)){
		if(nabes<2 || nabes > 3){
			return 0;
		}else{
			return 1;
		}
	}else{
		if(nabes === 3){
			return 1;
		}else{
			return 0;
		}
		
	}
	//if cell at -1,y,z then come alive
}

