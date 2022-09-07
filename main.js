const message = document.querySelector('.message');
const ourImg = document.querySelector('#our-img');
const loading = document.querySelector('#loading');
const btnPlay = document.querySelector('#btn-play');
const btnNext = document.querySelector('#btn-next');
const btnPause = document.querySelector('#btn-pause');


ourImg.addEventListener("click", function(){
  loading.style.display = "inline"
  message.style.display = "none"
    const randNum = Math.floor(Math.random() * 1643);
    fetch("https://type.fit/api/quotes")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      loading.style.display = "none"
      message.style.display = "flex"
      message.innerHTML = data[randNum].text;
    });
})

// btnPlay.addEventListener("click", function(){
//   audio.play();
//   btnPlay.style.display = "none"
//   btnPause.style.display = "inline"
// })

// btnPause.addEventListener("click", function(){
//   audio.pause();
//   btnPause.style.display = "none"
//   btnPlay.style.display = "inline"
// })

var beatpack = [
	{
    artist: 'Nothing Gonna Stop Us Now',
    thumbnail: '',
		src: "./songs/nothing.mp3",
	},
	{
    artist: 'Terrified',
    thumbnail: '',
		src: "./songs/terified.mp3",
	},
	{
    artist: 'You',
    thumbnail: '',
		src: "./songs/you.mp3",
	},
	{
    artist: 'A Smile In Your Heart',
    thumbnail: '',
		src: "./songs/a-smile-in-your-heart.mp3",
	},
	{
    artist: 'Just The Way You Are',
    thumbnail: '',
		src: "./songs/just-the-way-you-are.mp3",
	},
	{
    artist: 'Once In A Lifetime',
    thumbnail: '',
		src: "./songs/once-in-a-lifetime.mp3",
	}
];

$(document).ready(function () {
	var playing = false,
		artistname = $(".artist-name"),
		musicName = $(".music-name"),
		time = $(".time"),
		fillBar = $(".fillBar");

	var song = new Audio();
	var CurrentSong = 0;
	window.onload = load();

	function load() {
		artistname.html(beatpack[CurrentSong].name);
		musicName.html(beatpack[CurrentSong].artist);
		song.src = beatpack[CurrentSong].src;
	}

	function playSong() {
		artistname.html(beatpack[CurrentSong].name);
		musicName.html(beatpack[CurrentSong].artist);
		song.src = beatpack[CurrentSong].src;
		song.play();
		$("#thumbnail").css("background-image", beatpack[CurrentSong].thumbnail);
		$("#play").attr('src','pause-button.png');
		$("#thumbnail").addClass("active");
		$(".player-track").addClass("active");
	}

	song.addEventListener("timeupdate", function () {
		var position = (100 / song.duration) * song.currentTime;
		var current = song.currentTime;
		var duration = song.duration;
		var durationMinute = Math.floor(duration / 60);
		var durationSecond = Math.floor(duration - durationMinute * 60);
		var durationLabel = durationMinute + ":" + durationSecond;
		currentSecond = Math.floor(current);
		currentMinute = Math.floor(currentSecond / 60);
		currentSecond = currentSecond - currentMinute * 60;
		// currentSecond = (String(currentSecond).lenght > 1) ? currentSecond : ( String("0") + currentSecond );
		if (currentSecond < 10) {
			currentSecond = "0" + currentSecond;
		}
		var currentLabel = currentMinute + ":" + currentSecond;
		var indicatorLabel = currentLabel + " / " + durationLabel;

		fillBar.css("width", position + "%");

		$(".time").html(indicatorLabel);
	});

	$("#play").click(function playOrPause() {
		if (song.paused) {
			song.play();
			playing = true;
			$("#play").attr('src','pause-button.png');
			$("#thumbnail").addClass("active");
			$(".play-btn:before").css("padding-left", 300);

			document.getElementsByClassName("play-btn")[0].classList.add("pause-btn");
			document.getElementsByClassName("play-btn")[0].classList.remove("play-btn");
		} else {
			song.pause();
			playing = false;
			$("#play").attr('src','play-button.png');
			$("#thumbnail").removeClass("active");

			document.getElementsByClassName("pause-btn")[0].classList.add("play-btn");
			document
				.getElementsByClassName("pause-btn")[0]
				.classList.remove("pause-btn");
		}
	});

	$("#prev").click(function prev() {
		CurrentSong--;
		if (CurrentSong < 0) {
			CurrentSong = beatpack.length - 1;
		}
		playSong();
	});

	$("#next").click(function next() {
		CurrentSong++;
		if (CurrentSong == beatpack.length) {
			CurrentSong = 0;
		}
		playSong();
	});
});
