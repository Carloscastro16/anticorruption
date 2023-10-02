import inquirer from "inquirer"
import chalk from 'chalk';

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
    rol: string = 'Ciudadano'
    constructor(name: string){
        super(name)
    }
}
class ServidorPublico extends Persona {
    rol: string = 'Servidor Publico'
    constructor(name: string){
        super(name)
    }
}


let player = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Please enter your name"
})

console.log(`Hola, mucho gusto ${chalk.bold.green("hola")}`)
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
    userOne = new Ciudadano(player.name)
    console.log(`Hola, mucho gusto ${chalk.bold.green(userOne)}`)
}else{
    userOne = new ServidorPublico(player.name)
    console.log(`Hola, mucho gusto ${chalk.bold.green(userOne)}`)
}


