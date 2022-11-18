// use https://postimg.cc/gallery/bsv98kk for image sources

document.addEventListener('DOMContentLoaded', () => {

    let myForm = document.getElementById("search")

    console.log(myForm)

    myForm.addEventListener("submit", (e) => {

        e.preventDefault();

        let dayOfWeek = document.getElementById("input").value

        fetch("http://localhost:3000/dogs")
            .then(resp => resp.json())
            .then(dogs => sortDogs(dogs))

        function sortDogs(dogs) {
            dogs.forEach(dog => {
                if (dog[dayOfWeek] === "yes") {
                    renderDogCard(dog)
                }
        })
    }
    })

    function renderDogCard(dog) {

        let dogCard = document.createElement("ul")
        dogCard.className = "dogCard"
        dogCard.innerHTML = `
        <img src="${dog.image}" width="300px" height="400"/>
        <div class="dogContent">
            <h3>${dog.name}</h3>
            <p>${dog.bio}</p>
            <p>${dog.name} gets walked for ${dog.walkDuration}!</p>
            <p>Pick up ${dog.name} at ${dog.address} around ${dog.walkTime}</p>
            </div>
            <button>Cancel Walk</button><br><br>`

        // let dogCard = document.createElement("div")
        // let dogImg = document.createElement("img")
        // let dogName = document.createElement("h2")
        // let dogBio = document.createElement("p")

        // dogImg.innerHTML = dog.image
        // dogName.innerText = dog.name
        // dogBio.innerText = dog.bio

        document.getElementById("cardContainer").append(dogCard)

        console.log(dog.image)
    }


})