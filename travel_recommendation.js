async function searchFunction() {
    let query = document.getElementById('search').value.toLowerCase().trim();
    let resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    
    try {
        let response = await fetch('https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMSkillsNetwork-JS0101EN-SkillsNetwork/travel1.json');
        let recommendations = await response.json();
        let results = [];
        
        if (query === "beach" || query === "beaches") {
            results = recommendations.beaches;
        } else if (query === "temple" || query === "temples") {
            results = recommendations.temples;
        } else {
            results = recommendations.countries.flatMap(country => 
                country.name.toLowerCase().includes(query) ? country.cities : []
            );
        }
        
        if (results.length > 0) {
            results.forEach(place => {
                let item = `<div class='result-item'>
                    <h3>${place.name}</h3>
                    <img src="${place.imageUrl}" alt="${place.name}">
                    <p><strong>Description:</strong> ${place.description}</p>
                </div>`;
                resultsContainer.innerHTML += item;
            });
        } else {
            resultsContainer.innerHTML = '<p>No results found.</p>';
        }
    } catch (error) {
        resultsContainer.innerHTML = '<p>Error loading recommendations.</p>';
    }
}

function resetFunction() {
    document.getElementById('search').value = '';
    document.getElementById('results').innerHTML = '';
}