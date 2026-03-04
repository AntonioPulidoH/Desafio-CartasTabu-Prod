import { useState, useEffect } from "react";
import type { Collection } from "./types/colection.interface";
import { createTheme } from "../../api/createTheme";
import { updateThemes } from "../../api/updateTheme";
import { getVocationalFamilies } from "../../api/getFamilies";

type VocationalFamily = {
  id: number;
  name: string;
}

export default function CollectionForm({ initial, onSave, onCancel }: {
  initial?: Partial<Collection>;
  onSave: (data: Partial<Collection>) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [vocationalFamilyId, setFamily] = useState<number>(initial?.vocationalFamilyId as number || 0);
  const [families, setFamilies] = useState<VocationalFamily[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isEditing = !!initial?.id;
  const valid = name.trim().length > 0 && vocationalFamilyId !== 0;

  useEffect(() => {
    getVocationalFamilies()
      .then(setFamilies)
      .catch(() => setError('Error al cargar las familias profesionales'));
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isEditing) {
        await updateThemes(String(initial!.id!), { name, description, vocationalFamilyId });
      } else {
        await createTheme({ name, description, vocationalFamilyId });
      }
      onSave({});
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
        <label className="td-label">Familia profesional</label>
        <select
          className="form-select td-input"
          value={vocationalFamilyId}
          onChange={(e) => setFamily(Number(e.target.value))}
        >
          <option value={0} disabled>Selecciona una familia...</option>
          {families.map((f) => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>
      </div>
      {error && <p className="text-danger mb-0">{error}</p>}
      <div className="d-flex gap-2 justify-content-end mt-2">
        <button className="btn td-btn-sec px-3 py-2" onClick={onCancel}>Cancelar</button>
        <button
          className="btn td-btn-acento px-3 py-2"
          onClick={handleSubmit}
          disabled={!valid || loading}
        >
          {loading ? "Guardando..." : isEditing ? "Guardar cambios" : "Guardar colección"}
        </button>
      </div>
    </div>
  );
}