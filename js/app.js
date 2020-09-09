const autor = document.getElementById("inputAutor");
const titulo = document.getElementById("inputTitulo");
const tabla = document.getElementById("tbody");

const libro = new Libro();

const patern = /^[a-zA-ZÁ-ÿ0-9\s]{3,100}$/;

function eventListener(){
    document.getElementById("btnAdd").addEventListener("click",prepararLibro);
    tabla.addEventListener("click",acciones);
}

eventListener();
prepararDOM();

let id= 0;

function prepararLibro(){

    if((autor.value != "" && titulo.value != "") && (patern.test(autor.value) && patern.test(titulo.value))){

        //Arreglo tipo objeto
        const tipoLibro= {
            id: id++,
            titulo: titulo.value.trim(),
            autor: autor.value.trim()
        }

        let tr = libro.agregar(tipoLibro);
        tabla.appendChild(tr);
        LocalStorageOperation.almacenarLibro(tipoLibro);

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se ha agregado el libro',
            showConfirmButton: false,
            timer: 1000
        })
        autor.value = "";
        titulo.value = "";
    }else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Datos no válidos',
            showConfirmButton: false,
            timer: 1000
        })
    }
    
    
}

function acciones(event){
    if(event.target.tagName === 'I' || event.target.tagName === 'BUTTON'){
        if(event.target.className.includes("btn-warning") || event.target.className.includes("fa-trash")){
            libro.eliminar(event.target);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Libro eliminado',
                showConfirmButton: false,
                timer: 1000
            })
        }
    }
}

function prepararDOM() {
    const librosLS= LocalStorageOperation.obtenerLS();

    for(let i= 0; i< librosLS.length; i++) {
        let tr= libro.agregar(librosLS[i]);
        tabla.appendChild(tr);
    }
}