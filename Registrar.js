//llamo a las tablas con jquery
//web-dev-server --open --watch
$(document).ready(function () {
    //funcion que se accione al dar click en el boton
    $("#btn-buscar").click(function () {
        //llamo a la funcion que me trae los datos
        BuscarSuscriptor();
    }
    );
    $("#btn-limpiar").click(function () {
        limpiar();
    }
    );

    $("#btn-actualizar").click(function () {
        Actualizar();
    }
    );
   

   





});



async function BuscarSuscriptor() {

    const doc = document.getElementById("doc").value;

    const numdoc = document.getElementById("numdoc").value;




    (async () => {
        const rawResponse = await fetch('https://localhost:5085/Suscriptor/suscriptor/verificar/' + numdoc + '/' + doc, {
            method: 'GET',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',


            }

        });

        const resp = await rawResponse.json();
        //const content = await rawResponse.json()
        //paste value in input
        let html='<input type="text" style="width: 140px;"  id="nombre" class="form-control" placeholder="'+resp.nombre+'" >';
        let html1='<input type="text" style="width: 140px;" id="nombre" class="form-control" placeholder="'+resp.apellido+'" >';
        let html2='<input type="text" style="width: 140px;" id="nombre" class="form-control" placeholder="'+resp.direccion+'" >';
        let html3='<input type="text"style="width: 140px;"  id="nombre" class="form-control" placeholder="'+resp.telefono+'" >';
        let html4='<input type="text" style="width: 140px;" id="nombre" class="form-control" placeholder="'+resp.email+'" >';
        let html5='<input type="text" style="width: 140px;" id="nombre" class="form-control" placeholder="'+resp.NombreUsuario+'" >';
        let html6='<input type="text" style="width: 140px;" id="nombre" class="form-control" placeholder="'+resp.password+'" >';
        document.querySelector("#nam").outerHTML = html;
        document.querySelector("#ap").outerHTML = html1;
        document.querySelector("#di").outerHTML = html2;
        document.querySelector("#te").outerHTML = html3;                
        document.querySelector("#em").outerHTML = html4;
        document.querySelector("#us").outerHTML = html5;
        document.querySelector("#pa").outerHTML = html6;
        if(resp.suscripcion.fechaAlta!="string"){
            document.querySelector("#estado").outerHTML = "Suscripto";
        }else{
            document.querySelector("#estado").outerHTML = "No Suscripto";
        }
        console.log(JSON.parse(resp));

        






    })();

}






  async function limpiar() {
      
        location.reload();
    }




    //funcion asincronica que haga post de los datos de los usuarios
    async function Registrar() {
        //obtengo los valores de los input
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const direccion = document.getElementById("direccion").value;
        const telefono = document.getElementById("telefono").value;
        const email = document.getElementById("email").value;
        const NombreUsuario = document.getElementById("usuario").value;
        const password = document.getElementById("password").value;
        let tipoDocumento = document.getElementById("doc").value;
        const numeroDocumento = document.getElementById("numdoc").value;
        tipoDocumento="dni";
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        hoy.toLocaleDateString();
        console.log(hoy);
        const fechaAlta= hoy;
        
        //que el fecha alta sea la fecha de hoy
       
        console.log(fechaAlta.toString());

       
        const fechaFin="2025-12-31";
        const motivoFin="null";
        //const tipoDocumento="dni";
        //creo un objeto con los datos
        const data = { nombre, apellido, direccion, telefono, email, NombreUsuario, password, numeroDocumento ,TipoDoc:{tipoDocumento},Suscripcion:{fechaAlta,fechaFin,motivoFin}};
        
        //hago el post
        const rawResponse = await fetch('https://localhost:5085/Suscriptor/', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        //obtengo la respuesta del servidor
        const content = await rawResponse.json();
        //si la respuesta es true
        if (content == true) {
            //muestro un mensaje de exito
            alert("Suscriptor registrado con exito");
            
            
        }
        
    }

//funcion asincronica que haga uopdate de los datos de los usuarios
async function Actualizar() {
    //obtengo los valores de los input
    const doc = document.getElementById("doc").value;
    const numdoc = document.getElementById("numdoc").value;

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const direccion = document.getElementById("direccion").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("email").value;
    const NombreUsuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;
    let tipoDocumento = document.getElementById("doc").value;
    const numeroDocumento = document.getElementById("numdoc").value;
    tipoDocumento="dni";
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        hoy.toLocaleDateString();
        console.log(hoy);
        const fechaAlta= hoy;
        const fechaFin="2025-12-31";
        const motivoFin="null";
    //creo un objeto con los datos
    const data = { nombre, apellido, direccion, telefono, email, NombreUsuario, password, numeroDocumento ,TipoDoc:{tipoDocumento},Suscripcion:{fechaAlta,fechaFin,motivoFin}};
    //hago el post
    const rawResponse = await fetch('https://localhost:5085/Suscriptor/suscriptor/actualizar/'+doc+'/'+numdoc, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    //obtengo la respuesta del servidor
    const content = await rawResponse.json();
    //si la respuesta es true
    if (content == true) {
        //muestro un mensaje de exito
        alert("Suscriptor actualizado con exito");
    }
}
