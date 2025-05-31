const frases = [
    "Você é mais forte do que pensa.",
    "Cada dia é uma nova chance.",
    "A sua saúde mental importa!",
    "Seja gentil consigo mesmo.",
    "Tudo bem não estar bem."
];

let indiceFrase = 0;

function mudarFrase(direcao) {
    indiceFrase += direcao;
    if (indiceFrase < 0) indiceFrase = frases.length - 1;
    if (indiceFrase >= frases.length) indiceFrase = 0;
    document.getElementById("fraseMotivacional").textContent = frases[indiceFrase];
}

function salvarDiario() {
    const texto = document.getElementById("diarioTexto").value;
    if (texto.trim() === "") {
        document.getElementById("mensagemDiario").textContent = "Digite algo para salvar.";
        return;
    }
    localStorage.setItem("diarioMental", texto);
    document.getElementById("mensagemDiario").textContent = "Texto salvo com sucesso!";
}

let dadosIniciais = [0, 0, 0, 0, 0, 0, 0];

const ctx = document.getElementById("graficoResumo").getContext("2d");
const grafico = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
        datasets: [{
            label: "Nível de Humor",
            data: dadosIniciais,
            backgroundColor: "#E59013"
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 4,
                ticks: {
                    stepSize: 1,
                    callback: function (value) {
                        return ["", "Ruim", "Regular", "Bom", "Ótimo"][value];
                    }
                }
            }
        }
    }
});

function selecionarHumor(nivel) {
    const caminhos = {
        ruim: "./assets/img/icone-ruim.png",
        regular: "./assets/img/icone-regular.png",
        bom: "./assets/img/icone-bom.png",
        otimo: "./assets/img/icone-otimo.png"
    };


    const valores = {
        ruim: 1,
        regular: 2,
        bom: 3,
        otimo: 4
    };

    document.getElementById("imgHumorSelecionado").src = caminhos[nivel];

    const dia = new Date().getDay();
    const posicao = dia === 0 ? 6 : dia - 1;
    dadosIniciais[posicao] = valores[nivel];
    grafico.update();

    const img = document.getElementById("imgHumorSelecionado");
    img.src = caminhos[nivel];
    img.style.display = "block";

}
