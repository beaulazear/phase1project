// use https://postimg.cc/gallery/bsv98kk for image sources

document.addEventListener('DOMContentLoaded', () => {
    function makeDogCard(dog) {

        let dogCard = document.createElement("div")
        let dogImg = document.createElement("img")
        let dogName = document.createElement("h2")
        let dogBio = document.createElement("p")

        dogImg.innerHTML = dog.image
        dogName.innerText = dog.dogName
        dogBio.innerText = dog.bio

        document.getElementById("cardContainer").append(dogCard, dogImg, dogName, dogBio)
    }
    fetch("/Users/beaulazear/Development/code/Phase-1/phase1project/db.json")
    .then(resp => resp.json())
    .then(dog => makeDogCard(dog))

    console.log("hello!")
})