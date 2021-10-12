//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const CART_DESAFIO = "https://japdevdep.github.io/ecommerce-api/cart/654.json"; //Esto es para el desafio
var info = [];
var exito = [];

function killDiv(id){ 
    document.getElementById('cantidad'+id).value = 0;
    resumenTotal(info);
    document.getElementById('div'+id).setAttribute('class', 'd-none');
}


function mostrarInfo(array){
    let doc = document.getElementById('listaProductos');
    let prod = '';
    for (let i = 0; i < array.articles.length; i++) {
        const a = array.articles[i];
        prod +=`
        <div class='row' id='div`+i+`'>
            <div class='col-4'>
                <img class='img-fluid border' src="`+a.src+`">
            </div>
            <div class='col-8'>
                <div class='row'>
                    <div class='m-1 col-10'>
                        <strong>`+a.name+`</strong>
                    </div>
                    <div class='col-1'>
                        <i class="fas fa-trash" onclick="killDiv(`+i+`)"></i>
                    </div>
                    <div class='col-12'><hr></div>
                    <div class='col-7'>
                        <p>Precio: <strong class="h4 text-success">`+a.unitCost + ' ' + a.currency+`</strong></p>
                    </div>
                    <div class='col-2'> </div>
                    <div class='col'>Cantidad:
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <button class="btn btn-outline-secondary" type="button" onclick='resumenTotal(info)'>Modificar</button>
                            </div>
                            <input type="number" id='cantidad`+i+`' name='cantidadArticulo' class="form-control" value='`+a.count+`' aria-label="Example text with button addon" aria-describedby="button-addon1">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        `
    }
    doc.innerHTML = prod;
}


function resumenTotal(array){
    let doc = document.getElementById('valor');
    let env = document.getElementById('envio');
    let subtotal = 0;
    let total = 0;
    let envio = 0;
    for (let i = 0; i < array.articles.length; i++) {
        const a = array.articles[i];
        const b = document.getElementById('cantidad'+i).value;
        let valor = 0;
        if(a.currency == 'UYU'){
            valor = (a.unitCost/40);
        }else{
            valor = a.unitCost;
        }
        subtotal = (valor * b) + subtotal;
        total = envio + subtotal;
    }
    doc.innerHTML = total + ' USD';
    env.innerHTML = envio + ' USD';
    document.getElementById('total').innerHTML = total + ' USD';
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_DESAFIO).then(function(resultObj){
        if (resultObj.status === 'ok'){
            info = resultObj.data;
            mostrarInfo(info);
            resumenTotal(info, 2);
        }
    }).then(getJSONData(CART_BUY_URL).then(function(obj){
        if (obj.status === 'ok'){
            exito = obj.data;
        }
    }))/*.then(getJSONData(CART_DESAFIO).then(function(resObj){
        if(resObj.status === 'ok'){
            //Agregar aca lo que necesite DESAFIO
        }CART_INFO_URL
    }))*/;
});