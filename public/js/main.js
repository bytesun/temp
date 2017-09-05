require.config({
	paths: {
		underscore: '../assets/lib/underscore/underscore',
		backbone: '../assets/lib/backbone/backbone',
		marionette: '../assets/lib/backbone.marionette/lib/backbone.marionette',
		jquery: '../assets/lib/jquery/jquery',
		localStorage: '../assets/lib/backbone.localStorage/backbone.localStorage',
		tpl: '/assets/lib/tpl',
        bootstrap: '/assets/lib/bootstrap.min'
	},

	shim: {
		underscore: {
			exports: '_'
		},

		backbone: {
			exports: 'Backbone',
			deps: ['jquery', 'underscore']
		},

		marionette: {
			exports: 'Backbone.Marionette',
			deps: ['backbone']
		},

        bootstrap: {
            deps: ['jquery']
        }

	},
    waitSeconds: 60
});

require([
	'app',
    'modules/Pages',
    'jquery',
	'bootstrap'
], function (app, PagesModule) {
	'use strict';

    app.addInitializer(function() {
        PagesModule.start();
    });

	app.start();
});
