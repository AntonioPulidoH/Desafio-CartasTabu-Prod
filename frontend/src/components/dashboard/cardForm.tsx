import { useState } from "react";
import type { TabuCard } from "./types/tabuCard.interface";
import { createCard } from "./actions/createCard";

export function CardForm({ initial, themeId, onSave, onCancel }: {
  initial?: Partial<TabuCard>;
  themeId: number;
  onSave: (data: Omit<TabuCard, "id">) => void;
  onCancel: () => void;
}) {
  const [word, setWord] = useState(initial?.word || "");
  const [tabuInput, setTabuInput] = useState((initial?.forbiddenWords || []).join(", "));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const forbiddenWords = tabuInput.split(",").map((s) => s.trim()).filter(Boolean);
  const valid = word.trim().length > 0 && forbiddenWords.length >= 1;

  const handleSave = async () => {
    if (!valid) return;
    setLoading(true);
    try {
     await createCard({ keyword: word.trim(), forbiddenWords: forbiddenWords, themeId });
      onSave({ word: word.trim(), forbiddenWords});
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column gap-3">
      <div>
        <label className="td-label">Palabra a adivinar</label>
        <input
          className="form-control td-input td-input-word fw-bold"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Ej: Tiburón"
          autoFocus
        />
      </div>
      <div>
        <label className="td-label">
          Palabras tabú{" "}
          <span className="fw-normal td-hint">(separadas por coma)</span>
        </label>
        <textarea
          className="form-control td-input td-input-mono"
          rows={3}
          value={tabuInput}
          onChange={(e) => setTabuInput(e.target.value)}
          placeholder="pez, dientes, océano, aleta..."
        />
      </div>
      {forbiddenWords.length > 0 && (
        <div className="d-flex flex-wrap gap-1">
          {forbiddenWords.map((w, i) => <span key={i} className="td-chip-preview">{w}</span>)}
        </div>
      )}
      {error && <p className="text-danger mb-0">{error}</p>}
      <div className="d-flex gap-2 justify-content-end mt-2">
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