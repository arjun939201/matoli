function normalize(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlight(text, query) {
  const pattern = new RegExp(`(${escapeRegex(query)})`, "gi");
  return text.replace(pattern, '<span class="highlight">$1</span>');
}

const input = document.getElementById("searchInput");
const table = document.getElementById("resultsTable");
const tbody = document.getElementById("resultsBody");

function displayResults(query) {
  tbody.innerHTML = '';
  const normQuery = normalize(query.trim());
  let found = false;

  if (!normQuery) {
    table.style.display = 'none';
    return;
  }

  dictionary.forEach(entry => {
    const normTelugu = normalize(entry.telugu);
    const normTrans = normalize(entry.transliteration);
    const normMeaning = normalize(entry.meaning);
    const match = normTelugu.includes(normQuery) || normTrans.includes(normQuery) || normMeaning.includes(normQuery);

    if (match) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.telugu}</td>
        <td>${highlight(entry.transliteration, query)}</td>
        <td>${entry.type}</td>
        <td>${highlight(entry.meaning, query)}</td>
      `;
      tbody.appendChild(row);
      found = true;
    }
  });

  table.style.display = found ? 'table' : 'none';
}

input.addEventListener('input', () => {
  displayResults(input.value);
});
