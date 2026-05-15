import type { Player } from "@/src/constants/mockData";

const SPREADSHEET_ID = "1pgDIpFuCyutk6R2XA8mbl3WNC8uvE2kjSR7qo-5M400";
const SHEET_NAME = "geral";

const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;

function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (const char of line) {
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current.trim());
  return values;
}

function parseCSV(text: string): string[][] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map(parseCSVLine);
}

function findColumn(headers: string[], ...keywords: string[]): number {
  return headers.findIndex((h) => {
    const normalized = h.toLowerCase().replace(/[""]/g, "");
    return keywords.some((kw) => normalized.includes(kw.toLowerCase()));
  });
}

function cleanCell(value: string | undefined): string {
  return (value ?? "").replace(/^"|"$/g, "").trim();
}

function parseIntSafe(value: string | undefined): number {
  const cleaned = cleanCell(value).replace(",", ".");
  const num = parseInt(cleaned, 10);
  return isNaN(num) ? 0 : num;
}

export async function fetchPlayersFromSheet(): Promise<Player[]> {
  const response = await fetch(CSV_URL, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    console.error(`Erro ao buscar planilha: ${response.status} ${response.statusText}`);
    return [];
  }

  const text = await response.text();
  const rows = parseCSV(text);

  if (rows.length < 2) return [];

  const headers = rows[0];

  const atletaIdx = findColumn(headers, "atleta");
  const golsIdx = findColumn(headers, "gols");
  const assistIdx = findColumn(headers, "assist");
  const caIdx = findColumn(headers, "c.a");
  const cvIdx = findColumn(headers, "c.v");
  const jogosIdx = findColumn(headers, "jogos");

  if (atletaIdx === -1) {
    console.error("Coluna ATLETA não encontrada. Headers:", headers);
    return [];
  }

  return rows
    .slice(1)
    .filter((row) => cleanCell(row[atletaIdx]).length > 0)
    .map((row) => ({
      nome: cleanCell(row[atletaIdx]),
      gols: parseIntSafe(row[golsIdx]),
      assistencias: parseIntSafe(row[assistIdx]),
      jogos: parseIntSafe(row[jogosIdx]),
      cartoesAmarelos: parseIntSafe(row[caIdx]),
      cartoesVermelhos: parseIntSafe(row[cvIdx]),
    }));
}
