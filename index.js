import inquirer from "inquirer";
import chalk from 'chalk';
import * as notificationsInterface from './interfaces/notifications.js';
import * as searchingInterface from './interfaces/searching.js';
class Persona {
    constructor(name) {
        this.name = name;
    }
}
class Ciudadano extends Persona {
    constructor(name) {
        super(name);
        this.rol = 'Ciudadano';
        this.correo = '';
        this.pass = '';
        this.incidentesRegistrados = [
            {}
        ];
    }
    async login(correo, pass) {
        this.correo = correo;
        this.pass = pass;
    }
    registrarIncidente(incidente) {
        this.incidentesRegistrados.push(incidente);
    }
}
class ServidorPublico extends Persona {
    constructor(name) {
        super(name);
        this.rol = 'Servidor Publico';
        this.correo = '';
        this.pass = '';
    }
    async login(correo, pass) {
        this.correo = correo;
        this.pass = pass;
    }
}
class Incidente {
    constructor() {
        this.fecha = '';
        this.hora = '';
        this.descripcion = '';
        this.corruptionType = '';
        this.evidence = '';
        this.location = {};
        this.status = 'En proceso';
    }
    verStatus() {
        return this.status;
    }
    changeStatus(status) {
        this.status = status;
        notificationsInterface.sendNotification('change');
    }
    async reportarIncidente(fecha, hora, descripcion, corruptionType, evidencia, location) {
        this.fecha = fecha;
        this.hora = hora;
        this.descripcion = descripcion;
        this.corruptionType = corruptionType;
        this.evidence = evidencia;
        this.location = location;
        notificationsInterface.sendNotification('new');
    }
}
class Ubicacion {
    constructor() {
        this.longitud = '';
        this.latitud = '';
        this.ciudad = '';
        this.calles = '';
        this.manzana = '';
        this.lote = '';
    }
    obtenerUbicacion(longitud, latitud, ciudad, calles, manzana, lote) {
        //Aqui se crea la clase 
        this.longitud = longitud;
        this.latitud = latitud;
        this.ciudad = ciudad;
        this.calles = calles;
        this.manzana = manzana;
        this.lote = lote;
    }
}
let user = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Please enter your name"
});
console.log(`Hola, mucho gusto ${chalk.bold.green(user.name)}`);
console.log("---------------------------------------------");
let roleType = await inquirer.prompt({
    type: "list",
    name: 'select',
    message: 'Elige el tipo de usuario',
    choices: [
        "Ciudadano",
        "Servidor Publico",
    ]
});
console.log(roleType);
let userOne;
let ubicacion;
let incidente;
let exit = false;
if (roleType.select == 'Ciudadano') {
    userOne = new Ciudadano(user.name);
    let credentials = await login();
    userOne.login(credentials.mailData.correo, credentials.passData.pass);
    while (exit == false) {
        let reportsConfirm = await inquirer.prompt({
            type: "list",
            name: "reports",
            message: "¿Qué quieres hacer?",
            choices: [
                'Agregar incidente nuevo',
                'Ver incidentes',
                'Activar o desactivar notificaciones',
                'Salir'
            ]
        });
        switch (reportsConfirm.reports) {
            case 'Agregar incidente nuevo':
                let addReport = await inquirer.prompt({
                    type: "confirm",
                    name: "addReport",
                    message: "¿Quieres agregar un incidente nuevo?"
                });
                console.log("Generando incidente nuevo");
                console.log("---------------------------------------------");
                console.log(`${chalk.bold.blue('Primero proporciona datos de ubicación del incidente')}`);
                console.log("---------------------------------------------");
                if (addReport.addReport) {
                    ubicacion = new Ubicacion();
                    let locationData = await getLocation();
                    ubicacion.obtenerUbicacion(locationData.longitud, locationData.latitud, locationData.ciudad, locationData.calle, locationData.manzana, locationData.lote);
                    incidente = new Incidente();
                    let incidentData = await createIncident(ubicacion);
                    incidente.reportarIncidente(incidentData.fecha, incidentData.hora, incidentData.descripcion, incidentData.corruptionType, incidentData.evidence, incidentData.location);
                    userOne.registrarIncidente(incidente);
                    notificationsInterface.sendNotification('new');
                }
                console.log(userOne);
                console.log(ubicacion);
                console.log(incidente);
                break;
            case 'Ver incidentes':
                console.log('Ver todos los incidentes');
                searchingInterface.getAllIncidents();
                break;
            case 'Activar o desactivar notificaciones':
                let notificationsStatus = notificationsInterface.toggleNotifications();
                if (notificationsStatus) {
                    console.log('Las notificaciones están activadas');
                }
                else {
                    console.log('Las notificaciones están desactivadas');
                }
                break;
            case 'Salir':
                console.log('Gracias por usar el programa');
                exit = true;
                break;
        }
    }
}
else {
    userOne = new ServidorPublico(user.name);
    let credentials = await login();
    userOne.login(credentials.mailData.correo, credentials.passData.pass);
    while (exit == false) {
        let reportsConfirm = await inquirer.prompt({
            type: "list",
            name: "reports",
            message: "¿Qué quieres hacer?",
            choices: [
                'Ver todos los incidentes',
                'Ver incidentes por categoría',
                'Modificar incidentes',
                'Salir'
            ]
        });
        switch (reportsConfirm.reports) {
            case 'Ver todos los incidentes':
                console.log('Ver todos los incidentes');
                searchingInterface.getAllIncidents();
                break;
            case 'Ver incidentes por categoría':
                let category = await inquirer.prompt({
                    type: "list",
                    name: "reports",
                    message: "Elije la categoria",
                    choices: [
                        'Fraude',
                        'Nepotismo',
                        'Soborno'
                    ]
                });
                searchingInterface.filterByCategory(category.reports);
                console.log('Ver todos los incidentes');
                break;
            case 'Modificar incidentes':
                let incident = await inquirer.prompt({
                    type: "list",
                    name: "select",
                    message: "Elije el incidente",
                    choices: [
                        '1',
                        '2',
                        '3'
                    ]
                });
                let response = searchingInterface.searchById(incident.select);
                let incidentModify = new Incidente;
                if (response != undefined) {
                    incidentModify.reportarIncidente(response.fecha, response.hora, response.descripcion, response.corruptionType, response.evidence, response.location);
                }
                else {
                    console.log('No se encontró');
                }
                let statusChange = await inquirer.prompt({
                    type: "list",
                    name: "select",
                    message: "¿Cúal será el nuevo status?",
                    choices: [
                        'Solucionado',
                        'En Proceso',
                    ]
                });
                incidentModify.changeStatus(statusChange.select);
                break;
            case 'Salir':
                console.log('Gracias por usar el programa');
                exit = true;
                break;
        }
        console.log(userOne);
    }
}
async function login() {
    let mailData = await inquirer.prompt({
        type: "input",
        name: "correo",
        message: "Ingresa tu correo"
    });
    let passData = await inquirer.prompt({
        type: "input",
        name: "pass",
        message: "Ingresa tu contraseña"
    });
    let credentials = {
        mailData,
        passData
    };
    return credentials;
}
async function getLocation() {
    let confirm = await inquirer.prompt({
        type: "confirm",
        name: "confirmCoords",
        message: "¿Cuentas con las coordenadas del lugar?"
    });
    let longitud;
    let latitud;
    if (confirm.confirmCoords == true) {
        longitud = await inquirer.prompt({
            type: "input",
            name: "longitud",
            message: "Longitud:"
        });
        latitud = await inquirer.prompt({
            type: "input",
            name: "latitud",
            message: "Latitud:"
        });
    }
    else {
        longitud = '';
        latitud = '';
    }
    let ciudad = await inquirer.prompt({
        type: "input",
        name: "ciudad",
        message: "Ciudad:"
    });
    let calle = await inquirer.prompt({
        type: "input",
        name: "calle",
        message: "Calle:"
    });
    let manzana = await inquirer.prompt({
        type: "input",
        name: "manzana",
        message: "Manzana:"
    });
    let lote = await inquirer.prompt({
        type: "input",
        name: "lote",
        message: "Lote:"
    });
    let locationData = {
        longitud: longitud.longitud,
        latitud: latitud.latitud,
        ciudad: ciudad.ciudad,
        calle: calle.calle,
        manzana: manzana.manzana,
        lote: lote.lote,
    };
    return locationData;
}
async function createIncident(location) {
    let fechaData = await inquirer.prompt({
        type: "input",
        name: "fecha",
        message: "Fecha del incidente:"
    });
    let horaData = await inquirer.prompt({
        type: "input",
        name: "hora",
        message: "Hora del incidente:"
    });
    let descriptionData = await inquirer.prompt({
        type: "input",
        name: "description",
        message: "Descripcion del incidente:"
    });
    let tipoCorrupcion = await inquirer.prompt({
        type: "list",
        name: "corrupcion",
        choices: [
            'Nepotismo',
            'Soborno',
            'Fraude'
        ],
        message: "Seleccione el tipo de corrupción:"
    });
    let evidenceData = await inquirer.prompt({
        type: "input",
        name: "evidencia",
        message: "Descripcion del incidente:"
    });
    let incidentData = {
        fecha: fechaData.fecha,
        hora: horaData.hora,
        descripcion: descriptionData.description,
        corruptionType: tipoCorrupcion.corrupcion,
        evidence: evidenceData.evidencia,
        location: location,
    };
    return incidentData;
}
