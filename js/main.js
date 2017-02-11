//$('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); });
//$('.dropdown-menu a').on('touchstart', function(e) {
//	e.stopPropagation();
//});

$(document).ready(function() {
	//$("#loadContent > .inner").load("/titan.inc.html");
	$(".dropdown .nav li:first").addClass("active");
	var links = $(".dropdown .nav li");
	links.each(function(e) {
		var file = $(this).find('a').attr('id') + '.inc.html';
		$(this).on('mouseover touchstart click', function(e) {
			e.stopPropagation();
			//for (var i = 0; i < links.length; i++) {
			//	links[i].parentNode.className = '';
			//}
			//var element = e.currentTarget;
			//element = $(element);
			//element.parent().addClass("active");
			links.removeClass("active");
			if (!$(this).hasClass("active")) {
				$(this).addClass("active");
				$(".inner").hide().fadeIn("slow");
				$("#loadContent > .inner").load('/' + file);
			}
			return false;	
		});
	});
});