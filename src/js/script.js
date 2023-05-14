function validateForm() {
	'use strict'
	const forms = document.querySelectorAll('.requires-validation')
	Array.from(forms).forEach(function(form) {
		form.addEventListener('submit', function(event) {
			if (!form.checkValidity()) {
				event.preventDefault()
				event.stopPropagation()
			}
				
			form.classList.add('was-validated')
		}, false)
	});
}

function getColorMode() {
	if (localStorage.getItem("colorMode") && localStorage.getItem("colorMode") != "auto") {
		colorMode = localStorage.getItem("colorMode");
	} else {
		if (window.matchMedia && window.matchMedia("(prefers-color-scheme:light)").matches) {
			colorMode = "light";
		} else {
			colorMode = "dark";
		}
	}
	return colorMode;
}
function applyColorMode() {
	var colorMode = localStorage.getItem("colorMode");
	
	if (colorMode == "light") {
		$("#colorMode-button").html("<i class=\"bi bi-brightness-high-fill\"></i>");
		$("#colorMode-light").addClass("active");
		$("#colorMode-dark").removeClass("active");
		$("#colorMode-auto").removeClass("active");
	} else if (colorMode == "dark") {
		$("#colorMode-button").html("<i class=\"bi bi-moon-stars-fill\"></i>");
		$("#colorMode-dark").addClass("active");
		$("#colorMode-light").removeClass("active");
		$("#colorMode-auto").removeClass("active");
	} else {
		$("#colorMode-button").html("<i class=\"bi bi-circle-half\"></i>");
		$("#colorMode-auto").addClass("active");
		$("#colorMode-light").removeClass("active");
		$("#colorMode-dark").removeClass("active");
	}
	
	
	colorMode = getColorMode();
	
	$("body").attr("data-bs-theme", colorMode);
	$(".carousel").attr("data-bs-theme", "light");
	
	//Change images if needed
	$('img.colorModeImage').each(function() {
		if (colorMode == "light") {
			$(this).attr("src", $(this).attr("src").replace("dark", "light"));
		} else {
			$(this).attr("src", $(this).attr("src").replace("light", "dark"));
		}
	});
}
function changeColorMode(colorMode) {
	localStorage.setItem("colorMode", colorMode);
	applyColorMode();
}

//Scrolling
$('.collapse').each(function() {
	$(this).on('shown.bs.collapse', function () {
		this.scrollIntoView();
	});
});