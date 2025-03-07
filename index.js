document.addEventListener('DOMContentLoaded', () => {
    // Crear el contenedor principal
    const container = document.createElement('div');
    container.style.background = '#408e29';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.height = '100vh';

    // Botón
    const fetchButton = document.createElement('button');
    fetchButton.textContent = 'woba loba dob dog';
    fetchButton.style.background = '#f08a14'; 
    fetchButton.style.fontSize = '40px'
    fetchButton.onclick = Rick;

    // Crear el contenedor donde se mostrará la frase
    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'results';
    resultsContainer.style.marginTop = '20px';
    resultsContainer.style.fontSize = '20px';
    resultsContainer.style.textAlign = 'center';
    resultsContainer.style.maxWidth = '100%';

    container.appendChild(fetchButton);
    container.appendChild(resultsContainer);
    document.body.appendChild(container);
});

// Mapa
const frasesRickAndMorty = new Map([
    ["Rick Sánchez", [
        "Cuando te das cuenta de que nada importa, el universo es tuyo.",
        "La mente adolescente es su propio peor enemigo.",
        "Todos los hospitales tienen un médico que dicen que es el mejor médico de toda la galaxia.",
        "La vida está hecha de pequeñas concesiones."
    ]],
    ["Morty Smith", [
        "Los padres son simplemente niños teniendo más niños.",
        "¿Tienes a un planeta completo generando electricidad para ti? ¡Eso es esclavitud!"
    ]],
    ["Beth Smith", [
        "Cuando dos personas crean una vida juntas, dejan de lado sus vidas previas como individuos.",
        "Me estoy quedando sin excusas para no ser quien soy, ¿así que quién soy?"
    ]],
    ["Zeep Xanflorp", [
        "Deserté de la escuela, no es un lugar para la gente inteligente."
    ]],
    ["Sr. Meeseeks", [
        "¿Sabes qué es lo mejor que puedes hacer para la gente que depende de ti? Sé honesto con ellos, incluso si significa liberarlos."
    ]]
]);

function Rick() {
    const resultsContainer = document.getElementById('results');
    if (!resultsContainer) return;

    const personajes = Array.from(frasesRickAndMorty.keys());
    const personajeAleatorio = personajes[Math.floor(Math.random() * personajes.length)];
    const frases = frasesRickAndMorty.get(personajeAleatorio);
    const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
    
    resultsContainer.innerHTML = `<p>${personajeAleatorio}: "${fraseAleatoria}"</p>`;
    
setTimeout(()=>{
    fetch('https://rickandmortyapi.com/api/character')
    .then(response => response.json())
    .then(data => {
        const resultsContainer = document.getElementById('results');
            resultsContainer.style.width = '80%';
            resultsContainer.style.height = '100vh';
            resultsContainer.style.margin = '0 auto';
            resultsContainer.style.overflow = 'auto';
            resultsContainer.innerHTML = '';
            resultsContainer.style.display = 'grid';
            resultsContainer.style.gridTemplateColumns = 'repeat(5, 2fr)';
            resultsContainer.style.gap = '20px';

            // get random 10 characters

            const dataImages = data.results;
            datafiltrada = dataImages.filter(element=>{
                if (element.status == 'Dead'){
                    return element;
                } 
            })
            datafiltrada.forEach(CharacterData => {
                const elementc = document.createElement('div');
                elementc.innerHTML = `
                    <p>ID: ${CharacterData.id}</p>
                    <p>Name: ${CharacterData.name}</p>
                    <p>Especie: ${CharacterData.species}</p>
                    <p>Estado: ${CharacterData.status}</p>
                    <img src="${CharacterData.image}" alt="${CharacterData.name}" width="100px" />
                `;

                elementc.style.border = '1px solid #ccc';
                elementc.style.padding = '10px';
                elementc.style.borderRadius = '16px';
                resultsContainer.appendChild(elementc);
            });
        })
        .catch(error => console.error('Error fetching characters:', error));
},3000)   
}