/*
 * Metodo Encargado de llenar un select pero los datos deben venir distingidos por "id" y "text"
 */
/*  *
    * @param {JSON}   opc - Opciones.
    * @param {string} opc.tbl - 
    * @param {string} opc.cbx -
    * @param {bool}   opc.inicial -
    * @param {object} opc.data -
    * @param {object} opc.ajax -
    * @param {object} opc.selects -
    * @example 
    */
s.agregar({
    nombre: "cbx",
    objeto: function (opc) {
        let o = {
            tbl: "Table0"
            , cbx: "cbx"
            , inicial: true
            , data: {
                sp: "",
                opc: 0
            }
            , ajax: {
                //data: {
                //    sp: "",
                //    opc: 0
                //}
            }
            , selects: {
                //cbxX: {
                //    tbl: "Table0"
                //    , inicial: true
                //}
            }
        };

        if (typeof opc == "object") {
            $.extend(true, o, opc);
        }

        if (!$.isEmptyObject(o.ajax)) {

            let z = s.ajax({
                data: o.ajax.data
            });

            $.ajax(z)
                .done(function (e) {
                    let datos = JSON.parse(e);
                    if (datos.bandera == "1") {
                        $.each(o.selects, function (i, it) {
                            let box = $("#" + i);
                            box.find("option").remove();
                            if (o.selects[i].inicial) {
                                box.append($('<option>', {
                                    value: 0
                                    , text: "Selecciona una opción"
                                    , selected: true
                                }));
                            }
                            if (!$.isEmptyObject(datos.data[it.tbl])) {
                                $.each(datos.data[it.tbl], function (a, at) {
                                    let flagId = true, flagText = true, opt = $("<option>");
                                    $.each(at, function (e, et) {
                                        if (flagId) {
                                            opt.prop("id", et);
                                            opt.prop("value", et);
                                            flagId = false;
                                        } else if (flagText) {
                                            opt.prop("text", et);
                                            flagText = false;
                                        }
                                        else {
                                            opt.attr("data-" + e, et);
                                        }
                                    });
                                    box.append(opt);
                                });
                            }
                        });
                    }
                    s.alert({ flag: datos.bandera, msg: datos.mensaje });
                });
        }
        else {
            let cbxI = $("#" + o.cbx),
              z = s.ajax({ data: o.data });

            $.ajax(z)
                .done(function (e) {
                    let datos = JSON.parse(e);
                    if (datos.bandera == "1") {

                        cbxI.find("option").remove();
                        if (o.inicial) {
                            cbxI.append($('<option>',
                            {
                                value: 0,
                                text: "Selecciona una opción",
                                selected: true
                            }));
                        }
                        datos.data[o.tbl].forEach(function (item) {
                            cbxI.append($('<option>',
                                {
                                    value: item.id,
                                    text: item.text
                                }));
                        });

                    } else if (datos.bandera == "-1") {
                        s.alert({ flag: datos.bandera, msg: datos.mensaje });
                    }
                });
        }
    }
});


