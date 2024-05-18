document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const resultsTable = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];

    // Dados CSV como variável JavaScript
    const csvData = `
Produto,Referência,Preço venda,Preço revenda,Qtde,Cód. barras
KV-257 CABO DE SAQUINHO IPHONE,KV-257,"3,5",8,0,7898070364688
Produto 2,REF002,"20,0",15,0,1234567890124
Produto 3,REF003,"15,0",12,0,1234567890125
Produto 4,REF004,"25,0",20,0,1234567890126
`.trim();

    // Função para carregar dados CSV e tratar vírgulas nos preços
    function parseCSV(data) {
        // Regex para capturar valores entre aspas
        const regex = /(".*?"|[^",\s]+)(?=\s*,|\s*$)/g;
        return data.split('\n').map(row => {
            return [...row.matchAll(regex)].map(match => match[0].replace(/(^"|"$)/g, '').replace(',', '.'));
        });
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
    const products = parseCSV(csvData);
    displayResults(products);

    // Adiciona o evento de input para
