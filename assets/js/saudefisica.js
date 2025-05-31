let registros = [];
let dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
let grafico;

function registrarAtividade() {
    const duracaoInput = document.getElementById('duracao').value;
    const atividade = document.getElementById('atividade').value;

    if (!atividade || !duracaoInput) {
        alert('Preencha todos os campos.');
        return;
    }

    const [horas, minutos] = duracaoInput.split(':').map(Number);
    const totalMinutos = horas * 60 + minutos;

    if (registros.length >= 7) registros.shift();
    registros.push(totalMinutos);

    atualizarGrafico();
}

function atualizarGrafico() {
    const ctx = document.getElementById('graficoBarras').getContext('2d');
    if (grafico) grafico.destroy();

    grafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dias.slice(-registros.length),
            datasets: [{
                label: 'Minutos de atividade',
                data: registros,
                backgroundColor: '#4EAFE4'
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
}

function calcularSono() {
    const dormiu = document.getElementById('horaDormiu').value;
    const acordou = document.getElementById('horaAcordou').value;
    const infoSono = document.getElementById('infoSono');

    if (!dormiu || !acordou) {
        alert('Informe os dois horários.');
        return;
    }

    const [h1, m1] = dormiu.split(':').map(Number);
    const [h2, m2] = acordou.split(':').map(Number);

    let minutosDormidos = ((h2 * 60 + m2) - (h1 * 60 + m1));
    if (minutosDormidos < 0) minutosDormidos += 24 * 60;

    const horas = Math.floor(minutosDormidos / 60);
    const minutos = minutosDormidos % 60;

    infoSono.textContent = `Meta: 8h | Você dormiu: ${horas}h ${minutos}min`;
}

const smallCups = document.querySelectorAll('.cup-small');
const listers = document.getElementById('liters');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');

updateBigCup();

smallCups.forEach((cup, idx) => {
    cup.addEventListener('click', () => highlightCups(idx));
});

function highlightCups(idx) {
    if (smallCups[idx].classList.contains('full') &&
        !smallCups[idx].nextElementSibling?.classList.contains('full')) {
        idx--;
    }

    smallCups.forEach((cup, i) => {
        cup.classList.toggle('full', i <= idx);
    });

    updateBigCup();
}

function updateBigCup() {
    const fullCups = document.querySelectorAll('.cup-small.full').length;
    const totalCups = smallCups.length;

    if (fullCups === 0) {
        percentage.style.visibility = 'hidden';
        percentage.style.height = 0;
    } else {
        percentage.style.visibility = 'visible';
        percentage.style.height = `${fullCups / totalCups * 150}px`;
        percentage.innerText = `${(fullCups / totalCups * 100).toFixed(0)}%`;
    }

    if (fullCups === totalCups) {
        remained.style.visibility = "hidden";
        remained.style.height = 0;
    } else {
        remained.style.visibility = 'visible';
        listers.innerText = `${(2 - (250 * fullCups / 1000)).toFixed(2)}L`;
    }
}
