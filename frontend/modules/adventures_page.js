import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  const params = new URLSearchParams(search);
  return params.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const response = await fetch(`${config.backendEndpoint}/adventures?city=${city}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}
//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const dataContainer = document.getElementById("data");

  adventures.forEach((adventure) => {
    const card = document.createElement("div");
    card.className = "col-6 col-lg-3 mb-4";

    card.innerHTML = `
      <a href="detail/?adventure=${adventure.id}" id="${adventure.id}">
        <div class="activity-card">
          <img src="${adventure.image}" alt="${adventure.name}" class="img-fluid"/>
          <div class="category-banner">${adventure.category}</div>
          <div class="card-body d-flex justify-content-between">
            <h5>${adventure.name}</h5>
            <p>₹${adventure.costPerHead}</p>
          </div>
          <div class="card-body d-flex justify-content-between">
            <p>Duration</p>
            <p>${adventure.duration} Hours</p>
          </div>
        </div>
      </a>
    `;

    dataContainer.appendChild(card);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(
    (adventure) => adventure.duration >= low && adventure.duration <= high
  );
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter((adventure) => categoryList.includes(adventure.category));
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  let filteredList = list;

  if (filters.duration) {
    const [low, high] = filters.duration.split("-").map(Number);
    filteredList = filterByDuration(filteredList, low, high);
  }

  if (filters.category && filters.category.length > 0) {
    filteredList = filterByCategory(filteredList, filters.category);
  }

  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  // Place holder for functionality to work in the Stubs
  const filters = localStorage.getItem("filters");
  return filters ? JSON.parse(filters) : null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const categoryList = filters.category;
  const durationSelect = document.getElementById("duration-select");
  const categoryPills = document.getElementById("category-list");

  if (filters.duration) {
    durationSelect.value = filters.duration;
  }

  categoryList.forEach(category => {
    const pill = document.createElement("div");
    pill.className = "category-filter";
    pill.textContent = category;
    categoryPills.appendChild(pill);
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
