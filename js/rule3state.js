/*
 * Dan and Rafale's new three state rule. Right now this is only implemeneted as 2-d rule.
 */
rule3state = function(grid, x,y,z, frame){
	//console.log("grid.get(x, y, z): " + grid.get(x, y, z));

	if ((x + y + z & 1) != (frame & 1)) return; 								// only process if field parity is correct

	var done = false;
	var newState;

	if (grid.get(x, y, z+1) === 1 || grid.get(x+1, y, z) === -1) {
		if (done) {
			return;
		} else {
			done = true;
		}

		newState = grid.get(x+1, y, z+1);
	}

	if (grid.get(x, y, z-1) === 1 || grid.get(x-1, y, z) === -1) {
		if (done) {
			return;
		} else {
			done = true;
		}

		newState = grid.get(x-1, y, z-1);
	}

	if (grid.get(x+1, y, z) === 1 || grid.get(x, y, z-1) === -1) {
		if (done) {
			return;
		} else {
			done = true;
		}

		newState = grid.get(x+1, y, z-1);
	}

	if (grid.get(x-1, y, z) === 1 || grid.get(x, y, z+1) === -1) {
		if (done) {
			return;
		} else {
			done = true;
		}

		newState = grid.get(x-1, y, z+1);
	}

	return newState;
}
