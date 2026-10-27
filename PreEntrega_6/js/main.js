const racionesPorDia = 3;

const calcularRaciones = (cantidadViajeros, diasViaje, racionesPorDia) =>
    cantidadViajeros * diasViaje * racionesPorDia + cantidadViajeros;

const calcularCosto = (totalRaciones, precioRacion) => totalRaciones * precioRacion;

class Expedicion {
    constructor(nombreLider, cantidadViajeros, diasViaje, precioRacion) {
        this.nombreLider = nombreLider;
        this.cantidadViajeros = cantidadViajeros;
        this.diasViaje = diasViaje;
        this.precioRacion = precioRacion;
        this.totalRaciones = 0;
        this.costoTotal = 0;
    }

    calcularPresupuesto(racionesPorDia) {
        this.totalRaciones = calcularRaciones(
            this.cantidadViajeros,
            this.diasViaje,
            racionesPorDia
        );
        this.costoTotal = calcularCosto(this.totalRaciones, this.precioRacion);
    }
}

const mostrarResultado = (nombre, cantidadViajeros, diasViaje, totalRaciones, costoTotal, listaProvisiones) => {
    let evaluacionCosto = "";

    if (costoTotal <= 500) {
        evaluacionCosto = "La expedición tiene un costo bajo.";
    } else if (costoTotal <= 1000) {
        evaluacionCosto = "La expedición tiene un costo moderado.";
    } else {
        evaluacionCosto = "La expedición tiene un costo elevado.";
    }

    alert(
        "Expedición de " + nombre + ":\n" +
        "Viajeros: " + cantidadViajeros + "\n" +
        "Duración: " + diasViaje + " días\n" +
        "Raciones necesarias: " + totalRaciones + "\n" +
        "Costo total: " + costoTotal + " coronas.\n" +
        "Provisiones en la lista: " + listaProvisiones.length + "\n" +
        evaluacionCosto
    );
};

const listarExpediciones = (lista) => {
    console.log("--- Registro de expediciones ---");

    for (const expedicion of lista) {
        console.log(
            "Líder: " + expedicion.nombreLider +
            " | Viajeros: " + expedicion.cantidadViajeros +
            " | Días: " + expedicion.diasViaje +
            " | Precio por ración: " + expedicion.precioRacion +
            " | Raciones: " + expedicion.totalRaciones +
            " | Costo: " + expedicion.costoTotal + " coronas."
        );
    }

    console.log("Total de expediciones registradas: " + lista.length);
};

const listarProvisiones = (lista) => {
    console.log("--- Provisiones de la expedición ---");
    let indice = 0;

    for (const provision of lista) {
        console.log("Índice " + indice + " | Provisión: " + provision);
        indice++;
    }

    console.log("Total: " + lista.length + " provisiones.");
};

const agregarProvision = (lista) => {
    const respuesta = prompt("¿Qué provisión querés agregar?");

    if (respuesta === null) {
        return;
    }

    const nuevaProvision = respuesta.trim().toLowerCase();

    if (nuevaProvision === "") {
        alert("Ingresá el nombre de una provisión.");
        return;
    }

    if (lista.includes(nuevaProvision)) {
        alert("Esa provisión ya está en la lista.");
        return;
    }

    lista.push(nuevaProvision);
    alert("Se agregó al final: " + nuevaProvision);
};

const retirarUltimaProvision = (lista) => {
    if (lista.length === 0) {
        alert("La lista está vacía. No hay provisiones para retirar.");
        return;
    }

    const provisionRetirada = lista.pop();
    alert("Se ha eliminado el elemento: " + provisionRetirada);
};

const buscarProvision = (lista) => {
    const respuesta = prompt("¿Qué provisión querés buscar?");

    if (respuesta === null) {
        return;
    }

    const provisionBuscada = respuesta.trim().toLowerCase();

    if (provisionBuscada === "") {
        alert("Ingresá el nombre de una provisión.");
        return;
    }

    if (!lista.includes(provisionBuscada)) {
        alert("La provisión " + provisionBuscada + " no está en la lista.");
        return;
    }

    const posicion = lista.indexOf(provisionBuscada);
    alert("La provisión " + provisionBuscada + " está en el índice " + posicion + ".");
};

const reemplazarProvision = (lista) => {
    if (lista.length === 0) {
        alert("La lista está vacía. Agregá una provisión antes de reemplazar.");
        return;
    }

    listarProvisiones(lista);
    const indiceIngresado = prompt("Ingresá el índice de la provisión que querés reemplazar:");

    if (indiceIngresado === null) {
        return;
    }

    const indice = Number(indiceIngresado);

    if (
        indiceIngresado.trim() === "" ||
        isNaN(indice) ||
        indice % 1 !== 0 ||
        indice < 0 ||
        indice >= lista.length
    ) {
        alert("El índice no es válido. Elegí uno que exista en la lista.");
        return;
    }

    const respuesta = prompt("¿Cuál es la nueva provisión?");

    if (respuesta === null) {
        return;
    }

    const nuevaProvision = respuesta.trim().toLowerCase();

    if (nuevaProvision === "") {
        alert("Ingresá el nombre de una provisión.");
        return;
    }

    if (lista.includes(nuevaProvision) && lista.indexOf(nuevaProvision) !== indice) {
        alert("Esa provisión ya existe en otra posición.");
        return;
    }

    const provisionAnterior = lista[indice];
    lista.splice(indice, 1, nuevaProvision);
    alert("Se reemplazó " + provisionAnterior + " por " + nuevaProvision + ".");
};

