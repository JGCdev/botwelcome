var connection  = require('../database');

let latestUsersRequest = new Date() - 600000;
const REQ_TIME_BETWEEN_CALLS = 10 * 60 * 1000; // 10 Min
let preparedScoreboard = [];

module.exports = {
	name: 'killscore',
	description: 'Scoreboard del servidor',
	execute(message, args) {
		const dateNow = new Date();
		if (dateNow - latestUsersRequest > REQ_TIME_BETWEEN_CALLS) {
			console.log('Ha pasado una hora, hacemos petición:');
			latestUsersRequest = new Date();
			connection.query('SELECT * FROM users ORDER BY id desc',function(err,rows){
				if(err){
					console.log('Err');
				}else{
					preparedScoreboard = [];
					rows.sort((a, b) => b.kills - a.kills);
					let lengthScoreboard = rows.length > 10 ? 10 : rows.length;
					for (let i = 0; i < lengthScoreboard; i++) {
						let nameNew = (i + 1) + 'º ' + rows[i].name
						if (i === 0) {
							nameNew = '🥇 ' + rows[i].name
						} else if (i === 1) {
							nameNew = '🥈 ' + rows[i].name
						} else if (i === 2) {
							nameNew = '🥉 ' + rows[i].name
						}
						
						preparedScoreboard.push({
							name: nameNew,
							value: 'Asesinatos: ' + rows[i].kills + ' / Muertes: ' + rows[i].deaths + ' / Ratio: ' + (rows[i].kills / rows[i].deaths).toFixed(2)
						});
					}

					message.channel.send({
						embed: {
							color: 3447003,
							title: '💀 Kills Scoreboard',
							description: "Top 10 Killers de Pecado GangWars",
							fields: preparedScoreboard,
							thumbnail: {
								url: 'https://i.imgur.com/SfxPwfL.png',
							},
						}
					});
				}
			});
		} else {
			console.log('No ha pasado una hora, devolvemos respuesta anterior');
			message.channel.send({embed: {
					color: 3447003,
					description: "💀 Kills Scoreboard",
					fields: preparedScoreboard,
				}
			});
		}
	},
};