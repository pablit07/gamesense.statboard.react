window.PlayerUseOverTimeWelcomeChart = zoid.create({

    // The html tag used to render my component

    tag: 'team-player-drills-chart',

    // The url that will be loaded in the iframe or popup, when someone includes my component on their page

    url: '/XDomain/TeamPlayerDrillsChart/',

    props: {
    	username: {
    		type: 'string',
    		required: true,
    	},
    	app: {
    		type: 'string',
    		required: true
    	},
    	token: {
    		type: 'string',
    		required: true
    	},
		userId: {
    		type: 'number',
			required: false
		}
    }
});