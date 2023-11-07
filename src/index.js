let addToy = true;
let toyList = [];

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json"
};
  const toyAPI = "http://localhost:3000/toys";
  const addBtn = document.getElementById("new-toy-btn");
  const toyFormContainer = document.getElementById("container");
  const toyCollection= document.getElementById('toy-collection');
  document.getElementById('add-toy-form').addEventListener('submit', handleAddNewToy);
  
  
  fetch(toyAPI)
    .then(res => res.json())
    .then(toys => {
      toyList = toys;
      renderToys(toyList);
    })
    
    
  
    function renderToys(toys){
      toyCollection.innerHTML = '';
      toys.forEach(renderToy);
    }

    function renderToy(toy){
      const toyCard = document.createElement('div');
      toyCard.classList.add('card');
      toyCollection.append(toyCard);

      toyCard.innerHTML = `
      <h2> ${toy.name}</h2>
      <img src ="${toy.image}" class="toy-avatar" />
      <p>${toy.likes} Likes</p>
      <button class="like-btn" id="toy-${toy.id}">Like ❤️</button>
      `;
      const likeButton = document.getElementById(`toy-${toy.id}`)
      likeButton.addEventListener('click', (e) => handleAddLike(toy))
    }

    function handleAddNewToy(e){
      e.preventDefault();
      const newToyData = {
        name: e.target.name.value,
        image: e.target.image.value,
        likes: 0
      }
      fetch(toyAPI, {
        headers,
        method: 'POST',
        body: JSON.stringify(newToyData)

      })
      .then(res => res.json())
      .then(renderToy);
     
    }

    function handleAddLike(toy){
      const likes = toy.likes + 1;

      fetch(`${toyAPI}/${toy.id}`, {
        headers,
        method: 'PATCH',
        body: JSON.stringify({likes}),
     })
      .then (res => res.json())
      .then (() => {
        toy.likes=likes;
        renderToys(toyList)
      });
    }
      addBtn.addEventListener("click", () => {
      // hide & seek with the form
      addToy = !addToy;
      if (addToy) {
        toyFormContainer.style.display = "block";
      } else {
        toyFormContainer.style.display = "none";
      }
    });
 

 

  
