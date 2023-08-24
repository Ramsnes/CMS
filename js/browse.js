// We follow a URL structure of https://api.noroff.dev/api/<version>/<endpoint>.
// The API base URL for v1 is https://api.noroff.dev/api/v1.

// Each endpoint should be prefixed with this base URL. For example, the full path for getting all jokes using v1 is https://api.noroff.dev/api/v1/jokes.

// WooCommerce
//Consumer key: ck_304001382a9bb9d52724689311f10415c020180d
//Consumer secret: cs_b8668b0eab8e95cf75d0a2263417db98b4839849

const mainContainer = document.querySelector(".jacket-block");
const jacketList = document.querySelector(".alljackets");

// console.log({ mainContainer });
const baseUrl = "https://cors.noroff.dev/ramsnes.no/wp-json/wc/store";
const allEndpoint = "/products";
// const specificEndpoint = "http://martial-arts.local/wp-json/wc/store/products/<id>";

// fetch API and it's elements
async function fetchData() {
  // needs to be async since we can't wait for result before code moves on
  const response = await fetch(baseUrl + allEndpoint);
  const data = await response.json();
  // console.log({ data }); // shows element ID's of API
  return data;
}

fetchData();

// renders the fetched jacket data into the HTML
async function renderHTML() {
  const productList = await fetchData(); //appends the fetched API
  jacketList.innerHTML = ``; // clears the HTML before adding

  //forEach jacket in the productList(API), it creates a new list item (<li>) element, assigns the jacket's id as the element's id, and constructs the HTML content using template literals. The constructed HTML includes the jacket's title, description, and image.
  productList.forEach(function (element, index) {
    const productElement = document.createElement("li");

    // not in use this page. Renames the paramenter "element", and that variable syntax is later used for changing the innerHTML
    productElement.name = element.name; // element = jacket

    const productContent = `
      <div class="content">
        <h2>${element.name}</h2>
        <p>${element.description}</p>
        <img src="${element.images[0].src}" alt="#" />
      </div>
    `;

    productElement.innerHTML = productContent;

    productElement.addEventListener("click", function () {
      // console.log("On click", element.id);
      window.location.href = `details.html?id=${element.name}`;
    });

    //each productElement is appended to the jacketList element.
    jacketList.appendChild(productElement);
  });
}

renderHTML();

//////
//Featured product
// async function getFeatured() {
//   const featuredUrl =
//     "http://cors.noroff.dev/http://martial-arts.local/wp-json/wc/store/products?featured=true";

//   try {
//     const response = await fetch(featuredUrl);
//     const featured = await response.json();
//     return featured;
//   } catch (error) {
//     console.log("An error has occured in the fetching of the API");
//   }
// }

// getFeatured();
