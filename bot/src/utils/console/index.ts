import chalk from "chalk";

export function logInfo(message: String): void {
    console.log(chalk.bgMagentaBright("[INFO]") + chalk.magentaBright(` >>> ${message}`));
} 

export function logWarning(message: String): void {
    console.log(chalk.bgYellowBright("[WARNING]") + chalk.yellowBright(` >>> ${message}`));
} 

export function logError(message: String): void {
    console.log(chalk.bgRedBright("[ERROR]") + chalk.redBright(` >>> ${message}`));
} 

export function logConfirm(message: String): void {
    console.log(chalk.bgGreenBright("[CONFIRM]") + chalk.greenBright(` >>> ${message}`));
} 

export function logConecting(tag: String): void {
    console.log(chalk.bgCyanBright("[CONECTING]") + chalk.cyanBright(` >>> ${tag} is ​​connecting`));
} 

export function logExcecute(command: String): void {
    console.log(chalk.whiteBright("[Execute]") + chalk.whiteBright(` >>> ${command} was excecuted`));
} 