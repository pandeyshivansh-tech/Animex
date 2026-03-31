const container = document.getElementById("anime-container")
const loader = document.getElementById("loader")

async function fetchAnime() {
  try {
    loader.style.display = "block"

    const res = await fetch("https://api.jikan.moe/v4/top/anime")
    const data = await res.json()

    displayAnime(data.data)

    loader.style.display = "none"
  } catch (error) {
    console.log(error)
    loader.innerText = "Failed to load data"
  }
}

function displayAnime(animeList) {
  container.innerHTML = ""

  animeList.map(anime => {
    const card = document.createElement("div")
    card.classList.add("card")

    card.innerHTML = `
      <img src="${anime.images.jpg.image_url}" />
      <h3>${anime.title}</h3>
      <p>Rating: ${anime.score}</p>
    `

    container.appendChild(card)
  })
}

fetchAnime()