const container = document.getElementById("anime-container")
const loader = document.getElementById("loader")

const searchInput = document.getElementById("search")
const filterSelect = document.getElementById("filter")
const sortSelect = document.getElementById("sort")
const toggleBtn = document.getElementById("theme-toggle")

let allAnime = []

// fetch anime data
async function fetchAnime(){
  try{
    loader.style.display = "block"
    container.style.display = "none"

    const res = await fetch("https://api.jikan.moe/v4/top/anime")
    const data = await res.json()

    allAnime = data.data

    displayAnime(allAnime)

    loader.style.display = "none"
    container.style.display = "grid"
  }
  catch(error){
    console.log(error)
    loader.innerText = "Failed to load data"
  }
}

// display anime cards
function displayAnime(animeList){
  container.innerHTML = ""

  if(animeList.length === 0){
    container.innerHTML = "<h2>No results found</h2>"
    return
  }

  animeList.map(anime =>{
    const card = document.createElement("div")
    card.classList.add("card")

    card.innerHTML =
      `<img src="${anime.images.jpg.image_url}" />
      <h3>${anime.title}</h3>
      <p>Rating: ${anime.score}</p>
      <p>Type: ${anime.type}</p>`

    container.appendChild(card)
  })
}

// search, filter and sort
function handleControls(){
  let filtered = [...allAnime]

  const searchValue = searchInput.value.toLowerCase()
  const filterValue = filterSelect.value
  const sortValue = sortSelect.value

  filtered = filtered.filter(anime =>
    anime.title.toLowerCase().includes(searchValue)
  )

  if(filterValue !== "all"){
    filtered = filtered.filter(anime =>
      anime.type === filterValue
    )
  }

  if(sortValue === "high"){
    filtered = filtered.sort((a , b) => b.score - a.score)
  }
  else if(sortValue === "low"){
    filtered = filtered.sort((a , b) => a.score - b.score)
  }

  displayAnime(filtered)
}

// Dark/Light Mode toggle
toggleBtn.addEventListener("click" , () =>{
  document.body.classList.toggle("light")

  if(document.body.classList.contains("light")){
    toggleBtn.innerText = "Dark Mode"
  } else{
    toggleBtn.innerText = "Light Mode"
  }
})

// event listeners
searchInput.addEventListener("input" , handleControls)
filterSelect.addEventListener("change" , handleControls)
sortSelect.addEventListener("change" , handleControls)

// starting call
fetchAnime()