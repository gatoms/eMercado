//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const CART_DESAFIO = "https://japdevdep.github.io/ecommerce-api/cart/654.json"; //Esto es para el desafio
var info = [];
var exito = [];

//Funcion para borrar un articulo
function killDiv(id){ 
    document.getElementById('cantidad'+id).value = 0;
    resumenTotal(info, 0);
    document.getElementById('div'+id).setAttribute('class', 'd-none');
}

//En ves de poner las `` se puede poner ${variable}
function mostrarInfo(array){
    let doc = document.getElementById('listaProductos');
    let prod = '';
    for (let i = 0; i < array.articles.length; i++) {
        const a = array.articles[i];
        let sub = (a.unitCost * a.count)
        prod +=`
        <div class='row' id='div`+i+`'>
            <div class='col-3'>
                <img class='img-fluid border' src="`+a.src+`">
            </div>
            <div class='col-9'>
                <div class='row'>
                    <div class='m-1 col-10'>
                        <strong>${a.name}</strong>
                    </div>
                    <div class='col-1'>
                        <i class="fas fa-trash" onclick="killDiv(`+i+`)"></i>
                    </div>
                    <div class='col-12'><hr></div>
                    <div class='col-6'>
                        <p>Precio: <strong class="h4 text-success">`+a.unitCost +`<small> `+a.currency+`</small></strong></p>
                    </div>
                    <div class='col-6'> 
                        <p>Subtotal: <strong class="h4 text-success mostrarInfo"><span id="sub`+i+`">`+ sub +`</span><small> `+a.currency+`</small></strong></p>
                    </div>
                    <div class='col-12'>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">Cantidad:</span>
                            </div>
                            <input type="number" id='cantidad`+i+`' name='cantidadArticulo' class="form-control" value='${a.count}' min='0' onchange="cuentas(`+i+`, `+a.unitCost+`)">
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

function cuentas(i, valor){
    let cant = document.getElementById('cantidad'+i).value;
    let sub = (cant * valor);
    document.getElementById('sub'+i).innerHTML = sub;
    resumenTotal(info, 0);
}

/*function total(){
    //let doc = document.getElementById('valor');
    let cant = document.getElementsByClassName('mostrarInfo');
    let valor = 0;
    for (let i = 0; i < cant.length; i++) {
        valor += parseInt(cant[i].innerHTML);
    }
    document.getElementById('valor').innerHTML = valor;
}*/

function resumenTotal(array, porc){
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
        subtotal = Math.round((valor * b) + subtotal);
        envio = Math.round((subtotal * porc)/100)
        total = envio + subtotal;
    }
    doc.innerHTML = subtotal + ' USD';
    env.innerHTML = envio + ' USD';
    document.getElementById('total').innerHTML = total + ' USD';
}


/*Hay que complicarla un poco, El boton de submit tiene que ser el de afuera (realizar compra) que revise los forms
del acordion (podria poner mini forms adentro de cada acordion para que funcione el acordion)
Despues otro form aparte en los modales, que son dos (uno para que metodo de pago) pero solo hay que validar uno.
idk que hacer ahi, supongo que hago una funcion de validacion que con uno de esos forms validado ya alcance
medio largo esto pero bue, algo asi podria funcar. Para conservar el acordion, si no hacer un form simple.

Lo otro que puedo hacer, es cambiar el realizar pedido (button) y que este en el modal, habria que validar los\
campos de direccion y eso cuando se aprete el boton de forma de pago, y que solo se pueda abrir si se validan.
es otra opcion.
*/

function validacion(){
    let tarjNum = document.getElementById('numeroTarj');
    let tarjVenc = document.getElementById('vencTarj');
    let tarjCod = document.getElementById('segCode');
    let transferencia = document.getElementById('transInfo');
    let banderitaTarj = true;
    let banderitaTrans = true;

    if(tarjNum.value != "" ||tarjNum.value === undefined){
        tarjNum.classList.remove('is-invalid');
        tarjNum.classList.add('is-valid');
    }else{
        banderitaTarj = false;
        tarjNum.classList.remove('is-valid');
        tarjNum.classList.add('is-invalid');
    }

    if(tarjVenc.value != "" || tarjVenc.value === undefined){
        tarjVenc.classList.remove('is-invalid');
        tarjVenc.classList.add('is-valid');
    }else{
        banderitaTarj = false;
        tarjVenc.classList.remove('is-valid');
        tarjVenc.classList.add('is-invalid');
    }

    if(tarjCod.value != "" || tarjCod.value === undefined){
        tarjCod.classList.remove('is-invalid');
        tarjCod.classList.add('is-valid');
    }else{
        banderitaTarj = false;
        tarjCod.classList.remove('is-valid');
        tarjCod.classList.add('is-invalid');
    }

    if(transferencia.value != "" || transferencia.value === undefined){
        transferencia.classList.remove('is-invalid');
        transferencia.classList.add('is-valid');
    }else{
        banderitaTrans = false;
        transferencia.classList.remove('is-valid');
        transferencia.classList.add('is-invalid');
    }

    if(banderitaTarj || banderitaTrans){
        return true;
    }
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_DESAFIO).then(function(resultObj){
        if (resultObj.status === 'ok'){
            info = resultObj.data;
            mostrarInfo(info);
            resumenTotal(info, 0);
        }
    }).then(getJSONData(CART_BUY_URL).then(function(obj){
        if (obj.status === 'ok'){
            exito = obj.data;
        }
    }));

    document.getElementById('envioPremium').addEventListener('click', function(){
        resumenTotal(info, 15);
    });

    document.getElementById('envioExpress').addEventListener('click', function(){
        resumenTotal(info, 7);
    });

    document.getElementById('envioStandard').addEventListener('click', function(){
        resumenTotal(info, 5);
    });

    document.getElementById('transInfo').addEventListener('input', function(){
        validacion();
    });

    document.getElementById('numeroTarj').addEventListener('input', function(){
        validacion();
    });

    document.getElementById('vencTarj').addEventListener('input', function(){
        validacion();
    });

    document.getElementById('segCode').addEventListener('input', function(){
        validacion();
    });

    var forms = document.querySelectorAll('.needs-validation');
    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity() || !validacion()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
});

