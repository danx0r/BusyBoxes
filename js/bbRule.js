bb_TEST=0;

var bb_offsetx = [+2, +1, -1, -2, +2, +1, -1, -2];
var bb_offsety = [+1, +2, +2, +1, -1, -2, -2, -1];
var bb_offsetz = [0, 0, 0, 0, 0, 0, 0, 0];
var bb_swapx = [+1, -1, +1, -1, +1, -1, +1, -1];
var bb_swapy = [-1, +1, +1, -1, +1, -1, -1, +1];
var bb_swapz = [0, 0, 0, 0, 0, 0, 0, 0];

function trueMod(v, base) {
    if (v < 0) {
        return ((v % base) + base) % base;
    }
    return v % base;
}

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
	var offx, offy, offz, swpx, swpy, swpz;

	var coi = grid.get(x, y, z);
	// only process if field parity is correct
	if ((x + y + z & 1) != (frm & 1)) return coi; 

	function getSwap(x, y, z) {
		var swapx = null, swapy = null;
		for (var i=0; i<8; i++) {
			var xx = x+offx[i];
			var yy = y+offy[i];
			var zz = z+offz[i];
			if(bb_TEST) console.log("x:", x, "y:", y, "ox:", offx[i], "oy:", offy[i], "xxyyz:", xx, yy, z);
			if (grid.get(xx, yy, zz)) {
				if(bb_TEST) console.log("SWAP");
				if ((swapx != null) && (swapx != swpx[i] || swapy != swpy[i] || swapz != swpz[i]) ) {		// swap confict, forgeddaboudit
					if(bb_TEST) console.log("CRAP swap already:", swapx, swapy);
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
		var swap = getSwap(x, y, z);													// proposed swap cell as delta from xyz
		if(bb_TEST) console.log("swap =", swap);
		if (swap != null) {																// if valid (no immediate conflicts)
			var swapper = grid.get(x+swap[0], y+swap[1], z+swap[2]);   					// get state at swap cell
			if(bb_TEST) console.log("swapper =", swapper, "coi:", coi);
			if (swapper != coi) {														// if state is different from ours, we might swap
				var revswap = getSwap(x+swap[0], y+swap[1], z+swap[2]);							// proposed swap for swap cell
				if(bb_TEST) console.log("revswap =", revswap, "from:", x+swap[0], y+swap[1], z);
				if (revswap != null) {
					if ( (swap[0] + revswap[0] == 0) && 
						 (swap[1] + revswap[1] == 0) &&									// if it matches (mutual proposed swaps), do this thing
						 (swap[2] + revswap[2] == 0)) {									// we return his state; he will return ours.
						return swapper;													// That's what we call a swap, Scooby Doo
					}
				}
			}
		}
		return coi;
	}
	
	var m = trueMod(frame, 3);
	if (m==0) {
		offx = bb_offsetx;
		offy = bb_offsety;
		offz = bb_offsetz;
		swpx = bb_swapx;
		swpy = bb_swapy;
		swpz = bb_swapz;
	}
	if (m==1) {
		offx = bb_offsety;
		offy = bb_offsetz;
		offz = bb_offsetx;
		swpx = bb_swapy;
		swpy = bb_swapz;
		swpz = bb_swapx;
	}
	if (m==2) {
		offx = bb_offsetz;
		offy = bb_offsetx;
		offz = bb_offsety;
		swpx = bb_swapz;
		swpy = bb_swapx;
		swpz = bb_swapy;
	}
	return onePlane();
}

if(bb_TEST) {
	var grid = new Grid(10, 10, 10);
	grid.put(0, 0, 0, 1);
	grid.put(1, 2, 0, 1);
	// grid.put(-1, 2, 0, 1);
	console.log("bbRule returns:", bbRule(grid, 0, 0, 0));
	console.log("bbRule returns:", bbRule(grid, -1, 1, 0));
}

