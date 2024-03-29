const TCPPortCheck = require('tcp-port-check')

module.exports = {
	name: 'server',
	description: 'Estado del servidor',
	execute(message, args) {
        let checker = new TCPPortCheck({
            getBanner: 512
        })
        checker.check('193.70.80.173', 2445).on('done', (ip, port, result) => {
                console.log(ip, port, result)
                let statusResult = result.opened ? 'ONLINE' : 'OFFLINE';
                message.channel.send({embed: {
                    color: 3447003,
                    fields: [{
                        name: "📌 Estado del servidor:",
                        value: statusResult
                      },
                    ],
                  }
                });
        })

	},
};