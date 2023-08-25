// We follow a URL structure of https://api.noroff.dev/api/<version>/<endpoint>.
// The API base URL for v1 is https://api.noroff.dev/api/v1.

// Each endpoint should be prefixed with this base URL. For example, the full path for getting all jokes using v1 is https://api.noroff.dev/api/v1/jokes.

const baseUrl = "https://cors.noroff.dev/ramsnes.no/wp-json/wc/store";
const jacketList = document.querySelector(".alljackets");
const categories = document.querySelectorAll(".category");

// Fetch data from API
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// Render jacket list
function renderHTML(data) {
  jacketList.innerHTML = "";

  // forEach jacket in the data, create a new list item element and construct the HTML content
  data.forEach(function (element) {
    const productElement = document.createElement("li");
    productElement.name = element.name; // element = jacket

    const productContent = `
      <div class="content">
        <h2>${element.name}</h2>
        <img src="${element.images[0].src}" alt="#" />
        <p>$ ${element.prices.price}</p>
      </div>
    `;

    productElement.innerHTML = productContent;

    productElement.addEventListener("click", function () {
      window.location.href = `details.html?id=${element.id}`;
    });

    jacketList.appendChild(productElement);
  });
}

// Category click handler
categories.forEach(function (category) {
  category.addEventListener("change", async function () {
    let newUrl = baseUrl + "/products";
    if (category.value === "featured") {
      newUrl += "?featured=true";
    }
    try {
      const data = await fetchData(newUrl);
      renderHTML(data);
    } catch (error) {
      console.error("Error fetching and rendering data:", error);
    }
  });
});

// Initial fetch and render
(async function () {
  try {
    const initialData = await fetchData(baseUrl + "/products");
    renderHTML(initialData);
  } catch (error) {
    console.error("Error fetching and rendering initial data:", error);
  }
})();
