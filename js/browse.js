// We follow a URL structure of https://api.noroff.dev/api/<version>/<endpoint>.
// The API base URL for v1 is https://api.noroff.dev/api/v1.

// Each endpoint should be prefixed with this base URL. For example, the full path for getting all jokes using v1 is https://api.noroff.dev/api/v1/jokes.

// WooCommerce
//Consumer key: ck_304001382a9bb9d52724689311f10415c020180d
//Consumer secret: cs_b8668b0eab8e95cf75d0a2263417db98b4839849

const mainContainer = document.querySelector(".jacket-block");
const jacketList = document.querySelector(".alljackets");
//categories
const categories = document.querySelectorAll(".categories");

// console.log({ mainContainer });
const baseUrl = "https://cors.noroff.dev/ramsnes.no/wp-json/wc/store";
const allEndpoint = "/products";
// const specificEndpoint = "http://martial-arts.local/wp-json/wc/store/products/<id>";

// fetch API and its elements
async function fetchData(url) {
  // needs to be async since we can't wait for result before code moves on
  const response = await fetch(url);
  const data = await response.json();
  // console.log({ data }); // shows element ID's of API
  return data;
}

// renders the fetched jacket data into the HTML
async function renderHTML(data) {
  jacketList.innerHTML = ""; // clears the HTML before adding

  // forEach jacket in the data, create a new list item element and construct the HTML content
  data.forEach(function (element) {
    const productElement = document.createElement("li");
    productElement.name = element.name; // element = jacket

    const productContent = `
      <div class="content">
        <h2>${element.name}</h2>
        <p>$ ${element.prices.price}</p>
        <img src="${element.images[0].src}" alt="#" />
      </div>
    `;

    productElement.innerHTML = productContent;

    productElement.addEventListener("click", function () {
      window.location.href = `details.html?id=${element.name}`;
    });

    jacketList.appendChild(productElement);
  });
}

// Categories click handler
categories.forEach(function (category) {
  category.onclick = async function (event) {
    let newUrl = baseUrl + allEndpoint; // Default URL

    if (event.target.id === "featured") {
      newUrl += "?featured=true"; // Add featured parameter
    }
    // else {
    //   const categoryChosen = event.target.value;
    //   newUrl = baseUrl + `category=${categoryChosen}`;
    // }

    try {
      const data = await fetchData(newUrl);
      renderHTML(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
});

// Initial fetch and render
(async function () {
  try {
    const initialData = await fetchData(baseUrl + allEndpoint);
    renderHTML(initialData);
  } catch (error) {
    console.error("Error fetching initial data:", error);
  }
})();
