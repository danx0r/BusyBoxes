/*
 The MIT License
 
 Copyright (c) 2010-2012 danx0r (Daniel B. Miller), Authors of three.js.
 All rights reserved.
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */
/*
 * The simplest possible library for modal solutions
 */
var gMoodalInEffect = false;

function moodal_choice(v){
    moodal_el.style.display = "none";
    moodal_cb(v);
    document.getElementById("moodal_background").style.display = "none";
    gMoodalInEffect = false;
}

function moodal(id, cb){
    gMoodalInEffect = true;
    document.getElementById("moodal_background").style.display = "";
    moodal_cb = cb;
    moodal_el = document.getElementById(id)
    moodal_el.style.position = "absolute";
    moodal_el.style.left = "50%";
    moodal_el.style.top = "50%";
    moodal_el.style.width = "400px";
    moodal_el.style.marginLeft = "-200px";
    moodal_el.style.marginTop = "-100px";
    moodal_el.style.backgroundColor = "white";
    moodal_el.style.textAlign = "center";
    moodal_el.style.paddingTop = "30px";
    moodal_el.style.paddingBottom = "50px";
    moodal_el.style.borderStyle = "solid";
    moodal_el.style.fontFamily = "sans-serif";
    moodal_el.style.fontSize = "large";
    moodal_el.style.zIndex = "101";
    moodal_el.style.display = "";
    var def = moodal_el.getElementsByClassName("moodal_default");
    if (def.length) {
        def[0].focus();
    }
}
