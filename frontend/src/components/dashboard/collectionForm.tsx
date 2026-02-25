import { useState } from "react";
import type { Collection } from "./types/colection.interface";


const CATEGORIES = ["Naturaleza", "Educación", "Gastronomía", "Deportes", "Historia", "Arte", "Ciencia", "Otro"];
export default function CollectionForm({ initial, onSave, onCancel }: {
  initial?: Partial<Collection>;
  onSave: (data: Partial<Collection>) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [category, setCategory] = useState(initial?.category || CATEGORIES[0]);
  const valid = name.trim().length > 0;

  return (
    <div className="d-flex flex-column gap-3">
      <div>
        <label className="td-label">Nombre de la colección</label>
        <input
          className="form-control td-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Animales del bosque"
          autoFocus
        />
      </div>
      <div>
        <label className="td-label">Descripción</label>
        <textarea
          className="form-control td-input"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Una breve descripción..."
          style={{ resize: "vertical" }}
        />
      </div>
      <div>
        <label className="td-label">Categoría</label>
        <select className="form-select td-input" value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="d-flex gap-2 justify-content-end mt-2">
        <button className="btn td-btn-sec px-3 py-2" onClick={onCancel}>Cancelar</button>
        <button
          className="btn td-btn-acento px-3 py-2"
          onClick={() => valid && onSave({ name: name.trim(), description: description.trim(), category })}
          disabled={!valid}
        >
          Guardar colección
        </button>
      </div>
    </div>
  );
}
