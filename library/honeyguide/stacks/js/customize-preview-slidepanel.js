/**
 * Customizer Previewer SlidePanel
 */
(function(wp, $, _) {
	"use strict";

	if (!wp || !wp.customize) {
		return;
	}

	var api = wp.customize;
	var sRev;
	var OldPreview;
	var renderEmberOnce = false;

	api.slidePanel = {
		// Init
		init: function() {

			$('body').append($('<div id="slider" class="oneLiners container" style="border-right:1px solid #aaa;">Hello World!!</div>'));
			sRev = $('#slider');
			$(sRev).append('<div id="emberArea"></div>');
			$(sRev).append('<div id="queryArea"></div>');
			sRev = $('#queryArea');

			this.preview.bind('honeypot', function(data) {

					sRev.slideReveal({
						autoEscape: true,
						width: 500,
						speed: 700
					});
					lsbridge.send('emberBridge', { cmd: 'boot' });
console.log('sent command.');
					if(data.panel != '') {
						sRev.append(data.content).slideReveal(data.panel);
						api.slidePanel.createOneLiner(sRev, data.liner, data.andor, api.slidePanel.generateUid(), data.ember);

						if(data.ember != '' && !renderEmberOnce) {
							// moves the emberview into the slider area
							$('body').find('#emberArea').css('border', '1px solid #a33').css('height',20).css('width','400');
							$(data.ember).appendTo($('#slider'));
							renderEmberOnce = true;
						}
					}
			});

		},
		generateUid: function(separator) {
			var delim = separator || "-";
			delim = "";

			function S4() {
				return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
			}

			return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
		},
		switchingAndOr: function(liner) {},
		dropdowns: function(liner) {
			$(liner).find('.ddLeft ul li a').on('click', function(e) {
				e.preventDefault();
				$(this).parents('span.dropdown').children('button').text($(this).text());
				if ($(this).hasClass('type_choices')) {
					alert(_.trim($(this).attr('alt'), '][*+'));
				}
			});
			$(liner).find('.ddMid ul li a').on('click', function(e) {
				e.preventDefault();
				$(this).parents('span.dropdown').children('button').text($(this).text());
			});
			$(liner).find('.ddRight ul li a').on('click', function(e) {
				e.preventDefault();
				$(this).parents('span.dropdown').children('button').text($(this).text());
			});
		},
		createAndOr: function(sRev, andor, grpid) {
			$(andor).attr('alt', grpid).appendTo($(sRev));
			$('div.row[alt="' + grpid + '"]').find('.andor').on('click', function(e) {
				e.preventDefault();
				if ('AND' == $(this).attr('alt')) {
					$(this).text('OR ').append('<span class="glyphicon glyphicon-link"></span>');
					$(this).attr('alt', 'OR');
				} else if ('OR' == $(this).attr('alt')) {
					$(this).text('AND ').append('<span class="glyphicon glyphicon-link"></span>');
					$(this).attr('alt', 'AND');
				}
			});
		},
		createOneLiner: function(sRev, liner, andor, grpid) {
			$(liner).attr('alt', grpid).appendTo($(sRev));
			$('body').contents().find('.oneLinerButton').on('click', function(e) {
				if ('-' == $(this).text()) {
					$('body').contents().find('div[alt="' + $(this).parents('.row').attr('alt') + '"]').remove();
				} else if ('+' == $(this).text()) {

					api.slidePanel.createAndOr(sRev, andor, grpid);

					api.slidePanel.createOneLiner(sRev, liner, andor, api.slidePanel.generateUid());
					$('body').contents().find('.oneLinerButton').removeClass('btn-primary').addClass('btn-danger').text('-');
					$('body').contents().find('.oneLinerButton:last').removeClass('btn-danger').addClass('btn-primary').text('+');
				}
			});
			$(".dropdown-toggle").dropdown();

			api.slidePanel.dropdowns($('div.ddrow[alt="' + grpid + '"]'));
		}

	};
	OldPreview = api.Preview;
	api.Preview = OldPreview.extend({
		initialize: function(params, options) {
			api.slidePanel.preview = this;
			OldPreview.prototype.initialize.call(this, params, options);
		}
	});

	$(function() {
		api.slidePanel.init();
	});
})(window.wp, jQuery, _);