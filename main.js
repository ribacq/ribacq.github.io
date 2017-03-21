//content vars
var lang = "fr";

//page structure
var menu = $("nav")[0];
var content = $("section")[0];

//content list
var names = ["bio", "projects"];

names.forEach(function (name) {
	menu.innerHTML += '<a href="#' + name + '">' + data[name].nav[lang] + '</a>';
	content.innerHTML += '<article id="' + name + '"></article>';
});

//display function
function display(name) {
	$("#" + name)[0].innerHTML = markdown.toHTML(data[name][lang]);
}

//calls
names.forEach(display);

//translate button
var tslLink = $("#translate")[0];
tslLink.innerText = "View in English";
tslLink.addEventListener("click", function () {
	lang = (lang === "fr") ? "en" : "fr";
	this.innerText = (lang === "fr") ? "View in English" : "Voir en français";
	names.forEach(display);
});

