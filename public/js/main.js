document.addEventListener("DOMContentLoaded", () => {
    const formPet = document.getElementById("formPet");
    const formVacina = document.getElementById("formVacina");
    const formServico = document.getElementById("formServico"); // <-- NOVO
    
    if (formPet) {
        formPet.addEventListener("submit", cadastrarPet);
        listarPets();
    }
    
    if (formVacina) {
        formVacina.addEventListener("submit", adicionarVacina);
        formServico.addEventListener("submit", adicionarServico); // <-- NOVO
        mostrarDetalhesPet();
    }
});

// Funções do Pet (Home)
async function cadastrarPet(e) {
    e.preventDefault();
    const dados = {
        nome: document.getElementById("nome").value,
        especie: document.getElementById("especie").value,
        raca: document.getElementById("raca").value,
        data_nascimento: document.getElementById("data_nascimento").value,
        endereco: document.getElementById("endereco").value
    };

    await fetch('/api/pets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
    formPet.reset();
    listarPets();
}

async function listarPets() {
    const res = await fetch('/api/pets');
    const pets = await res.json();
    const lista = document.getElementById("listaPets");
    lista.innerHTML = "";

    pets.forEach(pet => {
        lista.innerHTML += `
            <div class="card-pet">
                <h3>${pet.nome}</h3>
                <p>${pet.especie} - ${pet.raca || 'Sem raça'}</p>
                <button onclick="verPet(${pet.id}, '${pet.nome}')">Ver Carteira</button>
            </div>
        `;
    });
}

function verPet(id, nome) {
    localStorage.setItem("selectedPetId", id);
    localStorage.setItem("selectedPetNome", nome);
    window.location.href = "/pets-page";
}

function mostrarDetalhesPet() {
    const nome = localStorage.getItem("selectedPetNome");
    document.getElementById("nomePetTitulo").innerText = `🐾 Carteira de: ${nome}`;
    listarVacinas();
    listarServicos(); // <-- NOVO
}

// Funções de Vacinas
async function adicionarVacina(e) {
    e.preventDefault();
    const petId = localStorage.getItem("selectedPetId");
    const dados = {
        nome_vacina: document.getElementById("nomeVacina").value,
        data_aplicada: document.getElementById("dataAplicada").value,
        proxima_dose: document.getElementById("proximaDose").value,
        alerta_antecedencia_dias: document.getElementById("antecedencia").value,
        PetId: petId
    };

    await fetch('/api/vacinas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
    formVacina.reset();
    listarVacinas();
}

async function listarVacinas() {
    const petId = localStorage.getItem("selectedPetId");
    const res = await fetch(`/api/vacinas/${petId}`);
    const vacinas = await res.json();
    const lista = document.getElementById("listaVacinas");
    lista.innerHTML = "";

    vacinas.forEach(v => {
        let alertaHtml = "";
        if (v.emitirAlerta) {
            alertaHtml = `<div class="alerta">⚠️ <strong>Atenção!</strong> A vacina está próxima! Faltam apenas ${v.diasRestantes} dias.</div>`;
        }

        lista.innerHTML += `
            <div class="vacina-item">
                <h3>${v.nome_vacina}</h3>
                <p>Aplicada em: ${v.data_aplicada} | <strong>Próxima dose: ${v.proxima_dose}</strong></p>
                ${alertaHtml}
            </div>
        `;
    });
}

// --- NOVAS FUNÇÕES PARA BANHO E TOSA ---
async function adicionarServico(e) {
    e.preventDefault();
    const petId = localStorage.getItem("selectedPetId");
    const dados = {
        tipo_servico: document.getElementById("tipoServico").value,
        data_servico: document.getElementById("dataServico").value,
        horario_chegada: document.getElementById("horarioChegada").value,
        horario_saida: document.getElementById("horarioSaida").value,
        local_servico: document.getElementById("localServico").value,
        contato_local: document.getElementById("contatoLocal").value,
        PetId: petId
    };

    await fetch('/api/servicos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
    document.getElementById("formServico").reset();
    listarServicos();
}

async function listarServicos() {
    const petId = localStorage.getItem("selectedPetId");
    const res = await fetch(`/api/servicos/${petId}`);
    const servicos = await res.json();
    const lista = document.getElementById("listaServicos");
    lista.innerHTML = "";

    servicos.forEach(s => {
        lista.innerHTML += `
            <div class="vacina-item" style="border-left: 6px solid #2ecc71;">
                <h3>🧼 ${s.tipo_servico}</h3>
                <p><strong>Data:</strong> ${s.data_servico} | <strong>Chegada:</strong> ${s.horario_chegada || 'N/A'} | <strong>Saída:</strong> ${s.horario_saida || 'N/A'}</p>
                <p><strong>Local:</strong> ${s.local_servico} ${s.contato_local ? `(${s.contato_local})` : ''}</p>
            </div>
        `;
    });
}