s.agregar({
    nombre: "inputs",
    objeto: function (opc) {
            var o = {
                tbl: "Table0",
                box: "box",
                type: "text",
                input: {
                    class: ""
                },
                data: [],
                ajax: {
                    //sp: "",
                    //opc: 0
                }
            };

            if (typeof opc == "object") {
                $.extend(true, o, opc);
            }

            let box = $("#" + o.box);

            if (!$.isEmptyObject(o.ajax)) {
                let z = s.ajax({ data: o.ajax });
                $.ajax(z)
                .done(function (e) {
                    let datos = JSON.parse(e);
                    load(datos.data);
                    s.alert({ flag: datos.bandera, msg: datos.mensaje });
                });
            }
            else {
                let dd = new Object();
                dd[o.tbl] = o.data;
                load(dd);
            }

            function load(data) {
                box.empty();
                $.each(data[o.tbl], function (i, it) {
                    box.append(element(it));
                });
            }

            function element(opc) {
                let o = {
                    text: ""
                    , id: ""
                    , type: ""
                    , cat: ""
                }, tmp = $('<div class="form-group"><label></label></div>');

                if (typeof opc == "object") {
                    $.extend(true, o, opc);
                }
                tmp.find("label").html(o.text);
                switch (o.type) {
                    case "text":
                        tmp.append($("<input>", { type: "text", class: "form-control", id: "text" + o.id }));
                        break;
                    case "date":
                        tmp.append($("<input>", { type: "date", class: "form-control  required", id: "date" + o.id }));
                        break;
                    case "number":
                        tmp.append($("<input>", { type: "number", class: "form-control  required", id: "number" + o.id }));
                        break;
                    case "email":
                        tmp.append($("<input>", { type: "email", class: "form-control  required", id: "email" + o.id }));
                        break;
                    case "tel":
                        tmp.append($("<input>", { type: "tel", class: "form-control  required", id: "tel" + o.id }));
                        break;
                    case "file":
                        tmp.append($("<input>", { type: "file", class: "form-control  required", id: "file" + o.id }));
                        break;
                    case "checkbox":
                        let dataCkbx = JSON.parse(o.cat);
                        $.each(dataCkbx, function (i, it) {
                            tmp.append($('<div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input" id="ckbx' + it.id + '" ><label class="custom-control-label" for="ckbx' + it.id + '"> ' + it.text + ' </label></div>'));
                        });
                        break;
                    case "radio":
                        let dataRadio = JSON.parse(o.cat);
                        $.each(dataRadio, function (i, it) {
                            tmp.append($('<div class="custom-control custom-radio"><input type="radio" id="radio' + it.id + '" name="groupRadio' + o.id + '" class="custom-control-input"><label class="custom-control-label" for="radio' + it.id + '"> ' + it.text + ' </label></div>'));
                        });
                        //tmp.append("<input>", { type: "date", class: "form-control  required", id: "date" + o.id });
                        break;
                    case "select":
                        let dataOption = JSON.parse(o.cat);
                        tmp.append($("<select>", { class: "form-control", id: "cbx" + o.id }));
                        $.each(dataOption, function (i, it) {
                            tmp.find("select").append($("<option>", { value: it.text, html: it.text }));
                        });
                        //tmp.append("<input>", { type: "date", class: "form-control  required", id: "date" + o.id });
                        break;
                    case "catSystem":
                        tmp.append($("<select>", { class: "form-control", id: "cbx" + o.id }));

                        let z = s.ajax({
                            data: {
                                sp: "LlenarCampos_CRUD"
                                , opc: 8
                                , idCatalogos: o.idDB
                            }
                        });
                        console.log(z);
                        $.ajax(z)
                        .done(function (e) {
                            let datos = JSON.parse(e);
                            console.log(datos);
                            if (datos.bandera == "1") {
                                $.each(datos.data.Table0, function (i, it) {
                                    tmp.find("select").append($("<option>", { value: it.text, html: it.text }));
                                });
                            }
                            s.alert({ flag: datos.bandera, msg: datos.mensaje });
                        });
                        //tmp.append("<input>", { type: "date", class: "form-control  required", id: "date" + o.id });
                        break;
                }
                return tmp;
            }
        }
    
});


/**
 * tbls
 * 
 */
s.agregar({
    nombre: "tbls",
    objeto: function (obj) {
        let o = {
            paging: false,
            info: false,
            columnDefs: [],
            dom: 'Bfrtip',
            buttons: ['excel'],
            language: {
                url: "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
            }
        };

        if (typeof opc == "object") {
            $.extend(true, o, opc);
        }
        return o;
    }
});

/**
 * validCtrl
 * Se encarga de validar si el control tiene un valor seleccionado
 */
