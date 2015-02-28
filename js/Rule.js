gRule = function(grid, x,y,z){
	//if cell is alive--kill it
	//var cell = this.get(x,y,z);
	var neighbor = grid.get(x-1,y,z);
	if(neighbor){
		console.log("nabe @", x, y, z);
		return 1;
	}else{
		return 0;
	}
	//if cell at -1,y,z then come alive
}

