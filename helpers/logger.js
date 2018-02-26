const chalk = require("chalk")
const emojic = require("emojic")

exports.logSuccess = (string) => {
    console.log(emojic.whiteCheckMark, " ", chalk.green.bold(string))
}

exports.logFailure = (string) => {
    console.log(chalk.red(string))
}
