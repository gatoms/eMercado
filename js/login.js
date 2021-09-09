//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function estorage(){
    let misDatos= {
        dato1: document.getElementById('inputEmail').value,
        dato2: document.getElementById('inputPassword').value
    };

    let elJson= JSON.stringify(misDatos);

    localStorage.setItem('losDatos', elJson);
}

document.addEventListener("DOMContentLoaded", function(e){
    //https://www.w3schools.com/js/js_validation.asp
});