const gestionarProvisiones = (lista) => {
    const opcionesValidas = ["0", "1", "2", "3", "4", "5"];
    let opcion = "";
    listarProvisiones(lista);

    while (opcion !== "0") {
        opcion = prompt(
            "Preparación de provisiones:\n" +
            "1 - Agregar una provisión al final\n" +
            "2 - Retirar la última provisión\n" +
            "3 - Buscar una provisión\n" +
            "4 - Reemplazar una provisión por índice\n" +
            "5 - Listar provisiones en la consola\n" +
            "0 - Terminar la preparación y calcular\n\n" +
            "Los índices comienzan en 0. Abrí la consola con F12 para ver la lista."
        );

        if (opcion === null) {
            return;
        }

        opcion = opcion.trim();

        if (!opcionesValidas.includes(opcion)) {
            alert("Opción no válida. Elegí un número del 0 al 5.");
            continue;
        }

        switch (opcion) {
            case "1":
                agregarProvision(lista);
                break;
            case "2":
                retirarUltimaProvision(lista);
                break;
            case "3":
                buscarProvision(lista);
                break;
            case "4":
                reemplazarProvision(lista);
                break;
            case "5":
                listarProvisiones(lista);
                break;
        }
    }
};

const registrarExpedicion = (nombreLider, listaProvisiones, registroExpediciones) => {
    const nombre = nombreLider.trim();

    if (nombre === "") {
        alert("Ingresá un nombre para el líder de la expedición.");
        return false;
    }

    const cantidadViajeros = Number(
        prompt("¿Cuántos viajeros forman el grupo? Ingresá un número entero positivo.")
    );
    const diasViaje = Number(
        prompt("¿Cuántos días durará la expedición? Ingresá un número entero positivo.")
    );
    const precioRacion = Number(
        prompt("¿Cuánto cuesta cada ración? Usá punto para los decimales.")
    );

    if (
        isNaN(cantidadViajeros) ||
        isNaN(diasViaje) ||
        isNaN(precioRacion % 1) ||
        cantidadViajeros % 1 !== 0 ||
        diasViaje % 1 !== 0 ||
        cantidadViajeros <= 0 ||
        diasViaje <= 0 ||
        precioRacion <= 0
    ) {
        alert("Los datos no son válidos. Viajeros y días deben ser enteros positivos; el precio debe ser un número positivo.");
        return false;
    }

    gestionarProvisiones(listaProvisiones);

    const expedicion = new Expedicion(nombre, cantidadViajeros, diasViaje, precioRacion);
    expedicion.calcularPresupuesto(racionesPorDia);
    registroExpediciones.push(expedicion);

    console.log("Reporte de provisiones para " + nombre + ":");
    listarProvisiones(listaProvisiones);

    mostrarResultado(
        expedicion.nombreLider,
        expedicion.cantidadViajeros,
        expedicion.diasViaje,
        expedicion.totalRaciones,
        expedicion.costoTotal,
        listaProvisiones
    );

    return true;
};

// Las consultas trabajan sobre el registro de objetos de la entrega 5.
const buscarExpedicion = (lista) => {
    if (lista.length === 0) {
        alert("No hay expediciones registradas para consultar.");
        return;
    }

    const respuesta = prompt("Ingresá el nombre del líder de la expedición que querés buscar:");

    if (respuesta === null) {
        return;
    }

    const nombreBuscado = respuesta.trim().toLowerCase();

    if (nombreBuscado === "") {
        alert("Ingresá un nombre para realizar la búsqueda.");
        return;
    }

    const expedicionEncontrada = lista.find(
        (expedicion) => expedicion.nombreLider.toLowerCase() === nombreBuscado
    );

    if (expedicionEncontrada === undefined) {
        alert("No se encontró una expedición con ese líder.");
        return;
    }

    console.log("Primera expedición encontrada para " + expedicionEncontrada.nombreLider + ":");
    listarExpediciones([expedicionEncontrada]);
    alert("Se encontró la primera expedición de " + expedicionEncontrada.nombreLider + ".\nCosto: " + expedicionEncontrada.costoTotal + " coronas.\nConsultá el detalle en la consola.");
};

const filtrarExpedicionesPorCosto = (lista) => {
    if (lista.length === 0) {
        alert("No hay expediciones registradas para consultar.");
        return;
    }

    const respuesta = prompt("¿Cuál es el costo máximo de las expediciones que querés consultar? Ingresá un número mayor o igual a cero.");

    if (respuesta === null) {
        return;
    }

    const costoMaximo = Number(respuesta);

    if (respuesta.trim() === "" || isNaN(costoMaximo % 1) || costoMaximo < 0) {
        alert("Ingresá un costo máximo válido, mayor o igual a cero. Usá punto para los decimales.");
        return;
    }

    const expedicionesFiltradas = lista.filter(
        (expedicion) => expedicion.costoTotal <= costoMaximo
    );

    if (expedicionesFiltradas.length === 0) {
        alert("No hay expediciones con un costo menor o igual a " + costoMaximo + " coronas.");
        return;
    }

    console.log("Expediciones con un costo máximo de " + costoMaximo + " coronas:");
    listarExpediciones(expedicionesFiltradas);
    alert("Se encontraron " + expedicionesFiltradas.length + " expediciones. Consultá los resultados en la consola.");
};

