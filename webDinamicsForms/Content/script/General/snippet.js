/******************************************************************************************************************************

Basico para crear un js para una vista

*******************************************************************************************************************************/
/**
 * Controles UI
 */
let _;

/**
 * Variables internas
 */
let _opt = 1, _Id = 0, _SP = "";

/*
 *Obtener los controles 
 */
function obtenerControles() {
    _ = $("#_");
}

/*
 * Asignar eventos a los controles
 */
function asignarEventos() {
    _.click(function() {

    });
}


/*
 *Eventos
 */

function limpiar() {
    _.val("");
    _opt = 1;
}


/*
 * Ejecuta los metodos Iniciales
 */
obtenerControles();
asignarEventos();


/******************************************************************************************************************************

Basico para crear

*******************************************************************************************************************************/