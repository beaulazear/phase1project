// use https://postimg.cc/gallery/bsv98kk for image sources

document.addEventListener('DOMContentLoaded', () => {

    let myForm = document.getElementById("day")

    myForm.addEventListener("change", (e) => {

        e.preventDefault();

        let dayOfWeek = document.getElementById("day").value

        fetch("http://localhost:3000/dogs")
            .then(resp => resp.json())
            .then(dogs => sortDogs(dogs))
            .then(dogs => removeWalk(dogs))

            function sortDogs(dogs) {
                removeChildNodes()
                dogs.forEach(dog => {
                    if (dog[dayOfWeek] === "yes") {
                        renderDogCard(dog)
                    }
                })
            }
            function removeWalk() {

                let cancelBtn = document.querySelectorAll('.cancelBtn')

                cancelBtn.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.target.parentElement.remove()
                    })
                })
                cancelBtn.forEach(btn => {
                    btn.addEventListener("mouseover", (e) => {
                        e.target.textContent = "Are you sure?"
                    })
                })
                cancelBtn.forEach(btn => {
                    btn.addEventListener("mouseout", (e) => {
                        e.target.textContent = "Cancel walk"
                    })
                })
            }
    })

    // function mouseOver(cancelBtn) {
    //     cancelBtn.style.color("red")
    // }
    
    // function mouseOut(cancelBtn) {
        //     cancelBtn.style.color("white")
        // }
        
    function removeChildNodes() {

        let parent = document.getElementById("cardContainer")

         while (parent.firstChild) {
            parent.removeChild(parent.firstChild)
            }
        }

    function renderDogCard(dog) {

        let dogCard = document.createElement("ul")
        
        dogCard.className = "dogCard"
        dogCard.innerHTML = `
        <div class="dogContent">
        <img src="${dog.image}" id="dogImg" width="294px" height="392"/>
            <h3>${dog.name}</h3>
            <p>${dog.bio}</p>
            <p>${dog.name} gets walked for ${dog.walkDuration}!</p>
            <p>Pick up ${dog.name} at ${dog.address} ${dog.walkTime}</p>
            <button class="cancelBtn">Cancel Walk</button><br><br>
            </div>`

        document.getElementById("cardContainer").append(dogCard)

    }
})