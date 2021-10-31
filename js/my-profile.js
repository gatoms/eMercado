//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    if(localStorage.getItem('losDatos')){
        preDato=localStorage.getItem('losDatos');
        idk=JSON.parse(preDato);

        if(idk.nombre != undefined){
            document.getElementById('validationTooltip01').value = idk.nombre;
            document.getElementById('namesito').innerHTML = idk.nombre;
        }
        if(idk.apellido != undefined){
            document.getElementById('validationTooltip02').value = idk.apellido;
            document.getElementById('apellidito').innerHTML = idk.apellido;
        }
        if(idk.telefono != undefined){
            document.getElementById('validationTooltip03').value = idk.telefono;
            document.getElementById('telefonito').innerHTML = idk.telefono;
        }
        document.getElementById('validationTooltipUsername').value = idk.dato1;
        document.getElementById('emailsito').innerHTML = idk.dato1;
    };

    form = document.getElementById('formulario');

    form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }else{
            //llamado a los datos ya guardados para conservar la contrase;a
            localStorage.getItem('losDatos');
            preDato=localStorage.getItem('losDatos');
            idk=JSON.parse(preDato);
                
            //guardado de los nuevos datos
            let info = {
                nombre: document.getElementById('validationTooltip01').value,
                apellido: document.getElementById('validationTooltip02').value,
                dato1: document.getElementById('validationTooltipUsername').value,
                dato2: idk.dato2,
                telefono: document.getElementById('validationTooltip03').value
            };
    
            //Guardado de datos en local storage.
            let elJson= JSON.stringify(info);
            localStorage.setItem('losDatos', elJson);
        }
        form.classList.add('was-validated');

    }, false);
});