s.agregar({
    nombre: "validCtrl",
    objeto: function () {
        let listCtrl = $(".required"), valid = true;
        listCtrl.removeClass("is-invalid");
        listCtrl.each(function (i, it) {
            if ($(this).val().length < 1) {
                $(this).addClass("is-invalid");
                valid = false;
                return false;
            }
        });
        if (valid) {
            if (document.querySelector(".is-invalid")) {
                valid = false;
            }
        }
        return valid;
    }
});

/**
 *badge
 *
*/
s.agregar({
    nombre: "badge",
    objeto: function (opc) {

        let o = {
            box: "",
            tipo: "badge-info",
            tbl: "Table0",
            data: {
                sp: "",
                opc: 0
            }
        };

        if (typeof opc == "object") {
            $.extend(true, o, opc);
        }

        var z = s.ajax({
            data: o.data
        });

        let content = $('#' + o.box);

        function listar() {
            $.ajax(z)
                .done(function (e) {
                    let datos = JSON.parse(e);
                    console.log(datos);
                    if (datos.bandera = "1") {
                        content.find("span.badge").remove();
                        $.each(datos.data[o.tbl], function (i, item) {
                            content.append($("<span class='badge " + o.tipo + "' data-val='" + item.nombreCorto + "' >" +
                                item.nombre +
                                "<a class='btnDownLoad' style='padding:9px;border-bottom-color:black;'><i class='fas fa-file-download fa-1x'></i></a></span><span class='badge'>    </span>"));
                            //<a class='btnDel' style='padding:9px;border-bottom-color:black;'><i class='far fa-trash-alt fa-1x'></i></a>
                        });
                    }
                    s.alert({ flag: datos.bandera, msg: datos.mensaje });

                    listFiles.find("a.btnDownLoad").click(function () {

                        let lmt = $(this).parent(), t = $(this);
                        let mail = lmt.text(), id = lmt.data("val");
                        let z = s.ajax({
                            funcion: "downloadFile"
                            , data: { carpeta: "" + _idPO + "-" + txtPO.val() + "", name: id }
                            , beforeSend: function () { s.loader.show(); }
                            , complete: function () { s.loader.hide(); }
                        });
                        $.ajax(z)
                            .done(function (r) {
                                let data = JSON.parse(r), url = "";
                                if (data.bandera == "1") {
                                    url = "../" + data.data[0].ruta + "/" + data.data[0].nombre;
                                    s.download.generarLinkDescarga({
                                        ruta: url,
                                        nombre: data.data[0].nombre
                                    });
                                }
                            });
                    });

                });
        }
        listar();
    }
});

/**
 * Loading
 *
*/
s.agregar({
    nombre: "loader",
    objeto: {
        hide: function () {
            // eliminamos el div que bloquea pantalla
            $("#WindowLoad").remove();
        },
        show: function () {
            console.log("listooo");
            //eliminamos si existe un div ya bloqueando
            $("#WindowLoad").remove(); //jsRemoveWindowLoad();

            //centrar imagen gif
            height = 20;//El div del titulo, para que se vea mas arriba (H)
            var ancho = 0;
            var alto = 0;

            //obtenemos el ancho y alto de la ventana de nuestro navegador, compatible con todos los navegadores
            if (window.innerWidth == undefined) ancho = window.screen.width;
            else ancho = window.innerWidth;
            if (window.innerHeight == undefined) alto = window.screen.height;
            else alto = window.innerHeight;

            //operación necesaria para centrar el div que muestra el mensaje
            var heightdivsito = alto / 2 - parseInt(height) / 2;//Se utiliza en el margen superior, para centrar
            let midAncho = ancho / 2;
            //imagen que aparece mientras nuestro div es mostrado y da apariencia de cargando
            imgCentro = "<div class='sk-cube-grid' style='margin-top:" + heightdivsito + "px; margin-left:" + midAncho + "px;'><div class='sk-cube sk-cube1'></div><div class='sk-cube sk-cube2'></div><div class='sk-cube sk-cube3'></div><div class='sk-cube sk-cube4'></div><div class='sk-cube sk-cube5'></div><div class='sk-cube sk-cube6'></div><div class='sk-cube sk-cube7'></div><div class='sk-cube sk-cube8'></div><div class='sk-cube sk-cube9'></div></div>"

            //creamos el div que bloquea grande------------------------------------------
            div = document.createElement("div");
            div.id = "WindowLoad"
            div.style.width = ancho + "px";
            div.style.height = alto + "px";
            $("body").append(div);

            //creamos un input text para que el foco se plasme en este y el usuario no pueda escribir en nada de atras
            input = document.createElement("input");
            input.id = "focusInput";
            input.type = "text"

            //asignamos el div que bloquea
            $("#WindowLoad").append(input);

            //asignamos el foco y ocultamos el input text
            $("#focusInput").focus();
            $("#focusInput").hide();

            //centramos el div del texto
            $("#WindowLoad").html(imgCentro);
        }
    }
});


