function init() {
  hideLoading();
  loopChangingImg();
  setCurrentYear();
  preventDefaultForm();
  initPhoneMask();
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
  sendEmail();
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

function initPhoneMask() {
  const phone = document.getElementById("phone");

  phone.addEventListener("input", function () {
    const numericValue = this.value.replace(/\D/g, "");

    const formattedValue = formatPhoneNumber(numericValue);
    this.value =
      formattedValue.replace(/\D/g, "").length > 0 ? formattedValue : "";
  });
}

function formatPhoneNumber(value) {
  const matches =
    value.length < 11
      ? value.match(/^(\d{0,2})(\d{0,4})(\d{0,4})$/)
      : value.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
  if (matches) {
    const formatted = `(${matches[1]}) ${matches[2]}-${matches[3]}`;
    return formatted.trim();
  }
  return value;
}

function sendEmail() {
  showLoading();

  const apiUrl = "https://aslco-landing-email.onrender.com/send-email";

  const name = document.getElementById("name").value;
  const company = document.getElementById("company").value;
  const cidade = document.getElementById("cidade").value;
  const uf = document.getElementById("uf").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const comentarios = document.getElementById("comentarios").value;

  const emailData = {
    msg: `
    Nome: ${name}\n
    Empresa: ${company}\n
    Localização: ${cidade} / ${uf} \n
    Telefone: ${phone}\n
    E-mail: ${email}\n
    Mensagem: ${comentarios}\n
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
        window.location.href = "./email-enviado.html";
      } else {
        console.error("Erro ao enviar o e-mail");
      }
    })
    .catch((error) => {
      console.error("Erro de rede:", error);
      hideLoading();
    });
}
