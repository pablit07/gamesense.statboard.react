window.DrillBreakdown = zoid.create({

    // The html tag used to render my component

    tag: 'drill-breakdown',

    // The url that will be loaded in the iframe or popup, when someone includes my component on their page

    url: 'http://localhost:3000/XDomain/DrillBreakdown/',

    props: {
    	username: {
    		type: 'string',
    		required: true,
    		decorate(original) {
		        return function() {
		            console.info('decorator', arguments);
		            return original.apply(this, arguments);
		        };
		    }
    	},
    	app: {
    		type: 'string',
    		required: true
    	},
    	token: {
    		type: 'string',
    		required: true
    	},
    }
});