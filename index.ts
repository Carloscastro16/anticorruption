import inquirer from "inquirer"
import chalk from 'chalk';
import * as notificationsInterface from './interfaces/notifications.js'
import * as incidentsInterface from './interfaces/incidents.js'
import * as loactionsInterface from './interfaces/location.js'
export interface Rol {
    name: string
}
class Persona {
    name: string;
    constructor(name: string){
        this.name = name
    }
}
class Ciudadano extends Persona {
    rol: string = 'Ciudadano';
    correo: string = '';
    pass: string = '';
    constructor(name: string){
        super(name);
    }
    async login(correo: string, pass: string){
        this.correo = correo;
        this.pass = pass;
    }
}
class ServidorPublico extends Persona {
    rol: string = 'Ciudadano';
    correo: string = '';
    pass: string = '';
    constructor(name: string){
        super(name);
    }
    async login(correo: string, pass: string){
        this.correo = correo;
        this.pass = pass;
    }
}


let player = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Please enter your name"
})

console.log(`Hola, mucho gusto ${chalk.bold.green(player.name)}`)
let incidentType = await inquirer.prompt({
    type: "list",
    name: 'select',
    message: 'Elige el tipo de usuario',
    choices: [
        "Ciudadano",
        "Servidor Publico",
    ]
})
let userOne
if(incidentType == 'Ciudadano'){
    userOne = new Ciudadano(player.name);
    let credentials = await login();
    userOne.login(credentials.mailData.correo, credentials.passData.pass);
    console.log(userOne);
}else{
    userOne = new Ciudadano(player.name);
    let credentials = await login();
    userOne.login(credentials.mailData.correo, credentials.passData.pass);
    console.log(userOne);
}


async function login(){
    let mailData = await inquirer.prompt({
        type: "input",
        name: "correo",
        message: "Ingresa tu correo"
    })
    let passData = await inquirer.prompt({
        type: "input",
        name: "pass",
        message: "Ingresa tu contraseña"
    })
    let credentials ={
        mailData,
        passData
    }
    return credentials
}