/**
*
*/
s.agregar({
    nombre: "ico",
    objeto: {
        editar: function (id) {
            return "<a class='icoEdit' data-id='" + id + "'><i class='far fa-edit fa-1x'></a>";
        }
        , delet: function (clas) {
            return "<a id='btnTrash' class='" + clas + "' ><i class='fas fa-trash-alt'></i></a>";
        }
        , btnEdit: function (icoico) {
            return "<a class='" + icoico + "' ><i class='far fa-edit fa-1x'></a>";
        }
        , status: function (id) {
            console.log(id);
            let rest = "";
            if (id == 1) {
                rest = '<span class="badge badge-success"> Activado </span>';
            }
            else if (id == 0) {
                rest = '<span class="badge badge-warning"> Desactivado </span>';
            }
            return rest
        }
        , statActiv: function (stat) {
            return '<span class="badge badge-info"><i class="far fa- edit fa- 1x">' + stat + '</span>';
        }
        , statPO: function (id) {
            let color = "";
            
            switch (id) {
                case "Solicita PO": color = "#D2D4D1"
                    break;
                case "Cargado con éxito": color = "#54CD18"
                    break;
                case "En revisión": color = "#F3B530"
                    break;
                case "En aprobación": color = "#4EADD9"
                    break;
                case "Aprobada": color = "#2BC4D5"
                    break;
                case "Rechazar PO": color = "#E4600C"
                    break;
                case "bloqueado": color = "#DD0000"
                    break;
                case "pagada": color = "6AAA40"
                    break;
                case "pendiente": color = "#D2D2D2"
                    break;
            }
            return '<span class="badge" style="background-color:' + color + ';"> ' + id + ' </span>';
        }
    }
});

s.agregar({
    nombre: "down",
    objeto: {
        pdf: function (id,PO) {
            return "<a href='EISENMAN/Files/"+id+"-"+PO+"/PO.pdf' target='_blank'><i class='fas fa-download' id=''></i></a>";
        } ,
        xml: function () {
            return "<a id='btnEdit'><i class='far fa-edit fa-1x'></a>";
        },
        pdfs: function (id, PO,file) {
            return "<a href='EISENMAN/Files/" + id + "-" + PO + "/"+file+".pdf'><i class='fas fa-download' id='download'></i></a>";
        }
    }
});

s.agregar({
    nombre: "ctrl",
    objeto: {
        ckbx: function (id) {
            return "<input type='checkbox' class='form-control' style='height:15px'  data-id='" + id + "' />";
        }
        , add: function () {
            return "<a id='btnEdit'><i class='far fa-edit fa-1x'></a>";
        }
        , status: function (stat) {
            return '<span class="badge badge-info">' + stat + '</span>';
        }
    }
});