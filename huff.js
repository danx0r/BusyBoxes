/*
 * quick & dirty library to encode a string of numbers with normal distribution
 *  around 0 as a sequence of letters appropriate for a URL
 *  
 *  huff tree:
 *  00 0
 *  01 1
 *  100 -1
 *  101 2
 *  110 -2
 *  1110xxxx -10 to -3, 3 to 10
 *  1111xxxxxxxxxx -1034 to -11, 11 to 1034
 */ 

/*
 * takes a list of numbers, returns a list of bits
 */
function huff(data) {
    bits = []
    for (var i = 0; i < data.length; i++) {
        var v = data[i];
        switch (v) {
            case 0:  bits.concat([0, 0]); break;
            case 1:  bits.concat([0, 1]); break;
            case -1: bits.concat([1, 0, 0]); break;
            case 2:  bits.concat([1, 0, 1]); break;
            case -2: bits.concat([1, 1, 0]); break;
            default: {
                if (Math.abs(v) <= 10) {
                    bits.concat([1, 1, 1, 0, v < 0 ? 1 : 0]);
                    for (var j = 1; j < 16; j <<= 1) {
                        bits.push((Math.abs(v) - 3) & j ? 1 : 0)
                    }
                }
                else {
                    if (Math.abs(v) > 1034) {
                        alert("huff exceeds limit of +/- 1034");
                        return;
                    }
                    bits.concat([1, 1, 1, 1, 0, v < 0 ? 1 : 0]);
                    for (var j = 1; j < 1024; j <<= 1) {
                        bits.push((Math.abs(v) - 10) & j ? 1 : 0)
                    }
                }            
            }            
        }
    }
    return bits;
}

data=[0,1,1,-2,3,-7,14,-100];
bits = huff(data);
console.log(bits);
