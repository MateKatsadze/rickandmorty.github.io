document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    fetchCharacter(); 
});

function fetchCharacter() {
    const characterInput = document.getElementById('search').value;
    const apiUrl = `https://rickandmortyapi.com/api/character/?name=${characterInput}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error ('Character Not Found');
            }
            return response.json();
        })
        .then(data => {
            const character = data.results[0];
            if (!character) {
                throw new Error ('Character Not Found');
            }
            displayCharacter(character);
        })
        .catch(error => {
            console.log("Error fetching:", error);
            document.getElementById('characterInfo').innerHTML = 'Character Not Found';
        });
}

function displayCharacter(character) {
    const characterInfo = `
        <img src="${character.image}" alt="${character.name}" 
        class="characterImg">
        <h2 class="characterName">${character.name}</h2>
        <p class="characterGender">Gender: ${character.gender}</p>
        <p class="characterSpecies">Species: ${character.species}</p>
        <p class="status"> Status: ${character.status}</p>
        <p class="lastLocation">Last Known Location: ${character.location.name}</p>
    `;
    document.getElementById('characterInfo').innerHTML = characterInfo;
    document.querySelector('.content').style.display = 'flex';
}
