document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const resultsTable = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];

    // Função para carregar dados CSV
    async function loadCSV() {
        const response = await fetch('produtos.csv');
        const text = await response.text();

        // Parse CSV usando csv-parse
        const { parse } = require('csv-parse/lib/sync');
        return parse(text, { columns: false, delimiter: ',' });
    }

    // Função para exibir resultados na tabela
    function displayResults(data) {
        resultsTable.innerHTML = '';
        data.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            resultsTable.appendChild(tr);
        });
    }

    // Função de pesquisa
    function searchProducts(event) {
        const query = event.target.value.toLowerCase();
        const filteredData = products.filter(row => row.some(cell => cell.toLowerCase().includes(query)));
        displayResults(filteredData);
    }

    // Carrega os dados CSV e inicializa a pesquisa
    let products = [];
    loadCSV().then(data => {
        products = data;
        displayResults(products);
    });

    // Adiciona o evento de input para a pesquisa
    searchInput.addEventListener('input', searchProducts);
});
