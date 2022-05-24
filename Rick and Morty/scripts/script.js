let sidebarElement
let mainAreaElement;
let characterCardsElement


function locationOfCharacter(name, type, dimension) {
    characterLocation = document.querySelector('.character-card')
    characterLocation.addEventListener('click', _event => {
        console.log('this is my character location');
    })
    mainAreaElement.appendChild(characterLocation)
    
}

function renderCharacter(name, status, species, image) {
    const cardCharacterElement = document.createElement('div')
    cardCharacterElement.className = 'character-card'
    mainAreaElement.appendChild(cardCharacterElement)

    //image source
    const characterImageElement = document.createElement('img')
    characterImageElement.src = image;

    //name
    const characterNameElement = document.createElement('div')
    characterNameElement.innerText = name;

    //species and status
    const characterSpeciesStatusElement = document.createElement('div')
    characterSpeciesStatusElement.innerText = `${species} | ${status}`

    cardCharacterElement.appendChild(characterImageElement)
    cardCharacterElement.appendChild(characterNameElement)
    cardCharacterElement.appendChild(characterSpeciesStatusElement)

}


async function fetchCharacters(characterURLs) {
    const characterFetchPromises = characterURLs.map(characterURL => fetch(characterURL))
    const resolvedFetchResponses = await Promise.all(characterFetchPromises)
    const jsonPromises = resolvedFetchResponses.map(resolvedFetchResponses => resolvedFetchResponses.json())
    const resolvedJsonPromises = await Promise.all(jsonPromises)
    console.log(resolvedJsonPromises);
    
    resolvedJsonPromises.forEach(characterJson => renderCharacter(
        characterJson.name, characterJson.status, characterJson.species, characterJson.image
    
    ))
}


function updateMainArea(name, date, episodeCode, characterURLs) {
    mainAreaElement = document.querySelector('#main-area')
    mainAreaElement.innerHTML = ''
    characterCardsElement.innerHTML = ''

    const titleElement = document.createElement('h3')
    titleElement.innerText = name;
    const dateAndCodeElement = document.createElement('h4')
    dateAndCodeElement.innerText = `${date} | ${episodeCode}`

    mainAreaElement.appendChild(titleElement)
    mainAreaElement.appendChild(dateAndCodeElement)
    mainAreaElement.appendChild(characterCardsElement)

    fetchCharacters(characterURLs) 
    characterLocation()
}

function renderNextEpisodeButton(nextUrl) {
    if (!nextUrl) {
        return
    }
    
    const nextButton = document.createElement('button')
    nextButton.className = 'next-list-button'
    nextButton.innerText = 'Next Episodes'
    nextButton.addEventListener('click', _event => {
        console.log(nextUrl);
        fetch(nextUrl)
        .then(response => response.json())
        .then(json => {
            renderListOfEpisodes(json.results, json.info.next)
        })
    })
    sidebarElement.appendChild(nextButton)
}

function renderListOfEpisodes(episodes,nextUrl) {
    document.querySelectorAll('.next-list-button').forEach(
    buttonElement => sidebarElement.removeChild(buttonElement))

    episodes.forEach(episode => {
        const titleElement = document.createElement('p')
        titleElement.innerText = `Episode ${episode.id}`
        sidebarElement.appendChild(titleElement)
        titleElement.addEventListener('click', _event => {
            updateMainArea(episode.name, episode.air_date, episode.episode, episode.characters)
        })
    })
    renderNextEpisodeButton(nextUrl)
    

   
}



function sidebar() {
    sidebarElement = document.createElement('div')
    sidebarElement.id = 'sidenav'
    document.querySelector('#root').appendChild(sidebarElement)
    fetch('https://rickandmortyapi.com/api/episode')
    .then(result =>{
        return result.json()})
    .then(json => {
       renderListOfEpisodes(json.results, json.info.next)
        const firstEpisode = json.results[0]
        updateMainArea(firstEpisode.name, firstEpisode.air_date, firstEpisode.episode, firstEpisode.characters)
    })
   /* .catch(
        errorMessage => console.log(errorMessage)
    )*/
 
}

function mainArea() {
  mainAreaElement = document.createElement('div')
    mainAreaElement.id = 'main-area'
    characterCardsElement = document.createElement('div')
    characterCardsElement.id = 'character-cards'
    mainAreaElement.appendChild(characterCardsElement)
    document.querySelector('#root').appendChild(mainAreaElement)

    
}

sidebar()
mainArea()


