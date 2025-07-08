import '../style.css';

export async function ScoreboardPage(): Promise<HTMLElement> {
  const element = document.createElement('div');
  element.className = 'p-6 flex flex-col items-center';

  const title = document.createElement('h2');
  title.className = 'text-3xl font-bold text-cyan-400 mb-6';
  title.textContent = 'Blockchain Tournament Scores';
  element.appendChild(title);

  const table = document.createElement('table');
  table.className = 'min-w-full bg-gray-800 rounded-lg shadow-lg';
  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th class="px-4 py-2 text-purple-300">#</th>
      <th class="px-4 py-2 text-pink-300">Winner</th>
      <th class="px-4 py-2 text-cyan-300">Score</th>
      <th class="px-4 py-2 text-gray-300">Block</th>
    </tr>
  `;
  table.appendChild(thead);
  const tbody = document.createElement('tbody');
  tbody.id = 'scoreboard-tbody';
  table.appendChild(tbody);
  element.appendChild(table);

  try {
    const res = await fetch('/score/all');
    const data = await res.json();
    if (Array.isArray(data)) {
      data.forEach((entry, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="px-4 py-2 text-center">${idx + 1}</td>
          <td class="px-4 py-2 text-center">${entry.winner}</td>
          <td class="px-4 py-2 text-center">${entry.score}</td>
          <td class="px-4 py-2 text-center">${entry.blockNumber || '-'}</td>
        `;
        tbody.appendChild(tr);
      });
    } else {
      tbody.innerHTML = '<tr><td colspan="4" class="text-center text-gray-400">No scores found.</td></tr>';
    }
  } catch (e) {
    tbody.innerHTML = '<tr><td colspan="4" class="text-center text-red-400">Error loading scores.</td></tr>';
  }

  return element;
}
