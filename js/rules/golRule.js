/*
 * the classic. 3 neighbors births a cell; 2 or 3 neighbors to survive
 */
golRule = function(grid, x,y,z){
	var nabes = 0;
	for(var i = -1; i<= 1; i++){
		for(var j = -1; j<= 1; j++){
			if((i!=0 || j!=0) && grid.get(x+i,y, z+j)){
				nabes++;
			}
		}
	}
	if(grid.get(x,y,z)){
		if(nabes < 2 || nabes > 3) return 0;
	} else {
		if(nabes == 3) return 1;
	}
}
