//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
precioMin=undefined
precioMax=undefined
productos=[]
buscar = undefined

function ordenarLista(orden, lista){
    let resultado = [];
    if(orden === 1){
        resultado = lista.sort(function(a, b){
            if (a.cost < b.cost){return -1;}
            if (a.cost > b.cost){return 1;}
            return 0;
        });
    }else if(orden === 2){
        resultado = lista.sort(function(a,b){
            if(a.cost < b.cost){return 1;}
            if(a.cost > b.cost){return -1;}
            return 0;
        });
    }else if(orden === 3){
        resultado = lista.sort(function(a,b){
            if(a.soldCount < b.soldCount){return 1;}
            if(a.soldCount > b.soldCount){return -1;}
            return 0;
        })
    }
    return resultado;
}

/*Para hacer que la redireccion de la linea 45 se haga a un producto especifico:
    Agregar un id al div que use algo especifico del objeto (como el datos.name) que al clickear el div devuelva ese valor
    y lo guardamos en un local o session storage, eso lo usamos en el product-info para ver cual es el producto que hay que 
    mostrar.
*/

function guardarId(ident){
    sessionStorage.setItem('identificador', ident);
    window.location.href ="product-info.html";
}

function mostrarLista(lista){
    let contenido='';
    for (let i = 0; i < lista.length; i++) {
        let datos = lista[i];
        
        if(((precioMin==undefined) || (precioMin != undefined && parseInt(datos.cost) >= precioMin))&&
            ((precioMax == undefined) || (precioMax != undefined && parseInt(datos.cost) <= precioMax))){
                if(buscar==undefined || datos.name.toLowerCase().includes(buscar)){
                    contenido+=`
                    
                    <div id='` + datos.name + `' class='list-group-item list-group-item-action' onclick='guardarId(this.id)'>
                        <div class='row'>
                            <div class='col-3'>
                                <img src='`+ datos.imgSrc +`' class='img-thumbnail'>
                            </div>
                            <div class='col'>
                                <div class='d-flex w-100 justify-content-between'>
                                    <h4 class='mb-1'>`+ datos.name +`</h4>
                                    <small class='text-muted'>Inventario: `+ datos.soldCount +`</small>
                                </div>
                                <p class='mb-1'>`+ datos.description +`</p>
                                <strong class='moneyy'>`+ datos.cost+ ' ' + datos.currency +`</strong>
                            </div>
                        </div>
                    </div>
                `  
                }
        }
    }
    document.getElementById('prod').innerHTML=contenido;
}

function ordenarMostrar(orden, array){
    
    if(array != undefined){
        productos = array;
    };

    productos = ordenarLista(orden, productos);
    mostrarLista(productos);
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj){
        if (resultObj.status === 'ok'){
            productos = resultObj.data;
            ordenarMostrar(2, productos);
        }
    });

    document.getElementById('buscar').addEventListener('input', function(){
        buscar = document.getElementById('buscar').value;
        mostrarLista(productos);
    });


    document.getElementById("mayMen").addEventListener("click", function(){
        ordenarMostrar(2);
    });

    document.getElementById('menMay').addEventListener('click', function(){
        ordenarMostrar(1);
    });

    document.getElementById('relevancia').addEventListener('click', function(){
        ordenarMostrar(3);
    });

    document.getElementById('limpiar').addEventListener('click', function(){
        document.getElementById('min').value = '';
        document.getElementById('max').value = '';
        document.getElementById('buscar').value= '';
        precioMin = undefined;
        precioMax = undefined;
        buscar = undefined;
        mostrarLista(productos);
    })

    document.getElementById('filtrado').addEventListener('click', function(){
        precioMin = document.getElementById('min').value;
        precioMax = document.getElementById('max').value;

        if((precioMin != undefined) && (precioMin != '') && (parseInt(precioMin))>=0) {
            precioMin = parseInt(precioMin);
        }else{
            precioMin = undefined
        }

        if ((precioMax != undefined) && (precioMax != "") && (parseInt(precioMax)) >= 0){
            precioMax = parseInt(precioMax);
        }
        else{
            precioMax = undefined;
        }

        mostrarLista(productos)
    })
});