// Get the query parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const isCartAvailable = urlParams.get("cart");

if (isCartAvailable === "true") {
  // Fetch the cart items from local storage
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Update the checkout page with the cart items
  updateCheckoutPage(cartItems);
}

// Update the checkout page with the cart items
function updateCheckoutPage(cart) {
  const orderSummary = document.getElementById("orderSummary");

  // Clear the orderSummary element
  orderSummary.innerHTML = "";

  // Create the order summary elements
  const orderText = document.createElement("div");
  orderText.classList.add("order-text");
  const heading = document.createElement("h1");
  heading.textContent = "Order summary:";
  const emptyLine = document.createElement("p");
  emptyLine.textContent = "___";

  orderText.appendChild(heading);
  orderText.appendChild(emptyLine);

  // Create a list of cart items
  cart.forEach((item) => {
    const itemLine = document.createElement("p");
    const quantity = item.quantity ? `x${item.quantity}` : "";
    itemLine.textContent = `${quantity} ${item.title} (${item.price})`;

    const itemImage = document.createElement("img");
    itemImage.src = item.image;
    itemImage.alt = item.title;

    orderText.appendChild(itemLine);
    orderText.appendChild(itemImage);
  });

  orderSummary.appendChild(orderText);

  // Store the cart items in session storage
  sessionStorage.setItem("checkoutItems", JSON.stringify(cart));
}
