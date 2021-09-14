//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var info = []
var comentarios = []

function displayImg(img){
    document.getElementById('imgProd').setAttribute('src', info.images[img]);
}

function estrellas(index){
    let puntaje = comentarios[index].score;
    for (let i = 0; i < puntaje; i++) {
        document.getElementById('estrellitas'+index).innerHTML += '<span class="fa fa-star checked"></span>';
    }
    for (let i = 0; i < (5-puntaje); i++) {
        document.getElementById('estrellitas'+index).innerHTML += '<span class="fa fa-star"></span>'
    }
}

/*Para mostrar un producto especifico, agarrar el identificador guardado en session storage, y usarlo para saber que 
producto hay que abrir.
*/

function mostrarInfo(obj){
    let doc = document.getElementById('product-info-div');
    let infoProd =`
    <div class="col-md-11">
        <div class='card mb-11 shadow-sm custom-card text-center'>
            <div>
                <img id='imgProd' class='bd-placeholder-img card-img-top' src="`+obj.images[0]+`">
            </div>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-secondary" onclick='displayImg(0)'>1</button>
                <button type="button" class="btn btn-secondary" onclick='displayImg(1)'>2</button>
                <button type="button" class="btn btn-secondary" onclick='displayImg(2)'>3</button>
                <button type="button" class="btn btn-secondary" onclick='displayImg(3)'>4</button>
                <button type="button" class="btn btn-secondary" onclick='displayImg(4)'>5</button>
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
    `
    doc.innerHTML += infoProd;
}

function mostrarComentarios(array){
    let doc = document.getElementById('product-coment-div');
    for (let i = 0; i < array.length; i++) {
        const com = array[i];
        let coment = `
            <div  class='card mb-5 shadow-sm text-left'>
                <div class='m-2'>
                    <strong class='ml-3'> ` + com.user +` </strong>
                    <div id='estrellitas`+i+`' class='float-right mr-3'></div>
                    <hr>
                    <p>` + com.description + `
                    <p class='font-weight-light'><small>Fecha de publicacion: ` + com.dateTime +`</small></p>
                </div>
            </div>
        `
        doc.innerHTML += coment;
        estrellas(i);
    }
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
    }));
});