//set default language
var lang = 'fr';

//list of pages
var pages = ['bio', 'skills', 'projects', 'perso', 'contact'];
var noMdPages = ['skills'];
var homePage = 'bio';

//load pages content
function loadPage(pageName) {
	//get page format and location
	var pageFormat = (noMdPages.indexOf(pageName) === -1) ? 'md' : 'html';
	var uri = 'pages/' + lang + '/' + pageName + '.' + pageFormat;
	var section = $('section');
	
	$.get(uri, {}, function (content) {
		//display and parse markdown if necessary
		section.html(content);
		if (pageFormat === 'md') {
			var article = $('article.' + lang + '.' + pageName);
			article.html(markdown.toHTML(article.html(), 'Maruku'));
		}

		//next page link
		if (pages.indexOf(pageName) !== (pages.length - 1)) {
			section.append('<a href="#next">' + ((lang === 'fr') ? 'page suivante' : 'next page') + ' &rarr;</a>');
			$('a[href="#next"]').click(function () {
				loadPage(pages[pages.indexOf(pageName) + 1]);
			});
		}
	}, 'text');

	//update current in menu
	$('nav a').removeClass('curMenu');
	$('nav a[href="#' + pageName + '"]').addClass('curMenu');
}
loadPage(homePage);

//menu links
$('nav a').click(function (e) {
	var tab = e.target.href.split('#');
	var current = tab[tab.length - 1];
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

