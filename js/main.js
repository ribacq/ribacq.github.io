//set default language
var lang = 'fr';

//list of pages
var pages = {
	bio: 'md',
	skills: 'html',
	projects: 'md',
	perso: 'md',
	contact: 'md'
};
var homePage = 'bio';

//load pages content
function loadPage(pageName) {
	var pageFormat = pages[pageName];
	var uri = 'pages/' + lang + '/' + pageName + '.' + pageFormat;
	var section = $('section');
	$.get(uri, {}, function (content) {
		section.html(content);
		if (pageFormat === 'md') {
			var article = $('article.' + lang + '.' + pageName);
			article.html(markdown.toHTML(article.html(), 'Maruku'));
		}
	}, 'text');
}
loadPage(homePage);

//menu links
$('nav a').click(function (e) {
	var tab = e.target.href.split('#');
	var current = tab[tab.length - 1];
	$('nav a').removeClass('curMenu');
	$('nav a[href="#' + current + '"]').addClass('curMenu');
	loadPage(current);
});

//translation
$('a[href="#translate"]').click(function () {
	//get current article class
	var currentArticle = $('article');
	var currentClass = currentArticle.attr('class').split(' ')[0];

	//remove current classes
	$('div.menu.' + lang).removeClass('current');

	//switch language
	lang = (lang === 'fr') ? 'en' : 'fr';

	//display translation
	loadPage(currentClass);
	$('div.menu.' + lang).addClass('current');
});

//top link animation
$('a[href="#top"]').click(function () {
	$('html, body').animate({
		scrollTop: 0
	});
});

