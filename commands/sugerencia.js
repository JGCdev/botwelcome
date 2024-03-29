module.exports = {
	name: 'sugerencia',
	description: 'Añadir sugerencia al canal',
	execute(message, client, args) {
		let messageContentSub = message.content.substr(message.content.indexOf(" ") + 1)
		let messageContent = messageContentSub.substr(messageContentSub.indexOf(" ") + 1)
		
		// Enviamos sugerencia a canal y añadimos backup en cualquier canal en el que se haya creado
		message.channel.send('Sugerencia guardada');
		client.channels.cache.get('733857277143941162').send({embed: {
			color: 3447003,
			fields: [{
				name: "Enviada por",
				value: message.member.displayName
			  },
			  {
				name: "Sugerencia",
				value: messageContent
			  }
			],
			timestamp: new Date(),
			footer: {
			  text: `ID: ${message.id}`
			}
		  }
		});
	},
};