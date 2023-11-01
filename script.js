const estados = [];

document.addEventListener("DOMContentLoaded", async function (e) {
  await loadCities();
  hideLoading();
  loopChangingImg();
  setCurrentYear();
  initPhoneMask();
  preventDefaultForm();
  watchUfSelect();
});

function voltarFormulario() {
  window.scrollTo(0, 0);
}

function preventDefaultForm() {
  document
    .getElementById("form-landing")
    .addEventListener("submit", function (event) {
      event.preventDefault();
    });
}

function enviarFormulario() {
  const payload = {
    nome: document.getElementById("name").value,
    email: document.getElementById("email").value,
    empresa: document.getElementById("company").value,
    dddtelefone: document.getElementById("phone").value,
    cidade: document.getElementById("cidade").value,
    estado: document.getElementById("uf").value,
    departamento: document.getElementById("departamento").value,
    mensagem: document.getElementById("comentarios").value,
  };
  showLoading();
  const isValid = validate(payload);

  if (!isValid) {
    hideLoading();
    return false;
  }

  fetch("https://alscodvs.azurewebsites.net/api/publicmarketing", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
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

function validate({
  nome,
  email,
  empresa,
  dddtelefone,
  cidade,
  estado,
  departamento,
  mensagem,
}) {
  if (
    !validateName(nome) ||
    !validateCompany(empresa) ||
    !validateCidade(cidade) ||
    !validateUF(estado) ||
    !validatePhone(dddtelefone) ||
    !validateEmail(email) ||
    !validateDepartamento(departamento) ||
    !validateComentarios(mensagem)
  ) {
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
    alert("Selecione uma cidade");
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

async function loadCities() {
  await fetch("./data/estados-cidades.json")
    .then((json) => json.json())
    .then((states) => estados.push(...states.estados));

  console.log(estados);
}

function watchUfSelect() {
  const uf = document.getElementById("uf");
  const cidade = document.getElementById("cidade");

  uf.addEventListener("change", function () {
    const selectedUf = uf.value;
    const selectedState = estados.find((state) => state.sigla === selectedUf);
    const citiesOptions = [
      `<option value="">${selectedState ? "Cidade" : "Selecione UF"}</option>`,
    ];
    const templateOption = (city) => `<option value="${city}">${city}</option>`;

    if (selectedState) {
      citiesOptions.push(
        ...selectedState.cidades.map((city) => templateOption(city))
      );
    }

    cidade.disabled = !selectedState;
    cidade.innerHTML = citiesOptions;
  });
}
