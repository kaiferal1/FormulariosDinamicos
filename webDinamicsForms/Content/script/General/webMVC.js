
// Referencia global.
var _body;

/**
* @namespace
*/
var webMVC = function () {
};


webMVC.prototype =/** */ {
    /**
     * Lista de clases a ejecutar, cuando esta lista la pagina.
     */
    fn: {},

    /**
     * Inicializador de la clase sam.
     * @class
    */
    init: function () {

        let g = s;

        // Se ejecuta el iniciador.
        //this.init();
        _body = $("body");

    },

    /**
     * Agrega clases a ejecutar y/o a formar parte del framework.
     * @param {JSON} opc
     * @param {string} opc.nombre - Namespace y nombre de la clase que quiere ser agregada.
     * @param {object} opc.objeto - Objeto a agregar.
     * @param {bool} opc.ejecutar - Indica que el objeto es un constructor y/o tiene una funcion init.
     * @param {string} opc.variable - Nombre de la variable global al que se asignar el resultado.
     * @class
    */
    agregar: function (opc) {

        var o = {
            nombre: "",
            objeto: {},
            ejecutar: false,
            variable: undefined
        }

        $.extend(true, o, opc);

        //Nombre 
        let _espacioNombreA = o.nombre.split("."),
            _espaArm;

        for (let i = 0, l = _espacioNombreA.length; i < l; i++) {
            let _item = _espacioNombreA[i];
            if (i == 0) {
                if (l > 1 && !webMVC.prototype[_item]) {
                    _espaArm = webMVC.prototype[_item] = {};
                } else if (!webMVC.prototype[_item]) {
                    _espaArm = webMVC.prototype[_item] = o.objeto;
                } else {
                    _espaArm = webMVC.prototype[_item];
                }
            } else {
                if ((l - 1 == i) && !_espaArm[_item]) {
                    _espaArm = _espaArm[_item] = o.objeto;
                }
                else if (!_espaArm[_item]) {
                    _espaArm = _espaArm[_item] = {};
                } else {
                    _espaArm = _espaArm[_item];
                }
            }
        }

        if (o.nombre) {
            this.fn[o.nombre] = o;
        }

    },

    quitar: function (opc) {
        let o = {
            nombre: ""
        }

        $.extend(true, o, opc);

        if (o.nombre) {
            delete this.fn[o.nombre];
        }
    }
};

/**
 * Referencia global 
 */
const s = new webMVC();

$(document).ready(function () {
    new s.init();
});

