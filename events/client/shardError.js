const { red, white } = require("chalk");

module.exports = async (id) => {
    console.log(white('[') + red('ERROR') + white('] ') + red('Shard ') + white(id) + red(' Shard Errored!'));
}