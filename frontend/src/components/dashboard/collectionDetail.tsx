import { useEffect, useState } from "react";
import type { Collection } from "./types/colection.interface";
import { CardForm } from "./cardForm";
import { CardItem } from "./cardItem";
import { useWebSocket } from "../../hooks/useWebsocket";
import { cardService } from "./services/cardService";
import { AiCardsModal } from "./AiCardsModal";
import toast from "react-hot-toast";
import { generateCollectionPDF } from "./services/pdfService";

  const role = sessionStorage.getItem("user_role") ?? "{}";
  const canCreate = role === "ADMIN" || role === "CREATOR";
import axios from "axios";

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="td-overlay" onClick={onClose}>
      <div className="td-modal p-4" onClick={(e) => e.stopPropagation()}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">{title}</h5>
          <button className="td-btn-icon" onClick={onClose}>
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function CollectionDetail({
  collection,
  onBack,
  onUpdate,
}: {
  collection: Collection;
  onBack: () => void;
  onUpdate: (col: Collection) => void;
}) {
  const [showCardForm, setShowCardForm] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);

  const fetchCards = async () => {
    try {
      const cards = await cardService.getByTheme(Number(collection.id));
      onUpdate({ ...collection, cards });
    } catch (error) {
      console.error("Error cargando tarjetas", error);
    }
  };

  // Función para guardar las cartas
  const handleSaveAiCards = async (generatedCards: any[]) => {
    try {
      const token = sessionStorage.getItem("access_token");
      const API_URL =
        import.meta.env.VITE_LOCAL_API_URL || import.meta.env.VITE_API_URL;

      const cardPromises = generatedCards.map((card: any) => {
        const cardPayload = {
          keyword: card.keyword,
          themeId: Number(collection.id),
          forbiddenWords: card.forbiddenWords,
        };

        return axios.post(`${API_URL}/cards`, cardPayload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      });

      await Promise.all(cardPromises);

      setShowAiModal(false);
      await fetchCards();
      toast.success("Cartas a la colección");
    } catch (error) {
      console.error("Error al guardar cartas:", error);
      toast.error("Error al añadir las cartas.");
    }
  };

  useWebSocket({
    onCardCreated: () => {
      fetchCards();
    },
    onCardUpdated: () => {
      fetchCards();
    },
    onCardDeleted: () => {
      fetchCards();
    },
  });

  useEffect(() => {
    fetchCards();
  }, [collection.id]);

  const addCard = async () => {
    const cards = await cardService.getByTheme(Number(collection.id));
    onUpdate({ ...collection, cards });
    setShowCardForm(false);
  };

  const deleteCard = async (id: string) => {
    try {
      await cardService.delete(id);
      const cards = await cardService.getByTheme(Number(collection.id));
      onUpdate({ ...collection, cards });
    } catch (error) {
      console.error("Error eliminando tarjeta", error);
    }
  };

  return (
    <div>
      <button className="btn td-btn-sec px-3 py-2 mb-4" onClick={onBack}>
        ← Volver
      </button>


      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
            <h2 className="mb-0">{collection.name}</h2>
            <span className="td-badge">
              Familia {collection.vocationalFamily?.name}
            </span>
          </div>
          {collection.description && (
            <p className="td-suave mb-0">{collection.description}</p>
          )}
        </div>
        {/* Botones Crear Tarjeta */}
        <div className="d-flex gap-2">
          <button
            className="btn btn-dark border border-secondary px-3 py-2"
            style={{
              background: "var(--color-tarjeta)",
              color: "var(--color-claro)",
            }}
            onClick={() => setShowAiModal(true)}
          >
            ✨ Añadir con IA
          </button>
          <button
            className="btn td-btn-acento px-3 py-2"
            onClick={() => setShowCardForm(true)}
          >
            + Nueva tarjeta
          </button>
        </div>
      <button
            className="btn td-btn-sec px-3 py-2"
            onClick={() => generateCollectionPDF(collection)}>
            ⬇ Descargar PDF
        </button>
        {canCreate && (
        <button className="btn td-btn-acento px-3 py-2" onClick={() => setShowCardForm(true)}>
            + Nueva tarjeta
        </button>
        )}
        
      </div>

      <div className="td-stat-row d-flex gap-4 p-3 mb-4">
        <div>
          <div className="td-stat-label">Tarjetas</div>
          <div className="td-stat-value">{(collection.cards ?? []).length}</div>
        </div>
        <div className="td-stat-divider" />
        <div>
          <div className="td-stat-label">Creada</div>
          <div className="td-stat-value">
            {collection.createdAt.slice(0, 10)}
          </div>
        </div>
      </div>

      {(collection.cards ?? []).length === 0 ? (
        <div className="td-empty text-center py-5 px-3">
          <div className="td-empty-icon mb-2">🃏</div>
          <p className="mb-3">Esta colección no tiene tarjetas todavía.</p>
            {canCreate && (
            <button className="btn td-btn-acento px-3 py-2" onClick={() => setShowCardForm(true)}>
                Crear primera tarjeta
            </button>
            )}
          <button
            className="btn td-btn-acento px-3 py-2"
            onClick={() => setShowCardForm(true)}
          >
            Crear primera tarjeta
          </button>
        </div>
      ) : (
        <div className="d-flex flex-column gap-2">
          {(collection.cards ?? []).map((card) => (
            <CardItem
              key={card.id}
              card={card}
              onDelete={() => deleteCard(card.id)}
            />
          ))}
        </div>
      )}

      {showCardForm && (
        <Modal title="Nueva tarjeta" onClose={() => setShowCardForm(false)}>
          <CardForm
            themeId={Number(collection.id)}
            onSave={addCard}
            onCancel={() => setShowCardForm(false)}
          />
        </Modal>
      )}

      {/* Modal Asistente IA */}
      {showAiModal && (
        <AiCardsModal
          vocationalFamilyName={collection.vocationalFamily?.name || "General"}
          onClose={() => setShowAiModal(false)}
          onSaveGenerated={handleSaveAiCards}
        />
      )}
    </div>
  );
}
