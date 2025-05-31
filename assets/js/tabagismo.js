function registrarTabagismo() {
    const cigarrosDia = parseInt(document.getElementById('cigarrosDia').value) || 0;
    const anosFumando = parseInt(document.getElementById('anosFumando').value) || 0;
    document.getElementById('infoTabagismo').textContent =
        `Você fuma ${cigarrosDia} cigarros por dia há ${anosFumando} anos.`;

    atualizarGrafico(cigarrosDia, null);
}

function registrarAlcoolismo() {
    const frequencia = parseInt(document.getElementById('frequenciaAlcool').value) || 0;
    const quantidade = parseInt(document.getElementById('quantidadeAlcool').value) || 0;
    const consumoSemanal = frequencia * quantidade;

    document.getElementById('infoAlcoolismo').textContent =
        `Consumo semanal: ${consumoSemanal} ml.`;

    atualizarGrafico(null, consumoSemanal);
}

// Gráfico de barras
let grafico;
let dadosGrafico = [0, 0];

function atualizarGrafico(cigarros, alcool) {
    if (cigarros !== null) dadosGrafico[0] = cigarros;
    if (alcool !== null) dadosGrafico[1] = alcool;

    if (!grafico) {
        const ctx = document.getElementById('graficoResumo').getContext('2d');
        grafico = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Cigarros/dia', 'Álcool (ml/sem)'],
                datasets: [{
                    label: 'Seus Dados',
                    backgroundColor: ['#D0D919', '#D0D919'],
                    data: dadosGrafico
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        grafico.data.datasets[0].data = dadosGrafico;
        grafico.update();
    }
}

// Frases motivacionais
const frases = [
    'Você é mais forte do que pensa.',
    'Cada pequeno passo conta.',
    'Cuidar de si é um ato de amor próprio.'
];
let indiceFrase = 0;

function mudarFrase(direcao) {
    indiceFrase = (indiceFrase + direcao + frases.length) % frases.length;
    const fraseEl = document.getElementById('fraseMotivacional');
    fraseEl.style.opacity = 0;
    setTimeout(() => {
        fraseEl.textContent = frases[indiceFrase];
        fraseEl.style.opacity = 1;
    }, 300);
}