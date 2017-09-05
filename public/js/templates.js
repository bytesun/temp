/*global define */

define(function (require) {
	'use strict';

	return {
        pages : {
          home: require('tpl!templates/pages/home.html'),
          me: require('tpl!templates/pages/me.html')
          
        },
        page: require('tpl!templates/page.html'),
        menuItem: require('tpl!templates/menuItem.html'),
		footer: require('tpl!templates/footer.html')
	};
});

