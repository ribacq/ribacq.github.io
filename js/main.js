//set default language
let lang = 'fr';

//list of pages
let pages = ['bio', 'skills', 'projects', 'perso', 'contact'];
let noMdPages = ['skills'];
let homePage = 'bio';

//load pages content
let mdConverter = new showdown.Converter();
function loadPage(pageName) {
	//get page format and location
	let pageFormat = (noMdPages.indexOf(pageName) === -1) ? 'md' : 'html';
	let uri = 'pages/' + lang + '/' + pageName + '.' + pageFormat;
	let section = $('section');
	
	$.get(uri, {}, function (content) {
		//display and parse markdown if necessary
		section.html(content);
		if (pageFormat === 'md') {
			let article = $('article.' + lang + '.' + pageName);
			article.html(mdConverter.makeHtml(article.html()));
		}

		//next page link
		if (pages.indexOf(pageName) !== (pages.length - 1)) {
			section.append('<a href="#next">' + ((lang === 'fr') ? 'page suivante' : 'next page') + ' &rarr;</a>');
			$('a[href="#next"]').click(function () {
				loadPage(pages[pages.indexOf(pageName) + 1]);
			});
		}

		//update current in menu
		$('nav a').removeClass('curMenu');
		$('nav a[href="#' + pageName + '"]').addClass('curMenu');

		//scroll back to top
		$('html, body').scrollTop(0);
	}, 'text');
}
loadPage(homePage);

//menu links
$('nav a').click(function (e) {
	let tab = e.target.href.split('#');
	let current = tab[tab.length - 1];
	loadPage(current);
});

//translation
$('a[href="#translate"]').click(function () {
	//get current article class
	let currentArticle = $('article');
	let currentClass = currentArticle.attr('class').split(' ')[0];

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

