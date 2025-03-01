// Change Backgrounds

let landing = document.querySelector(".landing");
setInterval(() => {
	let random =  Math.floor(Math.random() * (5 - 1 + 1)) + 1;;
	console.log(random);
	landing.style.backgroundImage = `url(../imgs/0${random}.jpg)`;
	delete random;
}, 5000);
