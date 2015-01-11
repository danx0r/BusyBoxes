var DEBUG = true;

function Grid(x, y, z, mod_range, mode){
  this.dimx = x;
  this.dimy = y;
  this.dimz = z;
  this.halfX = Math.floor(x/2);
  this.halfY = Math.floor(y/2);
  this.halfZ = Math.floor(z/2);

  this.mode = mode;
  this.mod_range = mod_range;

  this.cells = {};
  this.new_cells = {}; //all existing cells object
  
  this.get = function(x, y, z){
  	//turn xyz into key
  	var key = ""+x+","+y+","+z;
  	var cell_state = this.cells[key]
  	if(cell_state){
  		return cell_state
  	}
  	return 0;
  }

  this.get_new = function(x, y, z){
    //turn xyz into key
    var key = ""+x+","+y+","+z;
    var cell_state = this.new_cells[key]
    if(cell_state){
      return cell_state
    }
    return 0;
  }

  //update new set of cells
	this.put= function(x, y, z, cell_state){
		var key = ""+x+","+y+","+z;
		if(cell_state){
			this.new_cells[key] = cell_state;
		}else{
			//research this
			delete this.new_cells[key];
		}
	}


  this.iterate = function(cb){
  	var new_cells = {};

  	for(var x = -this.halfX; x < this.halfX; x++){
  		for(var y = -this.halfY; y < this.halfY; y++){
  			for(var z = -this.halfZ; z < this.halfZ; z++){
  				var new_state = cb(this, x,y,z);
  				this.put(x,y,z,new_state);

  			}
  		}
  	}
  }

  this.iterate_nop = function(cb){
    var new_cells = {};

    for(var x = -this.halfX; x < this.halfX; x++){
      for(var y = -this.halfY; y < this.halfY; y++){
        for(var z = -this.halfZ; z < this.halfZ; z++){
          var new_state = cb(this, x,y,z);
          

        }
      }
    }
  }
  
  // copy new_cells to cells for setup and tests
  this.update = function() {
    this.cells = this.new_cells;
    this.new_cells = {};
  }
}




//C2
test_rule = function(grid, x,y,z){
	//if cell is alive--kill it
	//var cell = this.get(x,y,z);
	var neighbor = grid.get(x+1,y,z);
	if(neighbor){
		console.log("nabe @", x, y, z);
		return 1;
	}else{
		return 0;
	}
	//if cell at -1,y,z then come alive
}

if (DEBUG === true){
  //TESTS
  var grid = new Grid(10, 10, 10);
  grid.put(5, 5, 5, 1);
  console.log("Should be 0: ", grid.get(3,3,3));
  console.log("Should be 1: ", grid.get(5,5,5));
  grid.put(5, 5, 5, 0);
  console.log("We deleted. Should be 0: ", grid.get(5,5,5));
  console.log("Should be empty: ", grid.cells);
  grid.put(5, 5, 5, 1);
  grid.update();
  console.log("grid cells: ", grid.new_cells);
  grid.iterate(test_rule);
  console.log("grid cells: ", grid.cells);
}

