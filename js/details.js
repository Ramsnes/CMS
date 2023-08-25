const baseUrl = "https://cors.noroff.dev/ramsnes.no/wp-json/wc/store";
const errorMsg = document.querySelector(".loadingClass");
//WooCommerce
const consumerKey = "ck_304001382a9bb9d52724689311f10415c020180d";
const consumerSecret = "cs_b8668b0eab8e95cf75d0a2263417db98b4839849";
const wooKey =
  "https://www.ramsnes.no/wp-json/wc/v3/products?consumer_key=ck_304001382a9bb9d52724689311f10415c020180d&consumer_secret=cs_b8668b0eab8e95cf75d0a2263417db98b4839849";

function getProductId() {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
  return id;
}

async function fetchProduct(id) {
  const response = await fetch(baseUrl + `/products/${id}`);
  const data = await response.json();
  return data;
}

async function renderHTML() {
  try {
    const id = getProductId();
    const product = await fetchProduct(id);
    const whatever = document.getElementById("mainJacketWrapper");
    whatever.removeAttribute("class");
    const loading = document.getElementById("loading");
    loading.remove();

    // title change dynamically
    document.title = `Martial-arts - ${product.name}`;

    //What is shown on details.js screen
    const description = document.getElementById("description");
    description.innerHTML = product.description;

    const image = document.getElementById("jacketImg");
    image.src = product.images[0].src;

    const jacketPrice = document.getElementById("jacketPrice");
    jacketPrice.innerHTML = "Price: " + product.prices.price;

    const header = document.getElementById("header");
    header.innerHTML = product.name;

    if (product.is_in_stock === true) {
      product.is_in_stock = "In stock";
    }

    //stock
    const inStock = document.getElementById("inStock");
    inStock.innerHTML = "Availability: " + product.is_in_stock;
  } catch (error) {
    errorMsg.innerHTML =
      '<div class="error">There was an error. Contact online support at 555-444-333.</div>';
  }
}

renderHTML();
