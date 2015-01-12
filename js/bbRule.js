bb_TEST=0;

var bb_offsetx = [+2, +1, -1, -2, +2, +1, -1, -2];
var bb_offsety = [+1, +2, +2, +1, -1, -2, -2, -1];
var bb_swapx = [+1, -1, +1, -1, +1, -1, +1, -1];
var bb_swapy = [-1, +1, +1, -1, +1, -1, -1, +1];


bbRule = function(grid, x, y, z, frm) {
/*
 * for each plane:
 *   if getSwap(COI):
 *     if getSwap(getSwap(COI)) == COI:
 *       do it
 *       
 * getSwap(xyz):
 *   check all knight move positions for possible swapping
 *   return a single swap with no conflicts or null
 */
	var coi = grid.get(x, y, z);
	// only process if field parity is correct
	if ((x + y + z & 1) != (frm & 1)) return coi; 

	function getSwap(x, y, z) {
		var swapx = null, swapy = null;
		for (var i=0; i<8; i++) {
			var xx = x+bb_offsetx[i];
			var yy = y+bb_offsety[i];
			if(bb_TEST) console.log("x:", x, "y:", y, "ox:", bb_offsetx[i], "oy:", bb_offsety[i], "xxyyz:", xx, yy, z);
			if (grid.get(xx, yy, z)) {
				if(bb_TEST) console.log("SWAP");
				if ((swapx != null) && (swapx != bb_swapx[i] || swapy != bb_swapy[i]) ) {		// swap confict, forgeddaboudit
					if(bb_TEST) console.log("CRAP swap already:", swapx, swapy);
					return null;
				}
				swapx = bb_swapx[i];
				swapy = bb_swapy[i];
			}
		}
		if (swapx == null) return null;
		return [swapx, swapy];
	}

	var swap = getSwap(x, y, z);												// proposed swap cell as delta from xyz
	if(bb_TEST) console.log("swap =", swap);
	if (swap != null) {															// if valid (no immediate conflicts)
		var swapper = grid.get(x+swap[0], y+swap[1], z);						// get state at swap cell
		if(bb_TEST) console.log("swapper =", swapper, "coi:", coi);
		if (swapper != coi) {													// if state is different from ours, we might swap
			var revswap = getSwap(x+swap[0], y+swap[1], z);						// proposed swap for swap cell
			if(bb_TEST) console.log("revswap =", revswap, "from:", x+swap[0], y+swap[1], z);
			if (revswap != null) {
				if ( (swap[0] + revswap[0] == 0) && (swap[1] + revswap[1] == 0)) {	// if it matches (mutual proposed swaps), do this thing
					return swapper;													// we return his state; he will return ours. 
																					// That's what we call a swap, Scooby Doo
				}
			}
		}
	}
	return coi;
}

if(bb_TEST) {
	var grid = new Grid(10, 10, 10);
	grid.put(0, 0, 0, 1);
	grid.put(1, 2, 0, 1);
	// grid.put(-1, 2, 0, 1);
	console.log("bbRule returns:", bbRule(grid, 0, 0, 0));
	console.log("bbRule returns:", bbRule(grid, -1, 1, 0));
}

