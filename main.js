var lang = 'fr';

//markdown setup
$('article:not(.nomd)').html(function () {
	return markdown.toHTML(this.innerHTML, 'Maruku');
});

//menu links
$('nav a').click(function (e) {
	var tab = e.target.href.split('#');
	var current = tab[tab.length - 1];
	$('nav a').removeClass('curMenu');
	$('nav a[href="#' + current + '"]').addClass('curMenu');
	$('article.current.' + lang).removeClass('current');
	$('article.' + current + '.' + lang).addClass('current');
});

//translation
$('a[href="#translate"]').click(function () {
	//get current article class
	var currentArticle = $('article.current');
	var currentClass = currentArticle.attr('class').split(' ')[0];

	//remove current classes
	currentArticle.removeClass('current');
	$('div.menu.' + lang).removeClass('current');

	//switch language
	lang = (lang === 'fr') ? 'en' : 'fr';

	//display translation
	$('article.' + currentClass + '.' + lang).addClass('current');
	$('div.menu.' + lang).addClass('current');
});

//top link animation
$('a[href="#top"]').click(function () {
	$('html, body').animate({
		scrollTop: 0
	});
});

