import chalk from 'chalk';
let notifications = true;
export async function sendNotification(dataType) {
    switch (dataType) {
        case 'new':
            console.log("---------------------------------------------");
            console.log(`${chalk.bold.yellow('Se ha agregado un nuevo incidente')}`);
            console.log("---------------------------------------------");
            console.log('');
            break;
        case 'change':
            console.log("---------------------------------------------");
            console.log(`${chalk.bold.yellow('Se ha cambiado el status del incidente')}`);
            console.log("---------------------------------------------");
            console.log('');
            break;
        case 'delete':
            console.log("---------------------------------------------");
            console.log(`${chalk.bold.yellow('Se ha borrado un incidente')}`);
            console.log("---------------------------------------------");
            console.log('');
            break;
        case 'fin':
            console.log("---------------------------------------------");
            console.log(`${chalk.bold.yellow('Se ha marcado un incidente como solucionado')}`);
            console.log("---------------------------------------------");
            console.log('');
            break;
    }
}
export function toggleNotifications() {
    notifications = !notifications;
    return notifications;
}
