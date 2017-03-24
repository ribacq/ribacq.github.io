/*
//content default vars
var lang = "fr";
var pages = ['bio', 'projects', 'perso'];
data = {fr: {}, en: {}};
var current = 'bio';

//page structure
var menu = $('nav div#datamenu');
var content = $('article');

//display functions
function dispMenu() {
	menu.empty();
	for (i in pages) {
		//menu.append('<a href="#' + pages[i] + '">' + data[lang][pages[i]].nav + '</a>');
		menu.append('<a href="#' + pages[i] + '">' + i + '</a>');
	}
}
dispMenu();

function dispContent() {
	content.html(markdown.toHTML(data[lang][current].data, 'Maruku'));
}
//dispContent();

//menu links
let linkFunc = function (e) {
	$.get('data/' + lang + '/' + pages[i] + '.md', function (d) {
		data[lang][pages[i]] = {
			nav: d.firstChild.children[0].innerHTML,
			data: d.firstChild.children[1].innerHTML
		};
		dispContent();
		dispMenu();
	});
};
for (name in data) {
	$('a[href="#' + name + '"]').click(linkFunc);
}
//*/

var lang = 'fr';

//markdown setup
$('article').html(function () {
	return markdown.toHTML(this.innerHTML, 'Maruku');
});

//menu links
$('div.menu.' + lang).css('display', 'block');
$('div.menu.' + lang + ' nav a').click(function (e) {
	var tab = e.target.href.split('#');
	var current = tab[tab.length - 1];
	$('article.current.' + lang).removeClass('current');
	$('article.' + current + '.' + lang).addClass('current');
});

//translation
$('a[href="#translate"]').click(function () {
	//get current article class
	var currentArticle = $('article.current');
	var currentClass = currentArticle.attr('class').replace(lang, '').replace('current', '').trim();

	//remove current classes
	currentArticle.removeClass('current');
	$('div.menu').removeClass('current');

	//switch language
	lang = (lang === 'fr') ? 'en' : 'fr';

	//display translation
	$('article.' + currentClass + '.' + lang).addClass('current');
	$('div.menu.' + lang).addClass('current');
});

//footer button animation
$('footer a').click(function () {
	$('html, body').animate({
		scrollTop: 0
	});
});

//menu sticked to top
$(window).scroll(function () {
	if ($(window).scrollTop() > 50) {
		$('div.menu').css({'position': 'fixed', 'top': 0});
	} else {
		$('div.menu').css({'position': 'relative'});
	}
});

