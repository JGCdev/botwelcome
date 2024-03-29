module.exports = {
	name: 'ip',
	description: 'IP del servidor',
	execute(message, args) {
		message.channel.send({embed: 
			{
				color: 3447003,
				title: "📌 IP del servidor",
				fields: [{
					name: "51.210.222.43:2445",
					value: "Para acceder abre FiveM, pulsa F8 e introduce la IP"
				},
				],
		  	}
		});
	},
};