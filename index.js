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
            .then(dogs => removeWalk(dogs))

            function sortDogs(dogs) {
                dogs.forEach(dog => {
                    if (dog[dayOfWeek] === "yes") {
                        renderDogCard(dog)
                    }
                })
            }
            function removeWalk() {

                let cancelBtn = document.querySelectorAll('.cancelBtn')

                console.log(cancelBtn)

                cancelBtn.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.target.parentElement.remove()
                    })
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
            <p>Pick up ${dog.name} at ${dog.address} ${dog.walkTime}</p>
            </div>
            <button class="cancelBtn">Cancel Walk</button><br><br>`

        document.getElementById("cardContainer").append(dogCard)

    }
})