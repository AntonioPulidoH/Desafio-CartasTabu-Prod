import { useState } from "react";
import { aiService } from "./services/ai-service";
import type { GeneratedCardsResponse } from "./services/ai-service";
import toast from "react-hot-toast";

interface AiCardsModalProps {
  vocationalFamilyName: string;
  onClose: () => void;
  onSaveGenerated: (cards: GeneratedCardsResponse["cards"]) => Promise<void>;
}

export function AiCardsModal({
  vocationalFamilyName,
  onClose,
  onSaveGenerated,
}: AiCardsModalProps) {
  const [amount, setAmount] = useState<number>(5);
  const [context, setContext] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCards, setGeneratedCards] = useState<
    GeneratedCardsResponse["cards"] | null
  >(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setGeneratedCards(null);

    try {
      const data = await aiService.generateCards({
        vocationalFamily: vocationalFamilyName || "General",
        amount,
        context: context || undefined,
      });
      setGeneratedCards(data.cards);
      toast.success("Cartas generadas con éxito");
    } catch (error) {
      console.error(error);
      toast.error("El Asistente IA falló al generar las cartas. Inténtalo de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedCards) return;
    await onSaveGenerated(generatedCards);
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
          <h5 className="mb-0">✨ Añadir cartas con IA</h5>
          <button className="td-btn-icon" onClick={onClose}>
            ✕
          </button>
        </div>

        {!generatedCards && (
          <form onSubmit={handleGenerate}>
            <div className="mb-3">
              <label className="form-label td-suave">
                Cantidad de Cartas a añadir
              </label>
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
                Contexto (Opcional)
              </label>
              <textarea
                className="form-control td-input"
                rows={3}
                placeholder="Ej: Necesito ideas sobre esta temática..."
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
                {isGenerating ? "Generando cartas..." : "Generar"}
              </button>
            </div>
          </form>
        )}

        {generatedCards && (
          <div className="generated-preview">
            <h6 className="td-suave mb-3">
              Nuevas cartas ({generatedCards.length}):
            </h6>

            <div className="d-flex flex-column gap-2 mb-4">
              {generatedCards.map((card, idx) => (
                <div
                  key={idx}
                  className="p-3 border rounded"
                  style={{ borderColor: "var(--color-borde)" }}
                >
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
                onClick={() => setGeneratedCards(null)}
              >
                Descartar y probar otra vez
              </button>
              <button className="btn td-btn-acento" onClick={handleSave}>
                Añadir a Colección
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
