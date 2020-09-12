class Libro{
    // Propiedades
        id = 0;
        autor = '';
        titulo = '';

    //Metodos
        agregar(infoLibro){
            this.autor = infoLibro.autor;
            this.titulo = infoLibro.titulo;
            this.id= infoLibro.id;

            //console.log(this.id, this.autor, this.titulo);

            const tr = document.createElement("tr");
            tr.setAttribute('id', `${this.id}`);

            tr.innerHTML = `<th scope="row">${this.id}</th>
                            <td>${this.titulo}</td>
                            <td>${this.autor}</td>
                            <td>
                                <div class="btn-group" role="" aria-label="Basic example">
                                    <button id="editar${this.id}" type="button" class="btn btn-info" data-target="#modalEdit" data-toggle="modal">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button id="eliminar${this.id}" type="button" class="btn btn-danger">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>`

            return tr;
        }

        eliminar(element){
            // element puede tener dos valores ('I', 'BUTTON')
            if(element.tagName === 'I'){
                element.parentElement.parentElement.parentElement.parentElement.remove();
                LocalStorageOperation.borrarLibro(element.parentElement.parentElement.parentElement.parentElement.id);

            }else{
                element.parentElement.parentElement.parentElement.remove();
                LocalStorageOperation.borrarLibro(element.parentElement.parentElement.parentElement.id);
            }
        }

        
        editar(element, arrayLibro) {

            if(element.tagName === 'I'){
                LocalStorageOperation.editarLibro(element.parentElement.parentElement.parentElement.parentElement.id, arrayLibro);
            }else{
                LocalStorageOperation.editarLibro(element.parentElement.parentElement.parentElement.id, arrayLibro);
            }

            /*console.log("Editancia ON");
            console.log(element);
            console.log(arrayLibro.titulo + "++++" + arrayLibro.autor);*/
        }

}