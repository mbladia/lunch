



const message = document.querySelector('.message');
const ourImg = document.querySelector('#our-img');

ourImg.addEventListener("click", function(){
    const randNum = Math.floor(Math.random() * 1643);
    fetch("https://type.fit/api/quotes")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      console.log(data[randNum]);
      message.innerHTML = data[randNum].text;
    });
})


