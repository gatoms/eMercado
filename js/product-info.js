//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var info = []
var comentarios = []
var prod = []
var puntaje_comentario = '1'
var fecha = new Date()


function estrellas(index){
    let puntaje = comentarios[index].score;
    for (let i = 0; i < puntaje; i++) {
        document.getElementById('estrellitas'+index).innerHTML += '<span class="fa fa-star checked"></span>';
    }
    for (let i = 0; i < (5-puntaje); i++) {
        document.getElementById('estrellitas'+index).innerHTML += '<span class="fa fa-star"></span>'
    }
}

function borrarAgregar_div_comentarios(){
    document.getElementById('product-coment-div').remove();
    let divi = document.createElement('div');
    divi.id = 'product-coment-div';
    divi.setAttribute('class', 'row');
    document.getElementById('coment-div').appendChild(divi);
}

function agregarComent(){
    let desc = document.getElementById('coment').value;
    elJson=localStorage.getItem('losDatos');
    losDatos=JSON.parse(elJson);

    let comentario = {score:puntaje_comentario, description:desc,user:losDatos.dato1,dateTime:fecha};
    comentarios.push(comentario);
    
    borrarAgregar_div_comentarios();
    mostrarComentarios(comentarios);
}

function mostrarInfo(obj){
    let doc = document.getElementById('product-info-div');
    let infoProd =`
    <div class="col-1"></div>
    <div class="col-10">
        <div class='card mb-11 shadow-sm custom-card text-center'>
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img src="`+obj.images[0]+`" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                    <img src="`+obj.images[1]+`" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                    <img src="`+obj.images[2]+`" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                    <img src="`+obj.images[3]+`" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                    <img src="`+obj.images[4]+`" class="d-block w-100" alt="...">
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
            <br>
            <h4>` + obj.name + ` </h4><br>
            
            <div class='cajaDescripcionProduct'>
                <strong>Descripcion:</strong>
                <p class='text-left font-weight-light'> `+ obj.description+ `
            </div>
            <br>
            <p><strong>` + obj.cost + ' ' + obj.currency + `</strong>
            <p>Unidades vendidas: ` + obj.soldCount + `
            <p>Catgoria: ` + obj.category +`
            
        </div>
    </div>
    <div class="col-1"></div>
    `
    doc.innerHTML += infoProd;
}

function mostrarComentarios(array){
    let doc = document.getElementById('product-coment-div');
    for (let i = 0; i < array.length; i++) {
        const com = array[i];
        let coment = `
            <div class="col-12">
                <div  class='card mb-5 shadow-sm text-left'>
                    <div class='m-2'>
                        <strong class='ml-3'> ` + com.user +` </strong>
                        <div id='estrellitas`+i+`' class='float-right mr-3'></div>
                        <hr>
                        <p>` + com.description + `
                        <p class='font-weight-light'><small>Fecha de publicacion: ` + com.dateTime +`</small></p>
                    </div>
                </div>
            </div>
        `
        doc.innerHTML += coment;
        estrellas(i);
    }
}
function prodRelacionados(lista){
    let doc = document.getElementById('prodRel');
    const a = prod[lista];
    let relacionado = `
        <div class='col'>
            <a href="products.html" class="card mb-4 shadow-sm text-center custom-card">
                <img src='`+ a.imgSrc +`' class="img-thumbnail">
                <strong>`+ a.name +`</strong>
                <small class='moneyy'>`+ a.cost + ' ' + a.currency +`</small>
            </a>
        </div>
    `
    doc.innerHTML += relacionado;
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj){
        if (resultObj.status === 'ok'){
            info = resultObj.data;
            mostrarInfo(info);
        }
    }).then(getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(obj){
        if (obj.status === 'ok'){
            comentarios = obj.data;
            mostrarComentarios(comentarios);
        }
    })).then(getJSONData(PRODUCTS_URL).then(function(resObj){
        if(resObj.status === 'ok'){
            prod = resObj.data;
            info.relatedProducts.forEach(prodRelacionados);
        }
    }));
});












/*function prodRelacionados(lista, array){
    let doc = document.getElementById('prodRel');
    //let indice = idk.relatedProducts;
    for (let index = 0; index < array.relatedProducts.length; index++) {
        const element = array.relatedProducts[index];
        const a = lista[element];
        let relacionado = `
            <div class='card mb-3 shadow-sm text-center'>
                <img src='`+ a.imgSrc +`'>
                <strong>`+ a.name +`</strong>
                <p class='moneyy'>`+ a.cost + ' ' + a.currency +`
            </div>
        `
        doc.innerHTML += relacionado;
    }
}*/

/*Para mostrar un producto especifico, agarrar el identificador guardado en session storage, y usarlo para saber que 
producto hay que abrir.

function filtrado(valor){
    Json = sessionStorage.getItem('identificador');
    ide = JSON.parse(Json);
    let a = valor.name;
    if(ide.includes(a)){
        return true
    }else{
        return false
    }
}


function selectorProd(){
    var index = jason.findIndex(filtrado);
    info.push(jason[index]);
    mostrarInfo(info);
}*/