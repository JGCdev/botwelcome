module.exports = {
	name: 'ayuda',
	description: 'Comandos de ayuda',
	execute(channel, args) {
		channel.send({embed: {
			color: 3447003,
			description: "¿Cómo puedo ayudarte?",
			fields: [{
				name: "!bot server",
				value: "Comprueba el estado del servidor"
			  },
			  {
				name: "!bot killscore",
				value: "GangWars: Top Killers 💀"
			  },
			  {
				name: "!bot driftscore",
				value: "GangWars: Top Drifters 🏎️"
			  },
			  {
				name: "!bot headshotscore",
				value: "GangWars: Top Headshooters 🤯"
			  },
			  {
				name: "!bot ip",
				value: "Instrucciones de acceso al servidor"
			  },
			//   {
			// 	name: "!bot donacion",
			// 	value: "Relacionado con donaciones"
			//   }
			],
			
		  }
		});
	},
};