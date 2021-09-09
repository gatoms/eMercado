//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var info = []
var comentarios = []

function mostrarInfo(obj){
    let doc = document.getElementById('product-info-div');
    let infoProd =`
        <div>
            <p>` + obj.name + `
            <p> `+ obj.description+ `
            <p>` + obj.cost + ' ' + obj.currency + `
            <p>` + obj.soldCount + `
            <p>` + obj.category +`
            <div>
                <img src="`+obj.images[0]+`">
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
            <div>
                <strong>Usuario:` + com.user + `</strong>
                <p>` + com.description + `
                <p>Calificacion:` + com.score + `
                <p>Fecha de publicacion:` + com.dateTime +`
            </div>
        `
        doc.innerHTML += coment;
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj){
        if (resultObj.status === 'ok'){
            info = resultObj.data;
        }
    }).then(getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(obj){
        if (obj.status === 'ok'){
            comentarios = obj.data;
        }
    })).then(function(){
        mostrarInfo(info);
        mostrarComentarios(comentarios);
    });
});
