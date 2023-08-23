// Fetch cart items from local storage
function fetchCartItems() {
  // Get the cart from local storage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Get the cartItems and cartButtons elements
  const cartItems = document.getElementById("cartItems");
  const emptyCartMessage = document.getElementById("emptyCartMessage");
  const cartButtons = document.getElementById("cartButtons");

  // Clear the cartItems element
  cartItems.innerHTML = "";

  // If the cart is empty, display the empty cart message and hide the cart buttons
  if (cart.length === 0) {
    emptyCartMessage.style.display = "block";
    cartButtons.style.display = "none";
    cartItems.style.display = "none"; // Hide the cartItems element
  } else {
    emptyCartMessage.style.display = "none";
    cartButtons.style.display = "flex";
    cartItems.style.display = "flex";

    // Calculate the total price
    let totalPrice = 0;

    // Render each cart item
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      const title = document.createElement("p");
      title.textContent = item.title;
      cartItem.appendChild(title);

      const priceElement = document.createElement("p");
      const itemPrice = parseFloat(item.price);

      // Check if the parsed itemPrice is a valid number
      if (!isNaN(itemPrice)) {
        priceElement.textContent = itemPrice.toFixed(2);
        totalPrice += itemPrice;
      } else {
        priceElement.textContent = "Invalid Price";
      }

      cartItem.appendChild(priceElement);

      const imageElement = document.createElement("img");
      imageElement.src = item.image;
      imageElement.alt = item.title;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";

      // Pass the item.id as an argument to removeFromCart function
      removeButton.addEventListener("click", () => removeFromCart(item.id));

      cartItem.appendChild(imageElement);
      cartItem.appendChild(removeButton);

      cartItems.appendChild(cartItem);
    });

    // Update the checkout page with the cart items and total price
    updateCheckoutPage(cart, totalPrice);
  }
}

// Remove item from cart
function removeFromCart(itemId) {
  // Get the cart from local storage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Filter out the item to remove
  const updatedCart = cart.filter((item) => item.id !== itemId);

  // Save the updated cart back to local storage
  localStorage.setItem("cart", JSON.stringify(updatedCart));

  // Fetch and render the updated cart items
  fetchCartItems();
}

// Update the checkout page with the cart items and total price
function updateCheckoutPage(cart, totalPrice) {
  // Update the cart items display (e.g., updating the DOM elements)

  // Update the total price element
  const totalPriceElement = document.getElementById("totalPrice");
  totalPriceElement.textContent = isNaN(totalPrice)
    ? "Invalid Total Price"
    : totalPrice.toFixed(2);
}

// Call the fetchCartItems function to populate the cart and handle empty cart message
fetchCartItems();
