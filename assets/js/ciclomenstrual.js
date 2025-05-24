document.addEventListener("DOMContentLoaded", () => {
    let grafico;

    window.registrarCiclo = function () {
        const inicio = document.getElementById("inicioCiclo").value;
        const fim = document.getElementById("fimCiclo").value;

        if (!inicio || !fim) {
            alert("Selecione as datas!");
            return;
        }

        const dataInicio = new Date(inicio);
        const dataFim = new Date(fim);

        if (dataFim <= dataInicio) {
            alert("A data de fim deve ser posterior à de início.");
            return;
        }

        const duracaoCiclo = 28;
        const proximo = new Date(dataInicio);
        proximo.setDate(proximo.getDate() + duracaoCiclo);

        const dataOvulacao = new Date(dataInicio);
        dataOvulacao.setDate(dataInicio.getDate() + Math.floor(duracaoCiclo / 2));

        document.querySelector(".botao-data").textContent = proximo.toLocaleDateString("pt-BR");

        document.querySelector(".alerta-ovulacao").innerHTML =
            `<span class="icone-ovulacao">🔔</span> Ovulação prevista para ${dataOvulacao.toLocaleDateString("pt-BR")}`;

        atualizarGrafico(dataInicio, dataOvulacao, proximo);
    };

    function atualizarGrafico(dataInicio, dataOvulacao, proximoCiclo) {
        const ctx = document.getElementById("graficoResumo");
        if (!ctx) return;

        const dias = [
            1,
            Math.floor((dataOvulacao - dataInicio) / (1000 * 60 * 60 * 24)),
            Math.floor((proximoCiclo - dataInicio) / (1000 * 60 * 60 * 24))
        ];

        if (grafico) grafico.destroy();

        grafico = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Início', 'Ovulação', 'Próximo'],
                datasets: [{
                    label: 'Dias desde o início',
                    data: dias,
                    backgroundColor: ['#b5c3ff', '#f1c981', '#6c73c6'],
                    borderRadius: 10
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Dias'
                        }
                    }
                }
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2, // largura / altura = 2
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Dias'
                        }
                    }
                }
            }


        });
    }


});

