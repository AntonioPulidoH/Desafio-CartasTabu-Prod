import { useState, useEffect } from "react";
import { vocationalFamilyService } from "../ThemeTable/services/vocational-family-service";
import { aiService } from "./services/ai-service";
import type { GeneratedCollectionResponse } from "./services/ai-service";
import type { VocationalFamily } from "../ThemeTable/services/theme-service";
import toast from "react-hot-toast";

interface AiCollectionModalProps {
  onClose: () => void;
  onSaveGenerated: (
    data: GeneratedCollectionResponse & { vocationalFamilyId: number },
  ) => Promise<void>;
}

export function AiCollectionModal({
  onClose,
  onSaveGenerated,
}: AiCollectionModalProps) {
  const [families, setFamilies] = useState<VocationalFamily[]>([]);
  const [loadingFamilies, setLoadingFamilies] = useState(true);

  // Estado del formulario
  const [selectedFamilyId, setSelectedFamilyId] = useState<number | "">("");
  const [topic, setTopic] = useState("");
  const [amount, setAmount] = useState<number>(5);
  const [context, setContext] = useState("");

  // Estados de IA
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] =
    useState<GeneratedCollectionResponse | null>(null);

  useEffect(() => {
    vocationalFamilyService
      .getAllFamilies()
      .then(setFamilies)
      .catch(() => toast.error("Error al cargar familias"))
      .finally(() => setLoadingFamilies(false));
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFamilyId)
      return toast.error("Selecciona una Familia Profesional");

    const familyName = families.find(
      (f) => f.id === Number(selectedFamilyId),
    )?.name;
    if (!familyName) return;

    setIsGenerating(true);
    setGeneratedData(null);

    try {
      const data = await aiService.generateCollection({
        vocationalFamily: familyName,
        topic: topic || undefined,
        amount,
        context: context || undefined,
      });
      setGeneratedData(data);
      toast.success("¡Colección generada con éxito!");
    } catch (error) {
      console.error(error);
      toast.error("La IA falló al generar la colección. Inténtalo de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedData || !selectedFamilyId) return;

    await onSaveGenerated({
      ...generatedData,
      vocationalFamilyId: Number(selectedFamilyId),
    });
    onClose();
  };

  const handleRemoveCard = (indexToRemove: number) => {
    setGeneratedData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        cards: prev.cards.filter((_, idx) => idx !== indexToRemove),
      };
    });
  };

  return (
    <div className="td-overlay" onClick={onClose}>
      <div
        className="td-modal p-4"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "600px",
          width: "90%",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">✨ Asistente IA de Colecciones</h5>
          <button className="td-btn-icon" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Formulario */}
        {!generatedData && (
          <form onSubmit={handleGenerate}>
            <div className="mb-3">
              <label className="form-label td-suave">
                Familia Profesional *
              </label>
              <select
                className="form-control td-input"
                value={selectedFamilyId}
                onChange={(e) => setSelectedFamilyId(Number(e.target.value))}
                required
                disabled={loadingFamilies || isGenerating}
              >
                <option value="" disabled>
                  {loadingFamilies ? "Cargando..." : "Selecciona una opción"}
                </option>
                {families.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label td-suave">
                Tema específico (Opcional)
              </label>
              <input
                type="text"
                className="form-control td-input"
                placeholder="Ej: Redes Locales, Lenguaje C, Anatomía..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                disabled={isGenerating}
              />
            </div>

            <div className="mb-3">
              <label className="form-label td-suave">Cantidad de Cartas</label>
              <input
                type="number"
                className="form-control td-input"
                min="1"
                max="15"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                disabled={isGenerating}
              />
            </div>

            <div className="mb-4">
              <label className="form-label td-suave">
                Contexto para la IA (Opcional)
              </label>
              <textarea
                className="form-control td-input"
                rows={3}
                placeholder="Ej: Usa un vocabulario muy básico, son alumnos de 1º..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                disabled={isGenerating}
              />
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
                disabled={isGenerating}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn td-btn-acento"
                disabled={isGenerating}
              >
                {isGenerating ? "Generando ..." : "Generar"}
              </button>
            </div>
          </form>
        )}

        {/* Vista Previa */}
        {generatedData && (
          <div className="generated-preview">
            <div className="alert alert-info bg-dark text-light border-0 mb-4">
              <h4 className="fw-bold text-info mb-1">{generatedData.name}</h4>
              <p className="mb-0 opacity-75">{generatedData.description}</p>
            </div>

            <h6 className="td-suave mb-3">
              Cartas generadas ({generatedData.cards.length}):
            </h6>

            <div className="d-flex flex-column gap-2 mb-4">
              {generatedData.cards.map((card, idx) => (
                <div
                  key={idx}
                  className="p-3 border rounded position-relative"
                  style={{ borderColor: "var(--color-borde)" }}
                >
                  {/* <-- Botón de descartar --> */}
                  <button
                    onClick={() => handleRemoveCard(idx)}
                    className="btn btn-sm btn-outline-danger position-absolute"
                    style={{
                      top: "8px",
                      right: "8px",
                      padding: "0 6px",
                      border: "none",
                    }}
                    title="Descartar esta carta"
                  >
                    ✕
                  </button>

                  <div className="fw-bold mb-2 text-primary">
                    {card.keyword}
                  </div>
                  <div className="d-flex flex-wrap gap-1">
                    {card.forbiddenWords.map((fw, i) => (
                      <span
                        key={i}
                        className="badge bg-danger bg-opacity-75 text-white"
                      >
                        {fw}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setGeneratedData(null)}
              >
                Volver a intentar
              </button>
              <button
                className="btn td-btn-acento"
                onClick={handleSave}
                disabled={generatedData.cards.length === 0}
              >
                Guardar Colección
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
