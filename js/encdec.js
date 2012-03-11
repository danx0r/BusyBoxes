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
function encdec_enHuff(data) {
    bits = [];
    for (var i = 0; i < data.length; i++) {
        var v = data[i];
        //console.log("case:", v)
        switch (v) {
            case 0:  bits.push(0, 0); break;
            case 1:  bits.push(0, 1); break;
            case -1: bits.push(1, 0, 0); break;
            case 2:  bits.push(1, 0, 1); break;
            case -2: bits.push(1, 1, 0); break;
            default: {
                if (Math.abs(v) <= 10) {
                    bits.push(1, 1, 1, 0, v < 0 ? 1 : 0);
                    for (var j = 4; j != 0; j >>= 1) {
                        bits.push((Math.abs(v) - 3) & j ? 1 : 0)
                    }
                }
                else {
                    if (Math.abs(v) > 1034) {
                        alert("huff exceeds limit of +/- 1034");
                        return;
                    }
                    bits.push(1, 1, 1, 1, v < 0 ? 1 : 0);
                    for (var j = 0x200; j != 0; j >>= 1) {
                        bits.push((Math.abs(v) - 10) & j ? 1 : 0)
                    }
                }            
            }            
        }
    }
    return bits;
}

function encdec_deHuff(bits){
    data = [];
    var i = 0;
    while (i < bits.length) {
        if (bits[i++]) {
            if (bits[i++]) {
                if (bits[i++]) {
                    if (bits[i++]) {                // 1111xxxxxxxxxxx
                        //console.log("11110etc", i);
                        var sign = bits[i++];
                        //console.log("sign:", sign)
                        var n = 0;
                        for (var j = 0; j < 10; j++) {
                            n <<= 1;
                            n |= bits[i++];
                            //console.log("another bit:", i, j, n.toString(2))
                        }
                        n += 10;
                        if (sign) n = -n;
                        data.push(n);
                        //console.log("should be done, i =", i, "data:",data)
                    }
                    else {                          // 1110xxxx
                        //console.log("1110*");
                        var sign = bits[i++];
                        var n = 0;
                        for (var j = 0; j < 3; j++) {
                            n <<= 1;
                            n |= bits[i++];
                        }
                        n += 3;
                        if (sign) n = -n;
                        data.push(n);
                    }
                }
                else {                              // 110
                    //console.log("110");
                    data.push(-2);
                }
            }
            else {                                  // 10x
                //console.log("10x");
                data.push(bits[i++] ? 2 : -1)
            }
        }
        else {                                      // 0x
            //console.log("0x");
            data.push(bits[i++]);
        }
        //console.log("---loop---", i)
    }
    return data;
}

encAsciiBook = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.";
function encdec_encAscii(bits){
    var last = (bits.length + 3) % 6;
    //console.log("last:",last, [last & 1, (last >> 1) & 1, last >> 2])
    bits = [last >> 2, (last >> 1) & 1, last & 1].concat(bits); // so decoder can determine bitcount
    while (bits.length < 6) {
        bits.push(0);
    }
    var s = "";
    var i = 0;
    while (i < bits.length) {
        var c = 0;
        for (var j = 0; j < 6; j++) {
            c = (c << 1) | bits[i++];
            if (i == bits.length) 
                break;
        }
        //console.log("c:", c)
        s += encAsciiBook[c];
    }
    return s;
}

function encdec_decAsciiBits(s) {
    var last = encAsciiBook.indexOf(s[0]) >> 3;
    //console.log("last:",last, "first char:", encAsciiBook.indexOf(s[0]).toString(2))
    if (s == '') return [];
    var i = 0, b = 0;
    var bits = [];
    var top = 32;
    if (s.length == 1) {
        b = encAsciiBook.indexOf(s[0]) & 7;
        for (i = 0; i < last; i++) {
            bits.push(b >> 5);
            b <<= 1;
        }
    }
    else {
        for (var j = 0; j < s.length; j++) {
            b = encAsciiBook.indexOf(s[j]);
            if (last && (j == s.length - 1)) {
                top = 1 << (last - 1);
            }
            //console.log("b:", b, "top:", top, "len:", bits.length)
            for (var k = top; k != 0; k >>= 1) {
                if (b & k) {
                    bits.push(1);
                }
                else {
                    bits.push(0);
                }
            }
        }
    }
    return bits.slice(3)
}

function encdec_encode(bits) {
    var r = encdec_encAscii(encdec_enHuff(bits));
    //console.log("DEBUG encdec_encode", bits, "-->", r)
    return r;
}

function encdec_decode(bits) {
    var r = encdec_deHuff(encdec_decAsciiBits(bits));
    //console.log("DEBUG encdec_decode", bits, "-->", r)
    return r;
}

/*
data=[1,0,0,1,444,-10,9,11,23,-1];
console.log("data:", data);
bits = enHuff(data);
console.log("bits:", bits, "length:", bits.length);
chars = encAscii(bits);
console.log("enc:", chars);
bits = decAsciiBits(chars);
console.log("bits:", bits, bits.length);
data = deHuff(bits);
console.log("data:", data);
*/