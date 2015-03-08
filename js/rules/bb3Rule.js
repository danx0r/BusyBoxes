/*
 * implements the BusyBoxes reversible CA as outlined here:
 * http://arxiv.org/abs/1206.2060
 */


bb3Rule = function(grid, x, y, z, frm) {
	var offx, offy, offz, swpx, swpy, swpz;
	var coi = grid.get(x, y, z);
	if ((x + y + z & 1) != (frm & 1)) return coi; 								// only process if field parity is correct

	function getSwap(x, y, z) {													// return valid swap offset or null if there is contention
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

	function onePlane() {														// process one of 3 planes dep on phase
		var swap = getSwap(x, y, z);											// proposed swap cell as delta from xyz
		if (swap != null) {														// if valid (no immediate conflicts)
			var swapper = grid.get(x+swap[0], y+swap[1], z+swap[2]);   			// get state at swap cell
			if (swapper != coi) {														// if state is different from ours, we might swap
				// var revswap = getSwap(x+swap[0], y+swap[1], z+swap[2]);			// proposed swap for swap cell
				// if (revswap != null) {
					// if ( (swap[0] + revswap[0] == 0) && 
						 // (swap[1] + revswap[1] == 0) &&							// if it matches (mutual proposed swaps), do this thing
						 // (swap[2] + revswap[2] == 0)) {							// we return his state; he will return ours.
						/// for now, no conflict resolution
						return swapper;											// That's what we call a swap, Scooby Doo
					// }
				// }
			}
		}
		return coi;
	}
	
	var m = trueMod(frame, 6);													// set up offsets & swap coords dep on phase
	if (m==0) {
		offx = bb3_offsetx;
		offy = bb3_offsety;
		offz = bb3_offsetz;
		swpx = bb3_swapx;
		swpy = bb3_swapy;
		swpz = bb3_swapz;
	}
	if (m==1) {
		return;
		offx = bb3_offsetz;
		offy = bb3_offsetx;
		offz = bb3_offsety;
		swpx = bb3_swapz_cc;
		swpy = bb3_swapx_cc;
		swpz = bb3_swapy_cc;
	}
	if (m==2) {
		offx = bb3_offsety;
		offy = bb3_offsetz;
		offz = bb3_offsetx;
		swpx = bb3_swapy;
		swpy = bb3_swapz;
		swpz = bb3_swapx;
	}
	if (m==3) {
		offx = bb3_offsetx;
		offy = bb3_offsety;
		offz = bb3_offsetz;
		swpx = bb3_swapx_cc;
		swpy = bb3_swapy_cc;
		swpz = bb3_swapz_cc;
	}
	if (m==4) {
		offx = bb3_offsetz;
		offy = bb3_offsetx;
		offz = bb3_offsety;
		swpx = bb3_swapz;
		swpy = bb3_swapx;
		swpz = bb3_swapy;
	}
	if (m==5) {
		offx = bb3_offsety;
		offy = bb3_offsetz;
		offz = bb3_offsetx;
		swpx = bb3_swapy_cc;
		swpy = bb3_swapz_cc;
		swpz = bb3_swapx_cc;
	}
	return onePlane();
}

// Knight's move offsets
var bb3_offsetx = [+0, -1, +1, -0];
var bb3_offsety = [+1, +0, -0, -1];
var bb3_offsetz = [0, 0, 0, 0];

// corresponding swap offsets
// clockwise
var bb3_swapx = [+1, -1, +1, -1];
var bb3_swapy = [+1, +1, -1, -1];
var bb3_swapz = [0, 0, 0, 0];

// corresponding swap offsets
// counter-clockwise
var bb3_swapx_cc = [-1, -1, +1, +1];
var bb3_swapy_cc = [+1, -1, +1, -1];
var bb3_swapz_cc = [0, 0, 0, 0];

// Javascript ftw
function trueMod(v, base) {
    if (v < 0) {
        return ((v % base) + base) % base;
    }
    return v % base;
}

// and TDD also ftw
bb3_TEST=0;
if(bb3_TEST) {
	var grid = new Grid(10, 10, 10);
	grid.put(0, 0, 0, 1);
	grid.put(1, 2, 0, 1);
	// grid.put(-1, 2, 0, 1);
	console.log("bbRule returns:", bbRule(grid, 0, 0, 0));
	console.log("bbRule returns:", bbRule(grid, -1, 1, 0));
}

