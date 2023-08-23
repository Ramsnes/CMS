// Retrieve the cart items from session storage
const checkoutItems = JSON.parse(sessionStorage.getItem("checkoutItems")) || [];

// Update the "checkout successful" page with the cart items
function updateCheckoutSuccessfulPage(cart) {
  const productContainer = document.querySelector(".redline-complete");

  // Create product elements and append them to the container
  cart.forEach((item) => {
    const productImage = document.createElement("img");
    productImage.src = item.image;
    productImage.alt = item.title;

    productContainer.appendChild(productImage);
  });
}

// Call the function to update the "checkout successful" page
updateCheckoutSuccessfulPage(checkoutItems);