/**
 * Tags - badges
 *
*/
s.agregar({
    nombre: "tags",
    objeto: function (opc) {

        let o = {
            box: "tagsB"
            , tag: {
                tipo: "badge-info"
                , btnIco: {
                    ico: ""
                    , fn: function () { }
                }
                , btnDelete: {
                    ico: "fas fa-trash-alt fa-1x"
                    , fn: function () { }
                }
            }
            , ajax: {
                //tbl: "Table0",
                //data: {
                //    sp: "",
                //    opc: 0
                //}
            }
            , data: []
        };

        if (typeof opc == "object") {
            $.extend(true, o, opc);
        }

        let box = $('#' + o.box);

        if (!$.isEmptyObject(o.ajax)) {
            let z = s.ajax({
                data: o.ajax.data
            });

            $.ajax(z)
               .done(function (e) {
                   let datos = JSON.parse(e);
                   console.log(datos);
                   if (datos.bandera = "1") {
                       box.find("span.badge").remove();
                       $.each(datos.data[o.ajax.tbl], function (i, it) {
                           let objHtml = $("<span>", { class: "badge badge-pill " + o.tag.tipo });
                           if (o.tag.btnIco.ico.length > 0) {
                               objHtml.append($("<a>"), {
                                   id: "btnIco"
                               });
                               objHtml.find("a:first").append($("<i class='" + o.tag.btnIco.ico + "'></i>"));
                               objHtml.find("a:first").on("click", o.tag.btnIco.fn);
                           }

                           objHtml.prop("id", it.id);
                           objHtml.append(" " + it.text + " ");
                           objHtml.css("margin", "5px");

                           if (o.tag.btnDelete.ico.length > 0) {
                               objHtml.append($("<a>", {
                                   id: "btnDelete"
                               }));
                               objHtml.find("a:last").append($("<i class='" + o.tag.btnDelete.ico + "'></i>"));
                               objHtml.find("a:last").on("click", o.tag.btnDelete.fn);
                           }
                           box.append(objHtml);
                       });
                   }
                   s.alert({ flag: datos.bandera, msg: datos.mensaje });
               });
        }
    }
});

/**
* Iconos
* s.icos();
* Opcion con la que se puede crear iconos de fontawesom dentro de una etiqueta a 
*/
s.agregar({
    nombre: "icos",
    objeto: function (opc) {
        let o = {
            box: {
                html: "a"
                , prop: { class: "btnEdit" }
            }
            , ico: {
                prop: { class: "far fa-edit fa-1x" }
            }
        };

        if (typeof opc == "object") {
            $.extend(true, o, opc);
        }

        let tmp = $("<" + o.box.html + ">");
        $.each(o.box.prop, function (i, it) {
            tmp.prop(i, it);
        });
        tmp.append($("<i>"));
        $.each(o.ico.prop, function (i, it) {
            tmp.find("i").prop(i, it);
        });
        return tmp.prop("outerHTML");

    }
});




