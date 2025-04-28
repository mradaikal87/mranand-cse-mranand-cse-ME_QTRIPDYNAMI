import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  return params.get("adventure");

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const response = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`
    );

    const data = await response.json();
    return data;
  } catch (error) {

    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  document.getElementById("adventure-name").textContent = adventure.name;
  document.getElementById("adventure-subtitle").textContent =
    adventure.subtitle;
  document.getElementById("adventure-content").textContent = adventure.content;

  const photoGallery = document.getElementById("photo-gallery");
  photoGallery.innerHTML = "";
  adventure.images.forEach((imgUrl) => {
    const img = document.createElement("img");
    img.src = imgUrl;
    img.className = "activity-card-image";
    photoGallery.appendChild(img);
  });

  document.getElementById("adventure-content").textContent = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  const photoGallery = document.getElementById("photo-gallery");
  photoGallery.innerHTML = `
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        ${images
          .map(
            (_, idx) => `
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${idx}" ${
              idx === 0 ? 'class="active"' : ""
            } aria-current="${
              idx === 0 ? "true" : "false"
            }" aria-label="Slide ${idx + 1}"></button>
        `
          )
          .join("")}
      </div>
      <div class="carousel-inner">
        ${images
          .map(
            (img, idx) => `
          <div class="carousel-item ${idx === 0 ? "active" : ""}">
            <img src="${img}" class="d-block w-100" alt="Adventure Image ${
              idx + 1
            }">
          </div>
        `
          )
          .join("")}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  `;
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  if (adventure.available) {
    document.getElementById("reservation-panel-available").style.display =
      "block";
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-person-cost").textContent =
      adventure.costPerHead;
  } else {
    document.getElementById("reservation-panel-available").style.display =
      "none";
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
  }
}
//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  const totalCost = adventure.costPerHead * persons;
  document.getElementById("reservation-cost").textContent = totalCost;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  const form = document.getElementById("myForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.elements["name"].value;
    const date = form.elements["date"].value;
    const persons = form.elements["person"].value;

    const reservationData = {
      name,
      date,
      person: persons,
      adventure: adventure.id,
    };

    try {
      const response = await fetch(
        `${config.backendEndpoint}/reservations/new`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reservationData),
        }
      );

      if (response.ok) {
        alert("Success!");
        window.location.reload();
      } else {
        alert("Failed!");
      }
    } catch (error) {
      console.error("Reservation error:", error);
      alert("Failed!");
    }
  });
}
//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
