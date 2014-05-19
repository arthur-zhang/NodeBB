var admin = {};

(function() {
	var canvas,
		menu;


	var windows = {
		opened: []
	};

	windows.init = function() {

	};

	windows.open = function(el) {
		if (!el instanceof $) {
			el = $('[data-page="' + el + '"]');
		}

		if (!el.length) {
			console.error('Page does not exist: ' + el);
			return false;
		}

		var page = el.attr('data-page'),
			arrIndex = windows.opened.indexOf(page);

		if (arrIndex === -1 || !el.hasClass('selected')) {
			windows.opened.push(page);
			$('#menu .item').removeClass('selected');
			el.addClass('selected active');
		} else {
			windows.opened = windows.opened.splice(arrIndex, 1);
			el.removeClass('selected active');
		}
	};


	function onConnect() {
		$('#profile').addClass('active').children('.avatar').attr('src', app.userpicture);
	}

	$(function() {
		canvas = canvas || $('#canvas');
		menu = menu || $('#menu');

		$('#menu .title').on('click', function() {
			$(this).parent().toggleClass('active');
		});

		$('#menu .item').on('click', function() {
			windows.open($(this));
		});

		/*templates.registerLoader(function(template, callback) {
			if (templates.cache[template]) {
				callback(templates.cache[template]);
			} else {
				$.ajax({
					url: RELATIVE_PATH + '/templates/' + template + '.tpl' + (config['cache-buster'] ? '?v=' + config['cache-buster'] : ''),
					type: 'GET',
					success: function(data) {
						callback(data.toString());
					},
					error: function(error) {
						throw new Error("Unable to load template: " + template + " (" + error.statusText + ")");
					}
				});
			}
		});*/

		$(window).on('action:connected', onConnect);

		windows.init();
	});
}());