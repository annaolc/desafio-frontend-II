const form = document.getElementById("userForm");
const mensagemErro = document.getElementById("mensagemErro");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const sobrenome = document.getElementById("sobrenome").value.trim();
    const email = document.getElementById("email").value.trim();
    const idade = parseInt(document.getElementById("idade").value);

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (
      nome.length < 3 || nome.length > 50 ||
      sobrenome.length < 3 || sobrenome.length > 50 ||
      !emailRegex.test(email) ||
      isNaN(idade) || idade < 1 || idade > 120
    ) {
      mensagemErro.textContent = "Preencha todos os campos corretamente.";
      return;
    }

    const dados = { nome, sobrenome, email, idade };
    localStorage.setItem("dadosUsuario", JSON.stringify(dados));
    window.location.href = "confirmation.html";
  });
}

const dadosConfirmacao = document.getElementById("dadosConfirmacao");
const confirmarBtn = document.getElementById("confirmar");

if (dadosConfirmacao && confirmarBtn) {
  const dados = JSON.parse(localStorage.getItem("dadosUsuario"));
  if (dados) {
    dadosConfirmacao.innerHTML = `
      <p><strong>Nome:</strong> ${dados.nome}</p>
      <p><strong>Sobrenome:</strong> ${dados.sobrenome}</p>
      <p><strong>Email:</strong> ${dados.email}</p>
      <p><strong>Idade:</strong> ${dados.idade}</p>
    `;

    confirmarBtn.addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(dados, null, 2)], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "data.json";
      link.click();
      window.location.href = "index.html";
    });
  }
}