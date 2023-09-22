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

function sendEmail(msg) {
  const apiUrl = "https://aslco-landing-email.onrender.com/send-email";

  const emailData = {
    msg: msg,
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
