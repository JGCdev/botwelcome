require('dotenv').config();
const fs = require('fs');
const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;
const Discord = require('discord.js');
const Canvas = require('canvas');
const cron = require('cron');
const TCPPortCheck = require('tcp-port-check')
const client = new Discord.Client({ ws: { intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'] } });

// const client = new Discord.Client();
client.commands = new Discord.Collection();

// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// for (const file of commandFiles) {
// 	const command = require(`./commands/${file}`);
// 	client.commands.set(command.name, command);
// }

// Mejorar approach para promesa e interactions
client.once('ready', () => {
	console.log('Bot conectado!');

	// Print lista de usuarios
	// client.channels.cache.find(ch => ch.id === '733856596190298164').guild.members.fetch().then( (res)=> {
	// 	res.forEach(element => {
	// 		console.log(element.displayName);	
	// 	});
	// });
	//client.api.applications(client.user.id).guilds('733800471638310933').commands.post({

	client.api.applications(client.user.id).commands.post({
        data: {
            name: "ayuda",
            description: "Comandos disponibles en el bot"
            // possible options here e.g. options: [{...}]
        },
		data: {
            name: "ip",
            description: "Ver IP e instrucciones de acceso al servidor"
            // possible options here e.g. options: [{...}]
        },
		data: {
            name: "server",
            description: "Comprobar estado del servidor"
            // possible options here e.g. options: [{...}]
        },
    });
	client.ws.on('INTERACTION_CREATE', async interaction => {
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;
		const channel = client.channels.cache.get(interaction.channel_id);
		let embed = [];
		let async = true;
        if (command === 'ayuda'){ 
			async = true;
			embed = [ {
				color: 3447003,
				description: "¿Cómo puedo ayudarte?",
				fields: [
					{
						name: "/ayuda",
						value: "Listar comandos disponibles"
					},
					{
						name: "/server",
						value: "Comprueba el estado del servidor"
					},
					// {
					// 	name: "/scoreboard",
					// 	value: "Obtén la scoreboard del servidor"
					// },
					{
						name: "/ip",
						value: "Instrucciones de acceso al servidor"
					},
				//   {
				// 	name: "!bot donacion",
				// 	value: "Relacionado con donaciones"
				//   }
				],
				
			  }
			];
            
        } else if (command === 'server') {
			async = false;
			p.then(res => {
				if (res) {
					embed = [res]
					client.api.interactions(interaction.id, interaction.token).callback.post({
						data: {
							type: 4,
							data: {
								embeds: embed
							}
						}
					})
				}
			}).catch( err => {
				console.log('Hay err');
				client.api.interactions(interaction.id, interaction.token).callback.post({
					data: {
						type: 4,
						data: {
							embeds: [{
								color: 3447003,
								fields: [{
									name: "📌 Estado del servidor:",
									value: 'OFFLINE'
								  },
								],
							  }]
						}
					}
				})
			});
		} else if (command === 'ip') {
			async = true;
			embed = [{
				color: 3447003,
				title: "📌 IP del servidor",
				fields: [{
					name: "https://cfx.re/join/k3ya76",
					value: "Para acceder abre FiveM, pulsa F8 e introduce la URL"
				},
				],
		  	}];
		}

		if (async) {
			client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						embeds: embed
					}
				}
			})
		}

    });
});

const p = new Promise((resolve) => {
	let checker = new TCPPortCheck({
		getBanner: 512
	})
	checker.check('51.210.222.43', 2445).on('done', (ip, port, result) => {
			console.log(ip, port, result)
			let statusResult = result.opened ? 'ONLINE' : 'OFFLINE';
			resolve({
				color: 3447003,
				fields: [{
					name: "📌 Estado del servidor:",
					value: statusResult
				  },
				],
			  }
			)
	})
});

