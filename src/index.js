const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const API = "http://localhost:3000/toys"
const toyBox = document.getElementById('toy-collection')

let toyArray = []

fetch(API)
.then ((resp)=>resp.json())
.then(function(data) {
  toyArray = data
  renderToyBox(toyArray)
})

function renderToyBox(newArray) {
  newArray.forEach(toy => {
    let toyCard = document.createElement('div')
    toyCard.setAttribute('class', "card")

    let toyName = document.createElement('h2')
    toyName.innerHTML = toy.name

    let toyPic = document.createElement('img')
    toyPic.setAttribute('src', toy.image)
    toyPic.setAttribute('class', 'toy-avatar')

    let toyLikes = document.createElement('p')
    toyLikes.innerHTML = toy.likes + ' Likes'

    let toyLikeButton = document.createElement('button')
    toyLikeButton.setAttribute('class', 'like-btn')
    toyLikeButton.innerText = '❤ Like ❤'

    toyCard.append(toyName, toyPic, toyLikes, toyLikeButton)
    toyBox.append(toyCard)
  });
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
