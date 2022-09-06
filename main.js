const message = document.querySelector('.message');
const ourImg = document.querySelector('#our-img');
const loading = document.querySelector('#loading');

ourImg.addEventListener("click", function(){
  loading.style.display = "inline"
    const randNum = Math.floor(Math.random() * 1643);
    fetch("https://type.fit/api/quotes")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      message.innerHTML = data[randNum].text;
    });
})


