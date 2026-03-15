import { useState } from "react";
import type { TabuCard } from "./types/tabuCard.interface";
import { cardService } from "./services/cardService";

const TABU_WORDS = 4;

export function CardForm({ initial, themeId, onSave, onCancel }: {
  initial?: Partial<TabuCard>;
  themeId: number;
  onSave: (data: Omit<TabuCard, "id">) => void;
  onCancel: () => void;
}) {
  const [word, setWord] = useState(initial?.word || "");
  const [tabuWords, setTabuWords] = useState<string[]>(
    Array.from({ length: TABU_WORDS }, (_, i) => initial?.forbiddenWords?.[i] || "")
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleWordChange = (index: number, value: string) => {
    setTabuWords(prev => prev.map((w, i) => i === index ? value : w));
  };

  const forbiddenWords = tabuWords.map(w => w.trim()).filter(Boolean);
  const valid = word.trim().length > 0 && forbiddenWords.length === TABU_WORDS;

  const handleSave = async () => {
    if (!valid) return;
    setLoading(true);
    try {
    await cardService.create({      
      keyword: word.trim(),
      themeId: themeId,             
      forbiddenWords: forbiddenWords,
    });
      onSave({ word: word.trim(), forbiddenWords });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

      <div>
        <label className="td-label">Palabra a adivinar</label>
        <input
          className="form-control td-input td-input-word fw-bold"
          value={word}
          onChange={e => setWord(e.target.value)}
          placeholder="Palabra prohibida"
          autoFocus
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <label className="td-label">Palabras tabú</label>
        {tabuWords.map((w, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--td-acento, #e63946)", width: "1.4rem", textAlign: "center", flexShrink: 0 }}>
              {i + 1}.
            </span>
            <input
              className="form-control td-input td-input-mono"
              value={w}
              onChange={e => handleWordChange(i, e.target.value)}
              placeholder={`Palabra ${i + 1}...`}
              style={{ flex: 1 }}
            />
          </div>
        ))}
      </div>

      {error && <p className="text-danger mb-0">{error}</p>}

      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end", marginTop: "0.25rem" }}>
        <button className="btn td-btn-sec px-3 py-2" onClick={onCancel}>Cancelar</button>
        <button
          className="btn td-btn-acento px-3 py-2"
          onClick={handleSave}
          disabled={!valid || loading}
        >
          {loading ? "Guardando..." : "Guardar tarjeta"}
        </button>
      </div>
    </div>
  );
}