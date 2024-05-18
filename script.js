document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const resultsTable = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];

    const csvData = `
Produto,Referência,Preço venda,Preço revenda,Qtde,Cód. barras
KV-257 CABO DE SAQUINHO IPHONE,KV-257,"3,5",8,0,7898070364688
Produto 2,REF002,"20,00",15,50,1234567890124
Produto 3,REF003,"15,00",12,75,1234567890125
Produto 4,REF004,"25,00",20,30,1234567890126
`.trim();

    function parseCSV(data) {
        return data.split('\n').map(row => {
            const columns = row.split(',');
            return columns.map(column => column.trim().replace(/(^"|"$)/g, '').replace(',', '.'));
        });
    }

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

    function searchProducts(event) {
        const query = event.target.value.toLowerCase();
        const filteredData = products.filter(row => row.some(cell => cell.toLowerCase().includes(query)));
        displayResults(filteredData);
    }

    const products = parseCSV(csvData);
    displayResults(products);

    searchInput.addEventListener('input', searchProducts);
});
