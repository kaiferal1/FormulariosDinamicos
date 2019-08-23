/*
 * Metodo encargado de manejar las alertas que se muestran en el sistema
 */
s.agregar({
    nombre: "ajax",
    objeto: function (opc) {
        let o = {
            tipo:"JSON",//dataForm
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            peticion: "POST", //tipo post o get
            async: true,
            funcion: "ejecutarSP",
            data: {
                sp: ""
            }
        };

        if (typeof opc == "object") {
            $.extend(true, o, opc);
        }

        let objA = {
            contentType: o.contentType,
            async: o.async
            , method: o.peticion
            , url: o.funcion
            , data: o.data
            //, beforeSend: function () { s.loader.show(); }
            //, complete: function () { s.loader.hide(); }
            , fail: function (e) { console.log(e); s.alert({ flag: "-2" }); }
        };

        if (o.tipo == "dataForm") {

        }

        return objA;
    }
});


/**
 * 
 */
s.agregar({
    nombre: "download",
    objeto: {
        generarLinkDescarga: function (opc) {
            var o = {
                ruta: "",
                nombre: ""
            };
            $.extend(true, o, opc);

            var save = document.createElement('a');
            save.href = o.ruta;
            save.target = '_blank';
            //Truco: así le damos el nombre al archivo 
            save.download = o.nombre;
            var clicEvent = new MouseEvent('click', {
                'view': window,
                'bubbles': true,
                'cancelable': true
            });
            //Simulamos un clicK del usuario
            //no es necesario agregar el link al DOM.
            save.dispatchEvent(clicEvent);
            //Y liberamos recursos...
            (window.URL || window.webkitURL).revokeObjectURL(save.href);
        },
        crearArchivoBlob: function (opc) {
            if (!window.atob || !window.Uint8Array) {
                // The current browser doesn't have the atob function. Cannot continue
                return null;
            }
            //base64, mimetype, slicesize

            var mimetype = opc.mimetype || '',
                slicesize = opc.slicesize || 512,
                bytechars = atob(opc.base64),
                bytearrays = [];
            for (var offset = 0; offset < bytechars.length; offset += slicesize) {
                var slice = bytechars.slice(offset, offset + slicesize);
                var bytenums = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    bytenums[i] = slice.charCodeAt(i);
                }
                var bytearray = new Uint8Array(bytenums);
                bytearrays[bytearrays.length] = bytearray;
            }
            return new Blob(bytearrays, { type: mimetype });
        }
    }
});


s.agregar({
    nombre: "downloadFile",
    objeto: function (opc) {
        let o = {
            method: "POST"
            , url: "downloadFile"
            , data: { carpeta: "", name: "" }
        };

        if (typeof opc == "object") {
            $.extend(true, o, opc);
        }

        $.ajax(o)
            .done(function (r) {
                console.log(r);
                let data = JSON.parse(r), url = "";
                console.log(data);
                if (data.bandera == "1") {
                    url = "../" + data.data[0].ruta + "/" + data.data[0].nombre;
                    s.download.generarLinkDescarga({
                        ruta: url,
                        nombre: data.data[0].nombre
                    });
                }
            })
            .fail(function (e) {
                s.alert({ flag: "-2" });
            });
        }
});




