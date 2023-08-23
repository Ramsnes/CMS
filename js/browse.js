// We follow a URL structure of https://api.noroff.dev/api/<version>/<endpoint>.

// The API base URL for v1 is https://api.noroff.dev/api/v1.

// Each endpoint should be prefixed with this base URL. For example, the full path for getting all jokes using v1 is https://api.noroff.dev/api/v1/jokes.

const mainContainer = document.querySelector(".jacket-block");
const jacketList = document.querySelector(".alljackets");

// console.log({ mainContainer });
const baseUrl = "https://api.noroff.dev/api/v1";
const allEndpoint = "/rainy-days";
const specificEndpoint = "/rainy-days/<id>"; // splitting the url for future useage

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
    productElement.id = element.id; // element = jacket

    const productContent = `
      <div class="content">
        <h2>${element.title}</h2>
        <p>${element.description}</p>
        <img src="${element.image}" alt="#" />
      </div>
    `;

    productElement.innerHTML = productContent;

    productElement.addEventListener("click", function () {
      // console.log("On click", element.id);
      window.location.href = `details.html?id=${element.id}`;
    });

    //each productElement is appended to the jacketList element.
    jacketList.appendChild(productElement);
  });
}

renderHTML();
