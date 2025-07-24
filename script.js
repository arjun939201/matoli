const dictionary = [
  {
    telugu: "నుడి",
    transliteration: "nuḍi",
    type: "n.",
    meaning: "language"
  },
  {
    telugu: "చదువు",
    transliteration: "chaduvu",
    type: "n.",
    meaning: "education"
  },
  {
    telugu: "తిండి",
    transliteration: "tiṇḍi",
    type: "n.",
    meaning: "food"
  },
  {
    telugu: "స్నేహం",
    transliteration: "snēhaṁ",
    type: "n.",
    meaning: "friendship"
  },
  {
    telugu: "నెసరు",
    transliteration: "nesaru",
    type: "n.",
    meaning: "sun"
  }
];

const input = document.getElementById('searchInput');
const tableBody = document.getElementById('resultsBody');

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlight(text, query) {
  if (!query) return text;
  const safeQuery = escapeRegex(query);
  const pattern = new RegExp(`(${safeQuery})`, 'gi');
  return text.replace(pattern, '<span class="highlight">$1</span>');
}

function displayResults(query = '') {
  tableBody.innerHTML = '';

  const lowerQuery = query.toLowerCase();

  dictionary.forEach(entry => {
    const combined = `${entry.telugu} ${entry.transliteration} ${entry.meaning}`.toLowerCase();
    
    if (combined.includes(lowerQuery)) {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${highlight(entry.telugu, query)}</td>
        <td>${highlight(entry.transliteration, query)}</td>
        <td>${entry.type}</td>
        <td>${highlight(entry.meaning, query)}</td>
      `;

      tableBody.appendChild(row);
    }
  });
}

// Show all on first load
displayResults();

input.addEventListener('input', () => {
  displayResults(input.value.trim());
});
