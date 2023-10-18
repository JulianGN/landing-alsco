function init() {
  hideLoading();
  loopChangingImg();
  setCurrentYear();
  initPhoneMask();
}

function voltarFormulario() {
  window.scrollTo(0, 0);
}

function enviarFormulario() {
  const isValid = validate();

  if (!isValid) {
    return false;
  }

  return true;
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

function validate() {
  showLoading();

  const name = document.getElementById("name").value;
  const company = document.getElementById("company").value;
  const cidade = document.getElementById("cidade").value;
  const uf = document.getElementById("uf").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const departamento = document.getElementById("departamento").value;
  const comentarios = document.getElementById("comentarios").value;

  if (
    !validateName(name) ||
    !validateCompany(company) ||
    !validateCidade(cidade) ||
    !validateUF(uf) ||
    !validatePhone(phone) ||
    !validateEmail(email) ||
    !validateDepartamento(departamento) ||
    !validateComentarios(comentarios)
  ) {
    hideLoading();
    return false;
  }

  return true;
}

function validateName(name) {
  if (name.length < 3 || /^\d/.test(name)) {
    alert("Nome precisa ter ao menos 3 caracteres e começar com letras.");
    return false;
  }
  return true;
}

function validateCompany(company) {
  if (company.length < 3) {
    alert("Empresa precisa ter ao menos 3 letras.");
    return false;
  }
  return true;
}

function validateCidade(cidade) {
  if (cidade.length < 3 || /^\d/.test(cidade)) {
    alert("Cidade precisa ter ao menos 3 caracteres e começar com letras.");
    return false;
  }
  return true;
}

function validateUF(uf) {
  if (uf.length !== 2) {
    alert("UF precisa ter 2 caracteres.");
    return false;
  }
  return true;
}

function validatePhone(phone) {
  if (!/^[0-9 ()-]*$/.test(phone)) {
    alert("Verifique o telefone.");
    return false;
  }
  return true;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Verifique o e-mail inserido.");
    return false;
  }
  return true;
}

function validateDepartamento(departamento) {
  if (!departamento) {
    alert("Selecione um departamento");
    return false;
  }
  return true;
}

function validateComentarios(comentarios) {
  if (comentarios.length < 3) {
    alert("Por favor, detalhe mais sua mensagem.");
    return false;
  }
  return true;
}
