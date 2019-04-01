var result = "";
function key(input) {
    result += input;
    document.getElementById("textbox").value = result;
}
function valid() {
    var validtext = document.getElementById("textbox").value;
    try {
        document.getElementById("result").value = eval(validtext);
    } catch (e) {
        alert(e + "Please try again");
        clean();
    }
}
function clean() {
    result = "";
    document.getElementById("textbox").value = "";
    document.getElementById("result").value = "";
    document.getElementById("a").value = "";
    document.getElementById("b").value = "";
    document.getElementById("c").value = "";
}

function solve(){
    var a = document.getElementById("a").value;
    var b = document.getElementById("b").value;
    var c = document.getElementById("c").value;
    var d = (Math.pow(b,2))-(4*a*c);
    var x1 = (-b+Math.sqrt(d))/(2*a);
    var x2 = (-b-Math.sqrt(d))/(2*a);
    if (d>=0){
        alert("x1 = " + x1 + "x2 = " + x2);
    }
    else{
        alert("b^2-4*a*c can not be less than 0");
    }
}
