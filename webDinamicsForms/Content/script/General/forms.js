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
                    console.log(datos);
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
                                    console.log(at);
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

/////eliminar este metodo y cambiarlo por el principal de cbx
s.agregar({
    nombre: "cbxD",
    objeto: function (opc) {
        let o = {
            tbl: "Table0"
            , cbx: "cbx"
            , data: []
        };

        if (typeof opc == "object") {
            $.extend(true, o, opc);
        }

        let cbxI = $("#" + o.cbx);

        cbxI.find("option").remove();
        cbxI.append($('<option>',
            {
                value: 0,
                text: "Selecciona una opción",
                selected: true
            }));

        o.data.forEach(function (item) {
            cbxI.append($('<option>',
                {
                    value: item.id,
                    text: item.text
                }));
        });
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
                    box.append($(element(it)));
                });
            }

            function element(opc) {
                let oo = {
                    text: ""
                    , id: ""
                }, tmp = "";

                if (typeof opc == "object") {
                    $.extend(true, oo, opc);
                }
                switch (o.type) {
                    case "button":
                        break;
                    case "checkbox":
                        tmp = "<div class='col-2'> <div class='form-check'><input class='form-check-input' type='" + o.type + "' value='" + oo.id + "' id='ckbx" + oo.id + "'> <label class='form-check-label'>" + oo.text + "</label></div></div>";
                        break;
                        //case "color":
                        //    break;
                        //case "date":
                        //    break;
                        //case "datetime-local":
                        //    break;
                        //case "email":
                        //    break;
                        //case "file":
                        //    break;
                        //case "hidden":
                        //    break;
                        //case "image":
                        //    break;
                        //case "month":
                        //    break;
                        //case "number":
                        //    break;
                        //case "password":
                        //    break;
                        //case "radio":
                        //    break;
                        //case "range":
                        //    break;
                        //case "reset":
                        //    break;
                        //case "search":
                        //    break;
                        //case "submit":
                        //    break;
                        //case "tel":
                        //    break;
                        //case "text":
                        //    break;
                        //case "time":
                        //    break;
                        //case "url":
                        //    break;
                        //case "week":
                        //    break;
                    default:
                        tmp = "<div class='form-group'><label>" + oo.text + "</label><input type='" + o.type + "' id='" + o.type + oo.id + "' class='form-control " + o.input.class + " required' placeholder='" + oo.text + "'></div></div>";
                        break;

                }
                return tmp;
            }
        }
    
});

/**
 * ctrls
 * 
 */
