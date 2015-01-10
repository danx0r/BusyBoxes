function Grid(x, y, z, mod_range, mode){
  this.x = x;
  this.y = y;
  this.z = z;
  this.mode = mode;

  this.cells = {}; //all existing cells object
  
  this.get(x, y, z){
  	//turn xyz into key
  	var key = ""+x+","+y+","+z;
  	var cell_state = this.cells[key]
  	if(cell_state){
  		return cell_state
  	}
  	return 0;
  }

	this.put(x, y, z, cell_state){
		var key = ""+x+","+y+","+z;
		if(cell_state){
			this.cells[key] = cell_state;
		}else{
			//research this
			delete this.cells[key];
		}
	}

  this.iterate = function(cb){

  }

}


var grid = new Grid(10, 10, 10);
grid.put(5, 5, 5, 1);
console.log("Should be 0: ", grid[3,3,3]);
console.log("Should be 1: ", grid[5,5,5]);
grid.put(5, 5, 5, 0);
console.log("We deleted. Should be 0: ", grid[5,5,5]);
console.log("Should be empty: ", grid.cells);