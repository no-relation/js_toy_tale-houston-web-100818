const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const API = "http://localhost:3000/toys"
const toyBox = document.getElementById('toy-collection')
const newToyForm = document.querySelector('.add-toy-form')
const newToyButton = newToyForm.querySelector('input[name="submit"]')

let toyArray = []

function getAndysToys (){  
  fetch(API)
  .then ((resp)=>resp.json())
  .then(function(data) {
    toyArray = data
    toyArray.sort((a,b)=>b.likes-a.likes)
    renderToyBox()
  })
}
function renderToyBox() {
  toyBox.innerHTML = ''
  toyArray.forEach(toy => {
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
    toyLikeButton.addEventListener('click', () => {
      toy.likes++
      patchToy(toy)
    })

    let toyDeleteButton = document.createElement('button')
    toyDeleteButton.innerText = "Recycle"
    toyDeleteButton.addEventListener('click', () => deleteToy(toy))

    toyCard.append(toyName, toyPic, toyLikes, toyLikeButton, toyDeleteButton)
    toyBox.append(toyCard)
  });
}

newToyButton.addEventListener('click', function(e) {
  e.preventDefault()
  let toy = {}
  toy.name = newToyForm.querySelector('input[name="name"]').value
  toy.image = newToyForm.querySelector('input[name="image"]').value
  toy.likes = 0
  addNewToy(toy)
  toyForm.style.display = 'none'
})

function addNewToy(toy) {
  fetch(API, {
    method: "POST", 
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(toy)
  }).then ( getAndysToys )
}

function patchToy(toy) {
  fetch(API + `/${toy.id}`, {
    method: "PATCH", 
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(toy)
  }).then ( getAndysToys )
}

function deleteToy(toy) {
  fetch(API + `/${toy.id}`, {
    method: 'DELETE'
  }).then ( getAndysToys )
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


getAndysToys();