function init() {
  hideLoading();
  loopChangingImg();
  setCurrentYear();
  preventDefaultForm();
}

function preventDefaultForm() {
  document
    .getElementById("form-landing")
    .addEventListener("submit", function (event) {
      event.preventDefault();
    });
}

function voltarFormulario() {
  window.scrollTo(0, 0);
}

function enviarFormulario() {
  window.location.href = "./email-enviado.html";
}

function showLoading() {
  const loadingContainer = document.getElementById("loading");

  loadingContainer.classList.remove("d-none");
  loadingContainer.classList.add("d-block");
}

function hideLoading() {
  const loadingContainer = document.getElementById("loading");

  loadingContainer.classList.remove("d-block");
  loadingContainer.classList.add("d-none");
}

function changingImg() {
  const imgs = document.querySelectorAll(".img-sobre-conteudo");
  imgs.forEach((img) => img.classList.toggle("ativa"));
}

function loopChangingImg() {
  setInterval(() => {
    changingImg();
  }, 5000);
}

function setCurrentYear() {
  document.getElementById("current-year").innerText = new Date().getFullYear();
}

function sendEmail() {
  const apiUrl = "https://aslco-landing-email.onrender.com/send-email";

  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const company = document.getElementById("company").value;
  const cidade = document.getElementById("cidade").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const comentarios = document.getElementById("comentarios").value;

  const emailData = {
    msg: `
    ${firstname}\n
    ${lastname}\n
    ${company}\n
    ${cidade}\n
    ${phone}\n
    ${email}\n
    ${comentarios}\n
    `,
  };

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailData),
  })
    .then((response) => {
      if (response.ok) {
        console.log("E-mail enviado com sucesso");
      } else {
        console.error("Erro ao enviar o e-mail");
      }
    })
    .catch((error) => {
      console.error("Erro de rede:", error);
    });
}
