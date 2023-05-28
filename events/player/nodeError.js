const { red, white } = require("chalk");

module.exports = async (client, node, error) => {
	console.log(white('[') + red('Lavalink_ERROR') + white('] ') + red('Node ') + white( node.options.identifier ) + red( error));
}