// Get Color From Local Storage

let color = window.localStorage.getItem("accent-color");
if (color !== null) {
	document.documentElement.style.setProperty("--main-color", color);
	document.querySelector(
		`.settings-box .settings-container div.select-color li[data-color="${color}"]`
	).style.border = "2px solid white";
}
// Change Color Of Color Selector

document
	.querySelectorAll(".settings-box .settings-container div.select-color li")
	.forEach((element) => {
		element.style.backgroundColor = element.dataset.color;
		element.onclick = function () {
			document
				.querySelectorAll(
					".settings-box .settings-container div.select-color li"
				)
				.forEach((ele) => (ele.style.border = "none"));
			element.style.border = "2px solid white";
			window.localStorage.setItem("accent-color", element.dataset.color);
			document.documentElement.style.setProperty(
				"--main-color",
				element.dataset.color
			);
		};
	});

// Change Backgrounds
let backgroundOption = window.localStorage.getItem("background-option");
let backgroundInterval;

let spansOne = document.querySelectorAll(
	".settings-box .settings-container div:nth-child(2)>.yes-or-no span"
);

spansOne.forEach((ele) => {
	ele.onclick = function () {
		spansOne.forEach((ele) => ele.classList.remove("active"));
		ele.classList.add("active");
		if (ele.classList.contains("no")) {
			backgroundOption = false;
			localStorage.setItem("background-option", false);
			clearInterval(backgroundInterval);
		} else {
			backgroundOption = true;
			localStorage.setItem("background-option", true);
			backgroundInterval = setInterval(() => {
				let random = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
				landing.style.backgroundImage = `url(../imgs/0${random}.jpg)`;
				delete random;
			}, 5000);
		}
	};
});
let landing = document.querySelector(".landing");
if (backgroundOption === "true") {
	spansOne.forEach((ele) => {
		ele.classList.remove("active");
		if (ele.classList.contains("yes")) ele.classList.add("active");
	});

	backgroundInterval = setInterval(() => {
		let random = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
		landing.style.backgroundImage = `url(../imgs/0${random}.jpg)`;
		delete random;
	}, 5000);
} else {
	spansOne.forEach((ele) => {
		ele.classList.remove("active");
		if (ele.classList.contains("no")) ele.classList.add("active");
	});
}

// Menu Navgition
document.querySelector(".landing header .menu").onclick = function (event) {
	event.stopPropagation();

	this.classList.toggle("active");
};

addEventListener(
	"click",
	function (event) {
		if (
			!event.target.matches(".landing header .menu+ul")&&
			!event.target.matches(".landing header .menu")
		) {
			document.querySelector(".landing header .menu").classList.remove("active")
		}
	}
)


// Open And Close SideBar
document.querySelector(".settings-box .open-button ").onclick = function () {
	document.querySelector(".settings-box ").classList.toggle("open");
	document
		.querySelector(".settings-box .open-button i")
		.classList.toggle("fa-spin");
		document.body.classList.toggle("remove-scrolling")
};

addEventListener("click", function (event) {
	if (
		!event.target.matches(".settings-box *:not(.reset)") &&
		!event.target.matches(".settings-box") &&
		this.document.querySelector(".settings-box").classList.contains("open")
	) {
		document
			.querySelector(".settings-box .open-button i")
			.classList.remove("fa-spin");
		this.document.body.classList.remove("remove-scrolling")
		this.document.querySelector(".settings-box").classList.remove("open");
	}
});
// Show Bullets

let spansTwo = document.querySelectorAll(
	".settings-box .settings-container div:nth-child(3)>.yes-or-no span"
);
let bulletsOption = localStorage.getItem("show-bullets");

if (bulletsOption === "false") {
	spansTwo.forEach((ele) => {
		ele.classList.remove("active");
		if (ele.classList.contains("no")) {
			ele.classList.add("active");
		}
	});
	document.querySelector(".nav ").style.display = "none";
}
 else {
	spansTwo.forEach((ele) => {
		ele.classList.remove("active");
		if (ele.classList.contains("yes")) {
			ele.classList.add("active");
		}
	});
	document.querySelector(".nav ").style.display = "block";
}

spansTwo.forEach((ele) => {
	ele.onclick = function () {
		spansTwo.forEach((ele) => ele.classList.remove("active"));
		ele.classList.add("active");
		if (ele.classList.contains("yes")) {
			document.querySelector(".nav ").style.display = "block";
			localStorage.setItem("show-bullets", "true");
		} else {
			document.querySelector(".nav ").style.display = "none";
			localStorage.setItem("show-bullets", "false");
		}
	};
});

// Reset Options

document.querySelector(".reset").onclick = function () {
	window.localStorage.setItem("accent-color", "#FF9800");
	document.documentElement.style.setProperty("--main-color", "#FF9800");
	document
		.querySelectorAll(".settings-box .settings-container div.select-color li")
		.forEach((ele) => {
			ele.style.border = "none";
			if (ele.dataset.color === "#FF9800") {
				console.log(ele);
				ele.style.border = "2px solid white";
			}
		});

	window.localStorage.setItem("background-option", "true");
	spansOne.forEach((ele) => {
		ele.classList.remove("active");
		if (ele.classList.contains("yes")) ele.classList.add("active");
	});
	backgroundInterval = setInterval(() => {
		let random = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
		landing.style.backgroundImage = `url(../imgs/0${random}.jpg)`;
		delete random;
	}, 5000);

	window.localStorage.setItem("show-bullets", "true");
	spansTwo.forEach((ele) => {
		ele.classList.remove("active");
		if (ele.classList.contains("yes")) {
			ele.classList.add("active");
		}
	});
	document.querySelector(".nav ").style.display = "block";
};
