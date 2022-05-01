function Calculate(){
    var bp = document.getElementById("b-input").value;

    if(bp < 90){
        document.getElementById("bp-output").innerHTML = "Low";
    }
    else if(bp < 120){
        document.getElementById("bp-output").innerHTML = "Normal";
    }
    else if(120 < bp < 129){
        document.getElementById("bp-output").innerHTML = "Elevated";
    }
    else if(130 < bp < 139){
        document.getElementById("bp-output").innerHTML = "Stage 1 Hypertension";
    }
    else if(140 < bp){
        document.getElementById("bp-output").innerHTML = "Stage 2 Hypertension";
    }
    else{
        document.getElementById("bp-output").innerHTML = "Obesity";
    }
}
