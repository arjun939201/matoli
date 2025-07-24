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

// Normalize: remove accents/diacritics for matching
function normalize(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlight(text, query) {
  if (!query) return text;
  const pattern = new RegExp(`(${escapeRegex(query)})`, 'gi');
  return text.replace(pattern, '<span class="highlight">$1</span>');
}

function displayResults(query) {
  tbody.innerHTML = '';
  if (!query.trim()) {
    table.style.display = "none";
    return;
  }

  const normQuery = normalize(query);
  let found = false;

  dictionary.forEach(entry => {
    const telugu = entry.telugu.toLowerCase();
    const translit = normalize(entry.transliteration);
    const meaning = normalize(entry.meaning);

    const match = telugu.includes(query) ||
                  translit.includes(normQuery) ||
                  meaning.includes(normQuery);

    if (match) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${highlight(entry.telugu, query)}</td>
        <td>${highlight(entry.transliteration, query)}</td>
        <td>${entry.type}</td>
        <td>${highlight(entry.meaning, query)}</td>
      `;
      tbody.appendChild(row);
      found = true;
    }
  });

  table.style.display = found ? "table" : "none";
}

input.addEventListener('input', () => {
  displayResults(input.value);
});