s.agregar({
    nombre: "ctrls",
    objeto: function () {
        /*** Asignar un input como datetime ***/
        $("[data-datetime]").datetimepicker({
            format: 'YYYY-MM-DD',
            local: moment.es,
            icons: {
                time: 'far fa-clock',
                date: 'far fa-calendar-alt',
                up: 'fas fa-chevron-up',
                down: 'fas fa-chevron-down',
                previous: 'fas fa-chevron-left',
                next: 'fas fa-chevron-right',
                clear: 'far fa-trash-alt',
                close: 'far fa-times'
            },
            defaultDate: new Date()
        })
            .prop("placeholder", "YYYY-MM-DD")
            .blur(function () {
                let v = $(this);
                if (v.val().length == 0) {
                    v.val(moment().format("YYYY-MM-DD"));
                }
            });
        /*** Validar input tipo file en extenciony peso ***/
        $("input[type=file]")
            .attr("accept", "image/jpeg,application/pdf,application/xml")
            .change(function () {
                if ($(this).get(0).files.length != 0) {
                    let fileName = this.files[0].name;
                    let fileSize = this.files[0].size;
                    let msg = ""
                    if (fileSize > 50000000) {//12 Mb
                        msg = 'El archivo no debe superar los 12MB';
                        this.value = '';
                        this.files[0].name = '';
                    } else {
                        // recuperamos la extensión del archivo
                        var ext = fileName.split('.').pop();
                        switch (ext) {
                            case 'xml':
                            case 'pdf':
                                break;
                            default:
                                msg = "El archivo no tiene una extencion permitida";
                                this.value = ''; // reset del valor
                                this.files[0].name = '';
                        }
                    }
                    if (msg.length != 0) {
                        s.alert({ flag: "-1", msg: msg });
                    }
                }
            });
        /*** validar que solo se ingresen numeros como moneda ***/
        $("[data-numeric]").keypress(function (ev) {
            if (ev.key.match("[0-9,.]")) {
                $(ev.target).val(function (index, value) {
                    return value.replace(/\D/g, "")
                        .replace(/([0-9])([0-9]{1})$/, '$1.$2')
                        .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
                });
            } else { return false; }
        });
        /*** Validar que se ingrese un mail correctamente ***/
        $("[data-mail]").blur(function () {
            let _mail = "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$", //"^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$"
                mail = $(this).val();
            if (mail.match(_mail)) {
                return true;
            } else {
                s.alert({ flag: "-1", msg: "Correo Incorrecto" });
                return false;
            }
        });
        /*** Validar que se ingrese correctamente un RFC ***/
        $("[data-rfc]").blur(function () {
            // patron del RFC, persona moral
            let _rfc_pattern_pm = "^(([A-ZÑ&]{3})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\\d])|[3][01])([A-Z0-9]{3}))|" +
            "(([A-ZÑ&]{3})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\\d])|[3][0])([A-Z0-9]{3}))|" +
            "(([A-ZÑ&]{3})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\\d])([A-Z0-9]{3}))|" +
            "(([A-ZÑ&]{3})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$";
            // patron del RFC, persona fisica
            let _rfc_pattern_pf = "^(([A-ZÑ&]{4})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\\d])|[3][01])([A-Z0-9]{3}))|" +
            "(([A-ZÑ&]{4})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\\d])|[3][0])([A-Z0-9]{3}))|" +
            "(([A-ZÑ&]{4})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\\d])([A-Z0-9]{3}))|" +
            "(([A-ZÑ&]{4})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$";
            let rfc = $(this).val();
            if (rfc.match(_rfc_pattern_pm) || rfc.match(_rfc_pattern_pf)) {
                return true;
            } else {
                s.alert({ flag: "-1", msg: "RFC Incorrecto" });
                return false;
            }
        });
        /*** Validar que se ingrese correctamente un CURP ***/
        $("[data-curp]").blur(function () {
            let _curp = "[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}" +
            "(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])" +
            "[HM]{1}" +
            "(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)" +
            "[B-DF-HJ-NP-TV-Z]{3}" +
            "[0-9A-Z]{1}[0-9]{1}$";
        });
        /*** validar solo letras y numeros ***/
        $("[data-alfanum]").keypress(function (ev) {
            let _alfa = "[A-Za-z0-9 ]", alfa = ev.key;
            if (!alfa.match(_alfa)) {
                return false;
            }
        });


        /***  ***/
        /***  ***/
    },
    ejecutar: true
});

//*Arreglar este metodo para poder funcionar dentro de cualquier vista y no tener  que declararlo en cada una*/
s.agregar({
    nombre: "ctrlsCleave",
    objeto: function (opt) {

    } //{
    //    numeric: function () {
    //        var s = new Cleave(".ctrl-numeric", {
    //            numeral: true
    //             , numeralDecimalScale: 0
    //        });
    //    },
    //    decimal: function () {
    //        var s = new Cleave(".ctrl-decimal", {
    //            numeral: true
    //            , numeralDecimalScale: 2
    //        });
    //    },
    //    money: function () {
    //        var s = new Cleave(".ctrl-money", {
    //            numeral: true
    //            , numeralDecimalScale: 2 //cantidad de decimales
    //            , prefijo: ' $ ' //prefijo 
    //            , signBeforePrefix: true // determina si se permite el prefijo en el control
    //        });
    //    },
    //    phone: function () {
    //        var s = new Cleave(".ctrl-phone", {
    //            phone: true,
    //            phoneRegionCode: 'ES'
    //        });
    //    }
    //}
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


s.agregar({
    nombre: "ltsBadge",
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
            console.log(z);
            let jqxhr = $.ajax(z)
                .done(function (e) {
                    let datos = JSON.parse(e);
                    console.log(datos);
                    if (datos.bandera = "1") {
                        console.log(datos);
                        content.find("span.badge").remove();
                        content.find("span.space").remove();
                        $.each(datos.data[o.tbl], function (i, item) {
                            content.append($("<span class='badge " + o.tipo + "' data-val='" + item.id_Cliente + "' >" +
                                item.Correo +
                                " <a class='btnDel' style='padding:9px;border-bottom-color:black;'><i class='far fa-trash-alt fa-1x'></i></a></span><span class='space'> </span>"));
                        });
                    }
                    s.alert({ flag: datos.bandera, msg: datos.mensaje });
                    content.find("a.btnDel").click(function () {
                        let lmt = $(this).parent();
                        lmt.remove();
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




