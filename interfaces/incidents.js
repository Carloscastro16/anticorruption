import inquirer from 'inquirer';
export async function reportarIncidente() {
    let date = await inquirer.prompt({
        type: "input",
        name: "fecha",
        message: "Ingresa la fecha del incidente"
    });
    let hour = await inquirer.prompt({
        type: "input",
        name: "hour",
        message: "Ingresa la hora del incidente"
    });
    let description = await inquirer.prompt({
        type: "input",
        name: "hour",
        message: "Ingresa la hora del incidente"
    });
    let evidence = await inquirer.prompt({
        type: "input",
        name: "hour",
        message: "Ingresa la hora del incidente"
    });
    let status = await inquirer.prompt({
        type: "input",
        name: "hour",
        message: "Ingresa la hora del incidente"
    });
}
