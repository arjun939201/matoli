const dictionary = [
  { telugu: "నుడి", transliteration: "nuḍi", type: "n.", meaning: "language" },
  { telugu: "చదువు", transliteration: "chaduvu", type: "n.", meaning: "education" },
  { telugu: "తిండి", transliteration: "tiṇḍi", type: "n.", meaning: "food" },
  { telugu: "స్నేహం", transliteration: "snēhaṁ", type: "n.", meaning: "friendship" },
  { telugu: "నెసరు", transliteration: "nesaru", type: "n.", meaning: "sun" }
];

const input = document.getElementById('searchInput');
const table = document.getElementById('resultsTable');
const tbody = document.getElementById('resultsBody');

// Remove diacritics from IAST for ASCII matching (e.g., nuḍi → nudi)
function normalize(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlight(text, query) {
  const pattern = new RegExp(`(${escapeRegex(query)})`, "gi");
  return text.replace(pattern, '<span class="highlight">$1</span>');
}

function displayResults(query) {
  const normalizedQuery = normalize(query.trim());
  tbody.innerHTML = '';
  let found = false;

  if (!normalizedQuery) {
    table.style.display = 'none';
    return;
  }

  dictionary.forEach(entry => {
    const telugu = entry.telugu;
    const translit = normalize(entry.transliteration);
    const meaning = normalize(entry.meaning);

    const combined = `${normalize(telugu)} ${translit} ${meaning}`;

    if (combined.includes(normalizedQuery)) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${telugu}</td>
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

// Bind input event
input.addEventListener('input', () => {
  displayResults(input.value);
});
