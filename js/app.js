'use strict';
var nombres = [];

function Invitado(nombre) {
    this.nombre = nombre;
    this.confirmado = false;
}

function crearLista() {
    var uList = document.getElementById("invitedList"),
        li = document.createElement("li"),
        span = document.createElement("span"),
        inputEdit = document.createElement("input"),
        label = document.createElement("label"),
        input = document.createElement("input"),
        edit = document.createElement("button"),
        cancel = document.createElement("button"),
        borrar = document.createElement("button"),
        valor;

    span.textContent = nombres[nombres.length - 1].nombre;

    inputEdit.setAttribute("type", "text");
    inputEdit.value = nombres[nombres.length - 1].nombre;
    inputEdit.style.display = "none";

    label.textContent = "Confirmed";

    /**/
    input.setAttribute("type", "checkbox");
    label.appendChild(input);
    /**/
    input.addEventListener('change', function () {
        if (this.checked) {
            this.setAttribute("checked", "");
            this.parentNode.parentNode.setAttribute("class", "responded");
        } else {
            this.setAttribute("unchecked", "");
            this.parentNode.parentNode.setAttribute("class", "");
        }
    });


    /*************************************************************/

    edit.setAttribute("id", "editar");
    edit.textContent = "edit";

    cancel.setAttribute("id", "cancel");
    cancel.textContent = "cancel";
    cancel.style.backgroundColor = "rgba(255, 90, 70, .60)";
    cancel.style.display = "none";
    valor = span.textContent;

    cancel.addEventListener('click', function () {
        inputEdit.value = valor;
        edit.textContent = "edit";
        inputEdit.style.display = "none";
        span.style.display = "block";
        cancel.style.display = "none";
        borrar.style.display = "inline-block";
    });
    /**/
    edit.addEventListener('click', function () {
        var nombreGuardado = span.textContent,
            nombreCambiado,
            repite = false,
            i,
            indice;
        if (edit.textContent === "edit") {
            edit.textContent = "SAVE";
            span.style.display = "none";
            inputEdit.style.display = "block";
            borrar.style.display = "none";
            cancel.style.display = "inline-block";
        } else {
            // cambiar el nombre en el array y comprobar que no existe !!ESTA!!! creo 
            nombreCambiado = inputEdit.value;
            for (i = 0; i < nombres.length; i++) {
                if (nombres[i].nombre === nombreCambiado) {
                    inputEdit.value = nombreGuardado;
                    alert('Repites el nombre');
                    repite = true;
                }
                //buscar la posición de ese nombre en el array de objetos
                if (nombres[i].nombre === nombreGuardado) {
                    indice = i;
                }
            }
            /************************************************/
            span.textContent = inputEdit.value;
            //Si el nombre no se repite cambiamos el valor en el array
            if (!repite) {
                nombres[indice].nombre = nombreCambiado;
            }
            edit.textContent = "edit";
            inputEdit.style.display = "none";
            span.style.display = "block";
            cancel.style.display = "none";
            borrar.style.display = "inline-block";
            valor = span.textContent;
        }

    });
    /*************************************************************/
    borrar.setAttribute("id", "borrar");
    borrar.textContent = "remove";
    
    borrar.addEventListener('click', function () {
        // Mensaje de confirmacion
        if (confirm("¿Seguro que desea borrarlo?")) {
            //nombres.splice(nombres.findIndex(function (n) {
            nombres.map(function (n) {
                var posicion = nombres.indexOf(n);
                if (n.nombre === ((li.firstChild).innerHTML).toString()) {
                    nombres.splice(posicion, 1);
                    return true;
                }
                
            });
            uList.removeChild(li);
            document.getElementById("contInvitados").textContent = "Invitados ("+nombres.length+")";
        }
    });


    li.appendChild(span);
    li.appendChild(inputEdit);
    li.appendChild(label);
    li.appendChild(edit);
    li.appendChild(cancel);
    li.appendChild(borrar);

    uList.appendChild(li);
}

function comprobarNombre(nombreNuevo) {
    var etiquetaError = document.getElementById("errorNombre"),
        contieneNombre = false,
        invitado;
    
    nombres.map(function (invitado) {
        if (invitado.nombre === nombreNuevo) {
            contieneNombre = true;
        }
    });

    if (nombreNuevo === "" || nombreNuevo.value === "" || contieneNombre) {
        etiquetaError.textContent = "Error: el nombre debe ser único y no estar vacio.";
        return false;
    } else {
        etiquetaError.textContent = "";
        invitado = new Invitado(nombreNuevo);
        nombres.push(invitado);
        return true;
    }
}

document.getElementById("invitar").addEventListener("click", function (e) {
    e.preventDefault();

    var nombreInvitado = document.getElementById("nombre");
    if (comprobarNombre(nombreInvitado.value)) {
        crearLista();
        nombreInvitado.value = "";
        document.getElementById("contInvitados").textContent = "Invitados ("+nombres.length+")";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    var filtro = document.getElementById('filtro');

    filtro.addEventListener('change', function () {
        var checkbox = document.querySelectorAll("input[type=checkbox]"),
            i;
        if (filtro.checked) {
            // document.querySelectorAll("input[type=checkbox]")[2].parentNode.parentNode
            for (i = 1; i < checkbox.length; i++) {
                if (!checkbox[i].checked) {
                    checkbox[i].parentNode.parentNode.style.display = "none";
                }
            }
        } else {
            for (i = 1; i < checkbox.length; i++) {
                if (!checkbox[i].checked) {
                    checkbox[i].parentNode.parentNode.style.display = "block";
                }
            }
        }
    });

});