const simularDescuentoExpediciones = (lista) => {
    if (lista.length === 0) {
        alert("No hay expediciones registradas para simular un descuento.");
        return;
    }

    const respuesta = prompt("¿Qué porcentaje de descuento en las raciones querés simular para todas las expediciones? Ingresá un valor entre 0 y 100.");

    if (respuesta === null) {
        return;
    }

    const porcentaje = Number(respuesta);

    if (respuesta.trim() === "" || isNaN(porcentaje) || porcentaje < 0 || porcentaje > 100) {
        alert("Ingresá un porcentaje válido entre 0 y 100. Usá punto para los decimales.");
        return;
    }

    const presupuestosSimulados = lista.map((expedicion) => {
        return {
            nombreLider: expedicion.nombreLider,
            totalRaciones: expedicion.totalRaciones,
            costoOriginal: expedicion.costoTotal,
            costoSimulado: expedicion.costoTotal - expedicion.costoTotal * porcentaje / 100
        };
    });

    const totalOriginal = lista.reduce((total, expedicion) => total + expedicion.costoTotal, 0);
    const totalSimulado = presupuestosSimulados.reduce((total, presupuesto) => total + presupuesto.costoSimulado, 0);

    console.log("--- Simulación de descuento del " + porcentaje + "% en raciones ---");

    for (const presupuesto of presupuestosSimulados) {
        console.log(
            "Líder: " + presupuesto.nombreLider +
            " | Raciones: " + presupuesto.totalRaciones +
            " | Costo original: " + presupuesto.costoOriginal +
            " | Costo simulado: " + presupuesto.costoSimulado + " coronas."
        );
    }

    console.log("Total original: " + totalOriginal + " coronas.");
    console.log("Total simulado: " + totalSimulado + " coronas.");
    alert("Descuento simulado: " + porcentaje + "%.\nTotal original: " + totalOriginal + " coronas.\nTotal simulado: " + totalSimulado + " coronas.\nConsultá el detalle por expedición en la consola.");
};

const consultarExpediciones = (lista) => {
    const opcionesValidas = ["0", "1", "2", "3", "4"];
    let opcion = "";

    while (opcion !== "0") {
        opcion = prompt(
            "Consultas de expediciones:\n" +
            "1 - Buscar una expedición por líder\n" +
            "2 - Filtrar expediciones por costo máximo\n" +
            "3 - Simular un descuento en todas las expediciones\n" +
            "4 - Listar todas las expediciones en la consola\n" +
            "0 - Finalizar el simulador\n\n" +
            "Abrí la consola con F12 para ver los resultados."
        );

        if (opcion === null) {
            return;
        }

        opcion = opcion.trim();

        if (!opcionesValidas.includes(opcion)) {
            alert("Opción no válida. Elegí un número del 0 al 4.");
            continue;
        }

        switch (opcion) {
            case "1":
                buscarExpedicion(lista);
                break;
            case "2":
                filtrarExpedicionesPorCosto(lista);
                break;
            case "3":
                simularDescuentoExpediciones(lista);
                break;
            case "4":
                listarExpediciones(lista);
                break;
        }
    }
};

const provisionesExpedicion = ["agua", "pan", "carne seca", "queso", "frutas secas"];

const expedicionAlba = new Expedicion("Alba", 4, 5, 2);
const expedicionNero = new Expedicion("Nero", 6, 7, 4);
const expedicionPercival = new Expedicion("Percival", 10, 10, 5);

const expedicionesRegistradas = [expedicionAlba, expedicionNero, expedicionPercival];

for (const expedicion of expedicionesRegistradas) {
    expedicion.calcularPresupuesto(racionesPorDia);
}

console.log("Se cargaron tres expediciones de ejemplo con sus presupuestos calculados.");
listarExpediciones(expedicionesRegistradas);

let expedicionesCalculadas = 0;
let nombre = prompt(
    "Ingresá el nombre del líder de la expedición o escribí ESC para terminar la carga y pasar a las consultas:"
);

while (nombre !== null && nombre.trim().toLowerCase() !== "esc") {
    if (registrarExpedicion(nombre, provisionesExpedicion, expedicionesRegistradas)) {
        expedicionesCalculadas++;
    }

    nombre = prompt(
        "Ingresá otro líder para realizar una nueva simulación o escribí ESC para pasar a las consultas:"
    );
}

console.log("Expediciones calculadas correctamente: " + expedicionesCalculadas);
listarExpediciones(expedicionesRegistradas);
consultarExpediciones(expedicionesRegistradas);
alert("Simulador finalizado.");
