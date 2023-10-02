import inquirer from "inquirer";
import chalk from 'chalk';
class Persona {
    constructor(name) {
        this.name = name;
    }
}
class Ciudadano extends Persona {
    constructor(name) {
        super(name);
        this.rol = 'Ciudadano';
    }
}
class ServidorPublico extends Persona {
    constructor(name) {
        super(name);
        this.rol = 'Servidor Publico';
    }
}
let player = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Please enter your name"
});
console.log(`Hola, mucho gusto ${chalk.bold.green("hola")}`);
let incidentType = await inquirer.prompt({
    type: "list",
    name: 'select',
    message: 'Elige el tipo de usuario',
    choices: [
        "Ciudadano",
        "Servidor Publico",
    ]
});
let userOne;
console.log(`Hola, mucho gusto ${chalk.bold.green("hola")}`);
console.log(`Hola, mucho gusto ${chalk.bold.green("hola")}`);
if (incidentType == 'Ciudadano') {
    userOne = new Ciudadano(player.name);
    console.log(`Hola, mucho gusto ${chalk.bold.green(userOne)}`);
}
else {
    userOne = new ServidorPublico(player.name);
    console.log(`Hola, mucho gusto ${chalk.bold.green(userOne)}`);
}
