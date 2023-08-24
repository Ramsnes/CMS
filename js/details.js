const baseUrl = "https://cors.noroff.dev/ramsnes.no/wp-json/wc/store";
const errorMsg = document.querySelector(".loadingClass");

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
    document.title = `Martial-arts - ${product.title}`;

    const description = document.getElementById("description");
    description.innerHTML = product.description;

    const image = document.getElementById("jacketImg");
    image.src = product.images[0].src;

    const jacketPrice = document.getElementById("jacketPrice");
    jacketPrice.innerHTML = "Price: " + product.prices.price;

    const header = document.getElementById("header");
    header.innerHTML = product.name;

    const sizes = document.getElementById("sizes");
    sizes.innerHTML = "Sizes available: " + product.sizes;

    // cart code
    const addToCartButton = document.getElementById("addToCartButton");
    addToCartButton.addEventListener("click", addToCart);

    function addToCart(event) {
      event.preventDefault();

      // Get the product data from the page
      const id = getProductId();
      const title = product.title;
      const price = product.price;
      const image = product.image;

      // Create a cart item object
      const cartItem = {
        id,
        title,
        price,
        image,
      };

      // Check if the cart exists in local storage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Add the item to the cart
      cart.push(cartItem);

      // Save the updated cart back to local storage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Provide visual feedback to the user
      const notification = document.createElement("div");
      notification.classList.add("notification", "hide"); // Add "hide" class to hide initially
      notification.textContent = "Product added to cart!";
      document.body.appendChild(notification);

      // Trigger reflow to enable CSS animation
      void notification.offsetWidth;

      // Show the notification
      notification.classList.remove("hide");

      // Remove the notification after a certain duration (e.g., 3 seconds)
      setTimeout(function () {
        notification.classList.add("hide");
        setTimeout(function () {
          notification.remove();
        }, 300);
      }, 2000);
    }
  } catch (error) {
    errorMsg.innerHTML =
      '<div class="error">There was an error. Contact online support at 555-444-333.</div>';
  }
}

renderHTML();
