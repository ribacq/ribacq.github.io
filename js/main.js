//set default language
let langs = ['fr', 'en'];
let lang = 'fr';

//list of pages
let pages = ['bio', 'skills', 'studies', 'projects', 'perso'];
let noMdPages = ['skills'];
let homePage = 'bio';

//load pages content
let mdConverter = new showdown.Converter();
function loadPage(pageName) {
	//get page format and location
	let pageFormat = (noMdPages.indexOf(pageName) === -1) ? 'md' : 'html';
	let uri = 'pages/' + pageName + '.' + pageFormat;
	let section = $('section');
	
	$.get(uri, {}, function (content) {
		//display and parse markdown if necessary
		section.html(content);
		if (pageFormat === 'md') {
			let articles = $('article.' + pageName);
			for (i in articles) {
				articles[i].innerHTML = mdConverter.makeHtml(articles[i].innerHTML);
			}
		}

		//next page link
		if (pages.indexOf(pageName) !== (pages.length - 1)) {
			section.append('<a href="#next"><span class="fr">page suivante</span><span class="en">next page</span> &rarr;</a>');
			$('a[href="#next"]').click(function () {
				loadPage(pages[pages.indexOf(pageName) + 1]);
			});
		}

		//update current in menu
		$('nav a').removeClass('curMenu');
		$('nav a[href="#' + pageName + '"]').addClass('curMenu');

		//scroll back to top
		$('html, body').scrollTop(0);

		//display current lang only
		setLang(lang);
	}, 'text');
}
loadPage(homePage);

//menu links
$('nav a').click(function (e) {
	loadPage($(this).attr('href').substr(1));
});

//translation
function setLang(lang) {
	for (i in langs) {
		$('.' + langs[i]).hide();
	}
	$('.' + lang).show();
}

$('a[href|="#translate"]').click(function (){
	lang = $(this).attr('href').split('-')[1];
	setLang(lang);
});
setLang(lang);

//top link animation
$('a[href="#top"]').click(function () {
	$('html, body').animate({
		scrollTop: 0
	});
});

