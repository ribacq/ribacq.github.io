//content vars
var lang = "fr";

//page structure
var menu = $("nav #datamenu")[0];
var content = $("section")[0];

//display function
function display(name) {
	$('nav [href="#' + name + '"]')[0].innerHTML = data[name].nav[lang];
	$("#" + name)[0].innerHTML = markdown.toHTML(data[name][lang], 'Maruku');
}

//calls
for (name in data) {
	menu.innerHTML += '<a href="#' + name + '"></a>';
	content.innerHTML += '<article id="' + name + '"></article>';
	display(name);
}

//translate button
var tslLink = $('a[href="#translate"]');
tslLink[0].innerText = "View in English";
tslLink.click(function () {
	lang = (lang === "fr") ? "en" : "fr";
	this.innerText = (lang === "fr") ? "View in English" : "Voir en français";
	for (name in data) {
		display(name);
	}
});

//footer button animation
$('footer a').click(function () {
	$('html, body').animate({
		scrollTop: 0
	});
});

$(window).scroll(function () {
	if ($(window).scrollTop() > 50) {
		$('nav').css({'position': 'fixed', 'top': 0});
	} else {
		$('nav').css({'position': 'relative'});
	}
});

