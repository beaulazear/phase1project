document.addEventListener('DOMContentLoaded', () => {
    
    let dogDataArr = []
    fetch("http://localhost:3000/dogs")
    .then(resp => resp.json())
    .then(data => {
        data.forEach(dog => {
            dogDataArr.push(dog)
            return dogDataArr
        })
    })
    
    let daySelector = document.getElementById("day")
    daySelector.addEventListener("change", () => {
        sortDogs(dogDataArr)
    })

    function sortDogs(arr) {

        removePreviousWalks()

        let selectedDay = document.getElementById("day").value

        let todaysWalksArr = arr.filter(dog => dog.days[selectedDay] === true)

        renderDogCards(todaysWalksArr)

        if (todaysWalksArr.length < 1) {
            removePreviousWalks()
            renderNoWalkMessage()
        }

        let cancelBtns = document.querySelectorAll('.cancelBtn')
        cancelBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.parentElement.parentElement.remove()
            })
            btn.addEventListener("mouseover", (e) => {
                e.target.textContent = "Are you sure?"
                e.target.style.backgroundColor = 'yellow'
            })
            btn.addEventListener("mouseout", (e) => {
                e.target.textContent = "Cancel walk"
                e.target.style.backgroundColor = '#e9967a'
            })
        })
    }

    function renderNoWalkMessage() {

        removePreviousWalks()

        let noWalkMessage = document.createElement("div")
        noWalkMessage.id = "noWalkMessage"
        noWalkMessage.innerHTML = `
            <div>
            <p>There are no walks scheduled today, enjoy your day off!</p>
            </div>`
        document.getElementById("cardContainer").append(noWalkMessage)
    }

    function removePreviousWalks() {

        let parent = document.getElementById("cardContainer")

        while (parent.firstChild) {
            parent.removeChild(parent.firstChild)
        }
    }

    function renderDogCards(dogArr) {

        dogArr.forEach(dog => {
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
        })
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
            days: {
                Monday: e.target.mondayBox.checked,
                Tuesday: e.target.tuesdayBox.checked,
                Wednesday: e.target.wednesdayBox.checked,
                Thursday: e.target.thursdayBox.checked,
                Friday: e.target.fridayBox.checked,
                Saturday: e.target.saturdayBox.checked,
                Sunday: e.target.sundayBox.checked
            }
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
                
                dogDataArr.push(data)

                fetch('http://localhost:3000/dogs')
                .then(resp => resp.json())
                .then(data => {
                    sortDogs(data)
                    document.getElementById("newDogForm").reset()
                })
            })
    })
})