//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    fetch(PRODUCTS_URL)
        .then(respuesta=>respuesta.json())
        .then(datos=> {
            for (let i=0; i < datos.length; i++) {
                contenido=`
                    
                    <div class='list-group-item list-group-item-action'>
                        <div class='row'>
                            <div class='col-3'>
                                <img src='`+ datos[i].imgSrc +`' class='img-thumbnail'>
                            </div>
                            <div class='col'>
                                <div class='d-flex w-100 justify-content-between'>
                                    <h4 class='mb-1'>`+ datos[i].name +`</h4>
                                    <small class='text-muted'>Inventario: `+ datos[i].soldCount +`</small>
                                </div>
                                <p class='mb-1'>`+ datos[i].description +`</p>
                                <strong class='moneyy'>`+ datos[i].cost+ ' ' + datos[i].currency +`</strong>
                            </div>
                        </div>
                    </div>
                `
                document.getElementById('prod').innerHTML+=contenido
            }
            
        })
        .catch(error=> alert('Error: '+error));
});