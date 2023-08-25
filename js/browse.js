// We follow a URL structure of https://api.noroff.dev/api/<version>/<endpoint>.
// The API base URL for v1 is https://api.noroff.dev/api/v1.

// Each endpoint should be prefixed with this base URL. For example, the full path for getting all jokes using v1 is https://api.noroff.dev/api/v1/jokes.

const baseUrl = "https://cors.noroff.dev/ramsnes.no/wp-json/wc/store";
const jacketList = document.querySelector(".alljackets");
const categories = document.querySelectorAll(".category");
// WooCommerce
const consumerKey = "ck_304001382a9bb9d52724689311f10415c020180d";
const consumerSecret = "cs_b8668b0eab8e95cf75d0a2263417db98b4839849";
const wooKey =
  "https://www.ramsnes.no/wp-json/wc/v3/products?consumer_key=ck_304001382a9bb9d52724689311f10415c020180d&consumer_secret=cs_b8668b0eab8e95cf75d0a2263417db98b4839849";

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

//Featued product separately fetch
// This adds an ID to the featured product container
const featuredProductContainer = document.querySelector(".featured-product");

// Function to fetch and render/display the featured product
async function renderFeaturedProduct() {
  try {
    const featuredData = await fetchData(wooKey + "&featured=true");
    if (featuredData.length > 0) {
      //display featured if there are any, else error
      const featuredProduct = featuredData[0]; // [0] since I chose just one featured product
      const featuredContent = `
      <div class="content">
      <h2>Featured Product</h2>
      <h3>${featuredProduct.name}</h3>
      <img src="${featuredProduct.images[0].src}" alt="#" />
    </div>
      `;
      featuredProductContainer.innerHTML = featuredContent;

      // Click event to the featured product to bring to details.html
      featuredProductContainer.addEventListener("click", function () {
        window.location.href = `details.html?id=${featuredProduct.id}`;
      });
    } else {
      featuredProductContainer.innerHTML =
        "<p>No featured products available.</p>";
    }
  } catch (error) {
    console.error("Error fetching and rendering featured product:", error);
  }
}
renderFeaturedProduct();

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
