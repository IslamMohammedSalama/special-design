// Get Color From Local Storage

let color = window.localStorage.getItem("accent-color");
if (color !== null) {
	document.documentElement.style.setProperty("--main-color", color);
	document.querySelector(
		`.settings-box .settings-container div.select-color li[data-color="${color}"]`
	).style.border = "5px solid white";
}else {
	document.querySelector(
		`.settings-box .settings-container div.select-color li[data-color="#FF9800"]`
	).style.border = "5px solid white";
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
			element.style.border = "5px solid white";
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

function randomBackgrounds() {
	return setInterval(() => {
		let random = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
		landing.style.backgroundImage = `url(imgs/0${random}.jpg)`;
		delete random;
	}, 5000);
}

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
			backgroundInterval = randomBackgrounds()
		}
	};
});

let landing = document.querySelector(".landing");
if (backgroundOption === "true") {
	spansOne.forEach((ele) => {
		ele.classList.remove("active");
		if (ele.classList.contains("yes")) ele.classList.add("active");
	});

	backgroundInterval = randomBackgrounds()
} else if (backgroundOption === "false") {
	spansOne.forEach((ele) => {
		ele.classList.remove("active");
		if (ele.classList.contains("no")) ele.classList.add("active");
	});
} else {
	spansOne.forEach((ele) => {
		ele.classList.remove("active");
		if (ele.classList.contains("yes")) ele.classList.add("active");
	});

	backgroundInterval = randomBackgrounds()
}

// Menu Navgition
document.querySelector(".landing header .menu").onclick = function (event) {
	event.stopPropagation();

	this.classList.toggle("active");
};

addEventListener("click", function (event) {
	if (
		!event.target.matches(".landing header .menu+ul") &&
		!event.target.matches(".landing header .menu")
	) {
		document.querySelector(".landing header .menu").classList.remove("active");
	}
});

// Open And Close SideBar
document.querySelector(".settings-box .open-button ").onclick = function () {
	document.querySelector(".settings-box ").classList.toggle("open");
	document
		.querySelector(".settings-box .open-button i")
		.classList.toggle("fa-spin");
	document.body.classList.toggle("remove-scrolling");
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
		this.document.body.classList.remove("remove-scrolling");
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
} else {
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
			if (ele.dataset.color === "#FF9800") {
				console.log(ele);
				ele.style.border = "5px solid white";
			} else {
				ele.style.border = "none";
			}
		});

	window.localStorage.setItem("background-option", "true");
	spansOne.forEach((ele) => {
		ele.classList.remove("active");
		if (ele.classList.contains("yes")) ele.classList.add("active");
	});
	backgroundInterval = randomBackgrounds()


	window.localStorage.setItem("show-bullets", "true");
	spansTwo.forEach((ele) => {
		ele.classList.remove("active");
		if (ele.classList.contains("yes")) {
			ele.classList.add("active");
		}
	});
	document.querySelector(".nav ").style.display = "block";
};

// Show Popup For User on Click Any Image From Gallery

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

document.querySelectorAll(".gallery .imgs-box img").forEach(function (img) {
	img.onclick = async function () {
		let overlay = document.createElement("div");
		document.body.append(overlay);
		let popup = document.createElement("div");
		document.body.append(popup);
		let h3 = document.createElement("h3");
		h3.innerText = img.alt;
		popup.append(h3);
		let ourImg = document.createElement("img");
		ourImg.src = img.src;
		popup.append(ourImg);
		let closeBtn = document.createElement("span");
		closeBtn.textContent = "X";
		popup.append(closeBtn);
		document.body.classList.add("remove-scrolling");

		overlay.className = "popup-overlay";
		popup.className = "popup";
		closeBtn.className = "close-button";
		await delay(0);
		popup.style.opacity = "1";
		overlay.style.opacity = "1";
		closeBtn.onclick = async function (event) {
			popup.style.opacity = "0";
			overlay.style.opacity = "0";
			await delay(250);
			overlay.remove();
			popup.remove();
			document.body.classList.remove("remove-scrolling");
		};
		overlay.onclick = async function (event) {
			popup.style.opacity = "0";
			overlay.style.opacity = "0";
			await delay(250);
			overlay.remove();
			popup.remove();
			document.body.classList.remove("remove-scrolling");
		};
	};
});

// Add Animation On Scrollin to Progresss

let skills = document.querySelector(".skills");

window.onscroll = function () {
	let skillsOffSet = skills.offsetTop;
	let skillsOuterHeight = skills.offsetHeight;
	let windowHeight = this.innerHeight;
	let windowScrollTop = this.scrollY;
	if (windowScrollTop > skillsOffSet + skillsOuterHeight - windowHeight) {
		console.log("Yes");
		document
			.querySelectorAll(".skills span")
			.forEach((span) => (span.style.width = span.dataset.width));
	}
};
