/*
 * implements the BusyBoxes reversible CA as outlined here:
 * http://arxiv.org/abs/1206.2060
 */

//STATES=3;

bb3StateRule = function(grid, x, y, z, frm) {
	var offx, offy, offz, swpx, swpy, swpz;
	var coi = grid.get(x, y, z);
	if ((x + y + z & 1) != (frm & 1)) return coi; 								// only process if field parity is correct

	function getSwap(x, y, z) {													// return valid swap offset or null if there is contention
		var swapx = null, swapy = null;
		for (var i=0; i<8; i++) {
			var xx = x+offx[i];
			var yy = y+offy[i];
			var zz = z+offz[i];
			if (grid.get(xx, yy, zz)) {
				if ((swapx != null) && (swapx != swpx[i] || swapy != swpy[i] || swapz != swpz[i]) ) { // swap confict, forgeddaboudit
					return null;
				}
				swapx = swpx[i];
				swapy = swpy[i];
				swapz = swpz[i];
			}
		}
		if (swapx == null) return null;
		return [swapx, swapy, swapz];
	}

	function getSwap2(x, y, z) {													// return valid swap offset or null if there is contention
		var swapx = null, swapy = null;
		for (var i=0; i<4; i++) {
			var xx = x+offx[i];
			var yy = y+offy[i];
			var zz = z+offz[i];
			if (grid.get(xx, yy, zz)) {
				if ((swapx != null) && (swapx != swpx[i] || swapy != swpy[i] || swapz != swpz[i]) ) { // swap confict, forgeddaboudit
					return null;
				}
				swapx = swpx[i];
				swapy = swpy[i];
				swapz = swpz[i];
			}
		}
		if (swapx == null) return null;
		return [swapx, swapy, swapz];
	}

	function onePlane() {
		console.log("rule is running", coi );
		if(coi === 1){
			console.log("state is 1");
			var swap = getSwap(x, y, z);
		}else if(coi === 0){
			var swap = getSwap(x, y, z);
		}else if(coi === -1){
			console.log("state is -1");
			var swap = getSwap2(x, y, z);
			
		}																																// process one of 3 planes dep on phase
		//var swap = getSwap(x, y, z);											// proposed swap cell as delta from xyz
		if (swap != null) {														// if valid (no immediate conflicts)
			var swapper = grid.get(x+swap[0], y+swap[1], z+swap[2]);   			// get state at swap cell
			if (swapper != coi) {												// if state is different from ours, we might swap
				var revswap = getSwap(x+swap[0], y+swap[1], z+swap[2]);			// proposed swap for swap cell
				if (revswap != null) {
					if ( (swap[0] + revswap[0] == 0) && 
						 (swap[1] + revswap[1] == 0) &&							// if it matches (mutual proposed swaps), do this thing
						 (swap[2] + revswap[2] == 0)) {							// we return his state; he will return ours.
						return swapper;											// That's what we call a swap, Scooby Doo
					}
				}
			}
		}
		return coi;
	}
	
	var m = trueMod(frame, 3);													// set up offsets & swap coords dep on phase
	if (m==0) {
		offx = bb_offsetx;
		offy = bb_offsety;
		offz = bb_offsetz;
		swpx = bb_swapx;
		swpy = bb_swapy;
		swpz = bb_swapz;
	}
	if (m==1) {
		offx = bb_offsetz;
		offy = bb_offsetx;
		offz = bb_offsety;
		swpx = bb_swapz;
		swpy = bb_swapx;
		swpz = bb_swapy;
	}
	if (m==2) {
		offx = bb_offsety;
		offy = bb_offsetz;
		offz = bb_offsetx;
		swpx = bb_swapy;
		swpy = bb_swapz;
		swpz = bb_swapx;
	}
	return onePlane();
}

// Knight's move offsets
var bb_offsetx = [+2, +1, -1, -2, +2, +1, -1, -2];
var bb_offsety = [+1, +2, +2, +1, -1, -2, -2, -1];
var bb_offsetz = [0, 0, 0, 0, 0, 0, 0, 0];

// corresponding swap offsets
var bb_swapx = [+1, -1, +1, -1, +1, -1, +1, -1];
var bb_swapy = [-1, +1, +1, -1, +1, -1, -1, +1];
var bb_swapz = [0, 0, 0, 0, 0, 0, 0, 0];


//THIRD STATE STUFF
var bb3_offsetx = [+2, +1, -1, -2, +2, +1, -1, -2];
var bb3_offsety = [+1, +2, +2, +1, -1, -2, -2, -1];

var bb3_swapx = [0, 2, -2, 0, 0, -2, 2, 0]
var bb3_swapy = [2, 0, 0, 2. -2, 0, 0, -2]




// Javascript ftw
function trueMod(v, base) {
    if (v < 0) {
        return ((v % base) + base) % base;
    }
    return v % base;
}

// and TDD also ftw
bb_TEST=0;
if(bb_TEST) {
	var grid = new Grid(10, 10, 10);
	grid.put(0, 0, 0, 1);
	grid.put(1, 2, 0, 1);
	// grid.put(-1, 2, 0, 1);
	console.log("bbRule returns:", bbRule(grid, 0, 0, 0));
	console.log("bbRule returns:", bbRule(grid, -1, 1, 0));
}

