const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    faqQuestions.forEach((item) => {
      if (item !== question) {
        item.classList.remove("active");
        item.nextElementSibling.style.maxHeight = null;
      }
    });

    question.classList.toggle("active");

    const answer = question.nextElementSibling;

    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

window.onload = function () {
  // Reset the form fields when the page loads
  document.getElementById("quote-form").reset();
};

const form = document.getElementById("quote-form");

form.addEventListener("submit", function (e) {
  const hCaptcha = form.querySelector(
    "textarea[name=h-captcha-response]"
  ).value;

  if (!hCaptcha) {
    e.preventDefault();
    alert("Please fill out captcha field");
    return;
  }
});

const result = document.getElementById("name");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  // Get the name input value
  const name = formData.get("name");

  // Create a custom subject
  const subject = `${name} requested a quote for EZ Dump Disposal Services`;

  // Append the custom subject to the form data
  formData.append("subject", subject);

  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 3000);
    });
});
