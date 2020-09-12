/**
 * MAIN
 */

const autor = document.getElementById("inputAutor");
const titulo = document.getElementById("inputTitulo");
const autorEdit= document.getElementById("inputAutorEdit");
const tituloEdit = document.getElementById("inputTituloEdit");
const tabla = document.getElementById("tbody");
const inputBuscar= document.getElementById("inputBuscar");

const libro = new Libro();

const patern = /^[a-zA-ZÁ-ÿ0-9\s]{3,100}$/;

function eventListener(){
    document.getElementById("btnAdd").addEventListener("click",prepararLibro);
    tabla.addEventListener("click",acciones);

    document.getElementById('btn-vaciar').addEventListener('click', vaciarLibreria);

    document.getElementById('btnBuscar').addEventListener('click', buscarLibro);
}

eventListener();
prepararDOM();

function prepararLibro(){

    let id= Number(LocalStorageOperation.ultimoID());
    id++;

    if((autor.value != "" && titulo.value != "") && (patern.test(autor.value) && patern.test(titulo.value))){

        //Arreglo tipo objeto
        const tipoLibro= {
            id: id,
            titulo: titulo.value.trim(),
            autor: autor.value.trim()
        }

        let validacionExistencia= LocalStorageOperation.validarTitulo(tipoLibro.titulo.trim().toLowerCase(), tipoLibro.autor.trim().toLowerCase());
        if(validacionExistencia == 0) {
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
        }else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Libro ya existente',
                showConfirmButton: false,
                timer: 1000
            })
        }
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
        //Borrar btn
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
        //Editar btn
        if(event.target.className.includes("btn-info") || event.target.className.includes("fa-edit")){

            document.getElementById('btnEdit').addEventListener("click", () => {
                if((autorEdit.value != "" && tituloEdit.value != "") && (patern.test(autorEdit.value) && patern.test(tituloEdit.value))) {
                    const libroEdit= {
                        id: 0,
                        titulo: tituloEdit.value.trim(),
                        autor: autorEdit.value.trim()
                    }

                    let verificar= LocalStorageOperation.validarTitulo(libroEdit.titulo.trim().toLowerCase(), libroEdit.autor.trim().toLowerCase());
                    if(verificar == 0) {
                        libro.editar(event.target, libroEdit);

                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'El libro ha sido editado exitosamente',
                            showConfirmButton: false,
                            timer: 1000
                        })
                    }else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Datos dados ya existentes',
                            showConfirmButton: false,
                            timer: 1000
                        })
                    }
                }else{
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Datos no válidos',
                        showConfirmButton: false,
                        timer: 1000
                    })
                }
            });
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

function vaciarLibreria() {
    console.log(tabla.firstChild);

    while(tabla.firstChild) {
        tabla.firstChild.remove();
    }

    LocalStorageOperation.limpiarStorage();
}

function buscarLibro(event) {
    event.preventDefault();

    //Validar que el input tenga texto
    if(inputBuscar.value != '') {
        let resultadoBusqueda= LocalStorageOperation.buscarTitulo(inputBuscar.value.trim().toLowerCase());
    
        if(resultadoBusqueda != '') {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Busqueda exitosa',
                text: `El libro ${resultadoBusqueda.autor} tiene el id ${resultadoBusqueda.id} y fue escrito por ${resultadoBusqueda.autor}`,
                showConfirmButton: false,
                timer: 1500
            })
        }else {
            console.log("Naur");
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `No esta registrado el libro ${inputBuscar.value}`,
                footer: '<a href>Why do I have this issue?</a>'
            })
        }
    }

    inputBuscar.value= '';
}