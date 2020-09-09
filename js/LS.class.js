/**
 * LOCAL STORAGE
 */

class LocalStorageOperation {
    //Propiedades

    //Metodos
        static almacenarLibro(infoLibro) {
            let arrayLibros= this.obtenerLS();
            arrayLibros.push(infoLibro);

            //console.log(arrayLibros);

            localStorage.setItem('Libros', JSON.stringify(arrayLibros));
        }

        static obtenerLS() {
            if(localStorage.getItem('Libros') === null) {
                //.getItem(key);
                //console.log('Vacio');

                return []; //para asi tener un array vacio y no un null y asi poder hacer push
            }else {
                //console.log('Si hay libros');

                return JSON.parse(localStorage.getItem('Libros'));
            }
        }
}