// Comandos de texto -- DUPLICADOS,eliminar si funcionan bien slash commands
client.on('message', message => {
	if (!message.content.startsWith(PREFIX) || message.author.bot) return;

	const args = message.content.slice(PREFIX.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	// Comandos
	if (command === 'ayuda') {
		client.commands.get('ayuda').execute(message.channel, args);
	} else if (command === 'server') {
		client.commands.get('server').execute(message, args);
	} else if (command === 'ip') {
		client.commands.get('ip').execute(message, args);
	} else if (command === 'driftscore') {
		client.commands.get('driftscore').execute(message, args);
	} else if (command === 'killscore') {
		client.commands.get('killscore').execute(message, args);
	} else if (command === 'headshotscore') {
		client.commands.get('headshotscore').execute(message, args);
	} else if (command === ''){ // Comandos por defecto
		message.channel.send('No has introducido ningún comando después de mi llamada, comandos disponibles:');
		client.commands.get('ayuda').execute(message.channel, args);
	} else {
		message.channel.send('El comando introducido no se encuentra en mi base de datos, adjunto los comandos disponibles:');
		client.commands.get('ayuda').execute(message.channel, args);
	}
});


// async function sendMessage(message) {
// 	if (message.author.id === '322434817352531978') {
// 		console.log('SendMSG: ', message.author);
// 		const channel = client.channels.cache.get('1106232589821419621');
// 		const member = message.channel.guild.members.cache.get('322434817352531978');
	
// 		if (!channel) return;
// 		console.log('2- saludamos');
// 		const canvas = Canvas.createCanvas(730, 414);
// 		const ctx = canvas.getContext('2d');
	
// 		const background = await Canvas.loadImage(setBackground());
// 		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	
// 		ctx.lineJoin = 'bevel';
// 		ctx.lineWidth = 10;
// 		ctx.strokeStyle = '#fff';
// 		ctx.strokeRect(0, 0, canvas.width, canvas.height);
	
// 		// Slightly smaller text placed above the member's display name
// 		ctx.font = '28px sans-serif';
// 		ctx.fillStyle = '#ffffff';
// 		ctx.shadowColor = "rgba(0,0,0,0.9)";
// 		ctx.shadowBlur = 10;
// 		ctx.textAlign="center";
// 		ctx.fillText(`Hola ${member.user.tag}!`, canvas.width / 2, canvas.height / 1.3);
	
// 		// Add an exclamation point here and below
// 		ctx.font = applyText(canvas, 'Bienvenid@');
// 		ctx.fillStyle = '#ffffff';
// 		ctx.fillText(`Bienvenid@`, canvas.width / 2, canvas.height / 1.1);
// 		ctx.shadowBlur = 0;
// 		ctx.beginPath();
// 		ctx.arc(canvas.width / 2, 150, 100, 0, Math.PI * 2, true);
// 		ctx.stroke();
// 		ctx.closePath();
// 		ctx.clip();
	
// 		const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
// 		ctx.drawImage(avatar, canvas.width / 2 - 100, 50, 200, 200);
	
// 		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
	
// 		channel.send(`${member} acaba de llegar a 𝓟𝓮𝓬𝓪𝓭𝓸 𝓒𝓲𝓽𝔂! 👋`, attachment);
// 	}
// }




// Evento entrada usuarios
client.on('guildMemberAdd', async member => {
	
	console.log('1- entra alguien');
	let channel = member.guild.channels.cache.find(ch => ch.id === '733800475966832723');
	let name = '𝓟𝓮𝓬𝓪𝓭𝓸 𝓒𝓲𝓽𝔂'
	let bgImage = './img/bg0.png';
	if (member.guild.id == '1136719639448129617') { // Si es en freeroam
		console.log('Entra a freeroam');
		channel = member.guild.channels.cache.find(ch => ch.id === '1136719640870006869');
		name = '𝓟𝓮𝓬𝓪𝓭𝓸 𝓖𝓪𝓷𝓰𝓦𝓪𝓻𝓼';
		bgImage = './img/bg1.png';
	}
	if (member.guild.id == '1136719859384848475') { // Si es en WL
		console.log('Entra a wl');
		channel = member.guild.channels.cache.find(ch => ch.id === '1136719860135645309');
		name = '𝓟𝓮𝓬𝓪𝓭𝓸 𝓦𝓱𝓲𝓽𝓮𝓵𝓲𝓼𝓽';
		bgImage = './img/bg2.png';
	}

	if (!channel) return;

	console.log('2- saludamos');
	Canvas.registerFont('./impact.ttf', { family: 'Impact' })
	const canvas = Canvas.createCanvas(730, 414);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage(bgImage);
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.lineJoin = 'bevel';
	ctx.lineWidth = 10;
	ctx.strokeStyle = '#fff';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.shadowColor = "rgba(0,0,0,0.9)";
	ctx.shadowBlur = 10;
	ctx.textAlign="center";
	ctx.fillText(`Hola ${member.user.tag}!`, canvas.width / 2, canvas.height / 1.3);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, 'Bienvenid@');
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`Bienvenid@`, canvas.width / 2, canvas.height / 1.1);
	ctx.shadowBlur = 0;
	ctx.beginPath();
	ctx.arc(canvas.width / 2, 150, 100, 0, Math.PI * 2, true);
	ctx.stroke();
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, canvas.width / 2 - 100, 50, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`${member} acaba de llegar a ${name}! 👋`, attachment);
});

// let count = 0;
// function setBackground() {
// 	let imagBg =  './img/bg.png';

// 	if (count === 0) {
// 		imagBg =  './img/bg0.png';
// 	} else if (count === 1) {
// 		imagBg =  './img/bg1.png';
// 	} else if (count === 2) {
// 		imagBg =  './img/bg2.png';
// 	} else if (count === 3) {
// 		imagBg =  './img/bg3.png';
// 	} else if (count === 4) {
// 		imagBg =  './img/bg4.png';
// 	} else if (count === 5) {
// 		imagBg =  './img/bg5.png';
// 	}

// 	count++;
// 	if (count > 5) {
// 		count = 0;
// 	}

// 	return imagBg;
// }

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');
	let fontSize = 70;
	do {
		ctx.font = `${fontSize -= 10}px Impact`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};



let scheduledMessage = new cron.CronJob('00 30 18 * * *', () => {
	// This runs every day at 18:30:00, in channel #chat-general
	let channel = client.channels.cache.find(ch => ch.id === '733856596190298164');
	channel.send(
		'<@&737693780723105793> ***Recompensas activas***: \n' +
		'1º TrackyServer - Reclama 5.000$ diarios votando por el servidor en la siguiente URL: https://www.trackyserver.com/es/server/306664 \n' +
		'2º Invita a tu amigos - Consigue 1 Semana de Paquete VIP gratis \n' +
		'Vota y reclama tu premio diario utilizando el comando /checkvoto. Más información en <#1035845278785343529>\n' + 
		'Aún no conoces **Pecado GangWars**? Nuevo servidor PvP, Freeroam y Guerra de Bandas, únete aquí: https://discord.gg/KVrxS9CSd9');
});
  
// When you want to start it, use:
scheduledMessage.start();


client.login(TOKEN);
