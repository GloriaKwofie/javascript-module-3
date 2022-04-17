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
    const jsonPromises = resolvedFetchResponses.map(resolvedFetchResponse => resolvedFetchResponse.json())
    const resolvedJsonPromises = await Promise.all(jsonPromises)
    console.log(resolvedJsonPromises);
    resolvedFetchResponses.forEach(characterJson => renderCharacter(
        characterJson.name, characterJson.status, characterJson.species, characterJson.image
    ))

}

function updateMainArea(name, date, episodeCode, characterURLs) {
    const mainAreaElement = document.querySelector('#main-area')
    mainAreaElement.innerHTML = ''

    const titleElement = document.createElement('h3')
    titleElement.innerText = name;
    const dateAndCodeElement = document.createElement('h4')
    dateAndCodeElement.innerText = `${date} | ${episodeCode}`

    mainAreaElement.appendChild(titleElement)
    mainAreaElement.appendChild(dateAndCodeElement)

    renderCharacters(characterURLs)
    
}

function sidebar() {
    const sidebarElement = document.createElement('div')
    sidebarElement.id = 'sidebar'
    document.querySelector('#root').appendChild(sidebarElement)
    fetch('https://rickandmortyapi.com/api/episode')
    .then(result => result.json())
    .then(json => {
        json.results.forEach(episode => {
            const titleElement = document.createElement('p')
            titleElement.innerText = `Episode ${episode.id}`
            sidebarElement.appendChild(titleElement)
            titleElement.addEventListener('click', _event => {
            })
            
        });
    })
}