import config from "../conf/index.js";

async function init() {
  let cities = await fetchCities();
  cities?.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

async function fetchCities() {
  try {
    const response = await fetch(`${config.backendEndpoint}/cities`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}
//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  const container = document.getElementById("data");
  const cityCard = document.createElement("div");
  cityCard.className = "col-6 col-lg-3 mb-4";

  cityCard.innerHTML = `
    <a href="pages/adventures/?city=${id}" id="${id}">
      <div class="tile">
        <img src="${image}" alt="${city}" />
        <div class="tile-text text-center">
          <h5>${city}</h5>
          <p>${description}</p>
        </div>
      </div>
    </a>
  `;

  container.appendChild(cityCard);
}
export { init, fetchCities, addCityToDOM };
