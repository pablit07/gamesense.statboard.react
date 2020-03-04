window.DrillBreakdown = zoid.create({

    // The html tag used to render my component

    tag: 'horizontal-quartile-chart',

    // The url that will be loaded in the iframe or popup, when someone includes my component on their page

    url: '/XDomain/HorizontalQuartileChart/',

    props: {
    	q1: {
    		type: 'number',
    		required: true,
    	},
    	median: {
    		type: 'number',
    		required: true
    	},
    	q3: {
			type: 'number',
			required: true
		},
		max: {
			type: 'number',
			required: true
		},
		userScore: {
			type: 'number',
			required: true
		},
		textColor: {
			type: 'string',
			required: false
		}
    }
});