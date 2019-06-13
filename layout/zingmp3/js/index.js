var slideIndex = 1;
showSlides(slideIndex);

function showSlide(n){
	var i;
	var slides = document.getElementByClassName("mySlides");
	
	if (n > slides.length) {
		slideIndex = 1;
	}	
	if (n < 1) {
		slideIndex = slides.length;
	}
	for (i=0; i < slides.length; i++){
		slides[i].style.display = "none";
	}
	slides[slideIndex-1].style.display = "block";
}

function startTime(){
	var today = new Date();
	var y = today.getFullYear();
	var month = today.getMonth() + 1;
	var day = today.getDate();
	var h = today.getHours();
	var m = today.getMinutes();
	m = checkTime(m);
	h = checkTime(h);
	month = checkTime(month);
	document.getElementById('txt').innerHTML = day + "/" + month + "/" + y + "  " + h + ":" + m;
	var t = setTimeout(startTime, 500);
}
function checkTime(i){
	if(i < 10) {i = "0" +i};
	return i;
}