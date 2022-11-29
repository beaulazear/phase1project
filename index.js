document.addEventListener('DOMContentLoaded', () => {

    let myForm = document.getElementById("day")

    myForm.addEventListener("change", () => {
        fetch("http://localhost:3000/dogs")
        .then(resp => resp.json())
        .then(dogs => {
            sortDogs(dogs)
            removeWalk(dogs)
        })
    })

    function removeWalk() {
        
        let cancelBtns = document.querySelectorAll('.cancelBtn')
        
        cancelBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.parentElement.remove()
            })
        })

        cancelBtns.forEach(btn => {
            btn.addEventListener("mouseover", (e) => {
                e.target.textContent = "Are you sure?"
                e.target.style.backgroundColor = 'yellow'
            })
        })
        
        cancelBtns.forEach(btn => {
            btn.addEventListener("mouseout", (e) => {
                e.target.textContent = "Cancel walk"
                e.target.style.backgroundColor = '#e9967a'
            })
        })
    }
    
    function sortDogs(dogs) {
        
        removeChildNodes()
        
        let todaysWalksArr = []
        let dayOfWeek = document.getElementById("day").value

        for (let i = 0; i < dogs.length; i++) {
            if (dogs[i][dayOfWeek] === "yes") {
                renderDogCard(dogs[i])
                todaysWalksArr.push(dogs[i])
            }
        }
        
        if (todaysWalksArr.length < 1) {
            removeChildNodes()
            renderNoWalkMessage()
        }
    }
    
    function renderNoWalkMessage() {

        removeChildNodes()

        let noWalkMessage = document.createElement("div")
        noWalkMessage.id = "noWalkMessage"
        noWalkMessage.innerHTML = `
            <div>
            <p>There are no walks scheduled today, enjoy your day off!</p>
            </div>`
        document.getElementById("cardContainer").append(noWalkMessage)
    }

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
            <p>${dog.name} gets walked for ${dog.walkDuration}</p>
            <p>Pick up ${dog.name} at ${dog.address} around ${dog.walkTime}</p>
            <button class="cancelBtn">Cancel Walk</button><br><br>
            </div>`

        document.getElementById("cardContainer").append(dogCard)

    }

    document.getElementById("newDogForm").addEventListener("submit", (e) => {

        e.preventDefault()

        let newDogObj = {
            name: e.target.formDogName.value,
            image: e.target.dogFormImg.value,
            bio: e.target.dogBio.value,
            address: e.target.dogFormAddress.value,
            walkTime: e.target.dogFormWalkTime.value,
            walkDuration: e.target.dogFormWalkDuration.value,
            Unscheduled: 'yes'
        }

        fetch('http://localhost:3000/dogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDogObj)
        })
            .then((resp) => resp.json())
            .then((data) => {
                document.getElementById("newDogForm").reset()
                window.alert("Dog uploaded to database")
            })
    })
})