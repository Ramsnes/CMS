const name = document.getElementById("name");
const email = document.getElementById("email");
const tel = document.getElementById("tel");
const message = document.getElementById("message");
const form = document.getElementById("form");
const errorElement = document.getElementById("error");

form.addEventListener("submit", (e) => {
  let messages = [];
  if (name.value === "" || name.value == null) {
    messages.push("A name is required");
  }
  if (email.value === "" || email.value == null) {
    messages.push("An email address is required");
  }
  if (tel.value === "" || tel.value == null) {
    messages.push("A phone number is required");
  }
  if (message.value === "" || message.value == null) {
    messages.push("A message is required");
  }

  if (message.value.length <= 12) {
    messages.push("Message must be of 12 or more characters");
  }

  if (message.value.length >= 100) {
    messages.push("Message must be less than 100 or more characters");
  }

  if (tel.value.length <= 6) {
    messages.push("Phone number must be of 6 or more numbers");
  }

  if (messages.length > 0) {
    e.preventDefault(); //prevents page reload
    errorElement.innerText = messages.join(", "); //all error messages joined, each separated by a comma
  }
});
