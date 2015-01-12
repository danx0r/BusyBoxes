bb_TEST=1;

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
	function getSwap(x, y, z) {
		var swapx = null, swapy = null;
		for (var i=0; i<8; i++) {
			var xx = x+bb_offsetx[i];
			var yy = x+bb_offsety[i];
			if(bb_TEST) console.log(xx, yy, z);
			if (grid.get(xx, yy, z)) {
				if(bb_TEST) console.log("SWAP");
				if (swapx != null) {		// swap confict, forgeddaboudit
					if(bb_TEST) console.log("CRAP swap already:", swapx, swapy);
					swapx = null;
					swapy = null;
					break
				}
				swapx = bb_swapx[i];
				swapy = bb_swapy[i];
			}
		}
		return [swapx, swapy];
	}
	swapxy = getSwap(x, y, z);
	console.log(swapxy)
}

if(bb_TEST) {
	var grid = new Grid(10, 10, 10);
	grid.put(1, 2, 0, 1);
	grid.put(-1, 2, 0, 1);
	bbRule(grid, 0, 0, 0);
}
