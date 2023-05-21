function validateForm() {
	"use strict"
	const forms = document.querySelectorAll(".requires-validation")
	Array.from(forms).forEach(function(form) {
		form.addEventListener("submit", function(event) {
			if (!form.checkValidity()) {
				event.preventDefault()
				event.stopPropagation()
			}
				
			form.classList.add("was-validated")
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
	$("img.colorModeImage").each(function() {
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
$(".collapse").each(function() {
	$(this).on("shown.bs.collapse", function() {
		this.scrollIntoView();
	});
});

function planTooltip() {
	const plan = $("#plan");
	const tooltip = $("#tooltip");
	const scaleWidth = 1558 / plan.width();
	const scaleHeight = 936 / plan.height();

	const points = [
		{"x": 250, "y": 420, "title": "Parking", "color": "white", "icon": "bi-p-square-fill", "placement": "bottom"},
		{"x": 250, "y": 355, "title": "Toilettes", "color": "black", "icon": "bi-badge-wc-fill", "placement": "top"},
		{"x": 560, "y": 430, "title": "Piscine", "color": "white", "icon": "bi-geo-alt-fill", "placement": "top"},
		{"x": 1070, "y": 40, "title": "D101 (route secondaire)", "color": "white", "icon": "bi-geo-alt-fill", "placement": "bottom"}
	];

	$.each(points, function(index, point) {
		$("#tooltips").append(`<i class="bi ${point["icon"]} tooltip-button text-${point["color"]}" style="left: ${plan.offset()["left"] + point["x"] / scaleHeight}px;top: ${plan.offset()["top"] + point["y"] / scaleWidth}px;font-size: 1.7em;" data-bs-toggle="tooltip" data-bs-placement="${point["placement"]}" data-bs-title="${point["title"]}"></i>`)
	});
}

function randomReOrder() {
	$.each(document.querySelectorAll("#cards-activities .card"), function(index, card) {
		let insertIndex = Math.floor(Math.random() * document.querySelectorAll("#cards-activities .card").length);
		card.remove();
		$(card).insertAfter($(`.card-activity:nth-child(${insertIndex})`));
	});
}