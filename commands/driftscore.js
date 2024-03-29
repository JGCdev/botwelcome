var connection  = require('../database');

let latestUsersRequest = new Date() - 600000;
const REQ_TIME_BETWEEN_CALLS = 10 * 60 * 1000; // 10 Min
let preparedScoreboard = [];

module.exports = {
	name: 'driftscore',
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
					rows.sort((a, b) => b.drift - a.drift);
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
							value: rows[i].drift
						});
					}

					message.channel.send({
						embed: {
							color: 3447003,
							title: '🏎️ Drift Scoreboard',
							description: "Top 10 Drifters de Pecado GangWars",
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
					description: "🏎️ Drift Scoreboard",
					fields: preparedScoreboard,
				}
			});
		}
	},
};