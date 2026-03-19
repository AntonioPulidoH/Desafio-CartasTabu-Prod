import { useEffect, useState } from "react";
import type { Collection } from "./types/colection.interface";
import { CardForm } from "./cardForm";
import { CardItem } from "./cardItem";
import { useWebSocket } from "../../hooks/useWebsocket";
import { cardService } from "./services/cardService";
import toast from "react-hot-toast";
import { generateCollectionPDF } from "./services/pdfService";

  const role = sessionStorage.getItem("user_role") ?? "{}";
  const canCreate = role === "ADMIN" || role === "CREATOR";


function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="td-overlay" onClick={onClose}>
      <div className="td-modal p-4" onClick={(e) => e.stopPropagation()}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">{title}</h5>
          <button className="td-btn-icon" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function CollectionDetail({ collection, onBack, onUpdate }: {
  collection: Collection;
  onBack: () => void;
  onUpdate: (col: Collection) => void;
}) {
  const [showCardForm, setShowCardForm] = useState(false);
    const fetchCards = async () => {
    try {
        const cards = await cardService.getByTheme(Number(collection.id));
        onUpdate({ ...collection, cards });
    } catch (error) {
        console.error("Error cargando tarjetas", error);
    }
    };

    useWebSocket({
    onCardCreated: () => { fetchCards(); toast.success("Nueva tarjeta creada"); },
    onCardUpdated: () => { fetchCards(); toast("Tarjeta actualizada"); },
    onCardDeleted: () => { fetchCards(); toast.error("Tarjeta eliminada"); },
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
      <button className="btn td-btn-sec px-3 py-2 mb-4" onClick={onBack}>← Volver</button>


      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
            <h2 className="mb-0">{collection.name}</h2>
            <span className="td-badge">Familia {collection.vocationalFamily?.name}</span>
          </div>
          {collection.description && <p className="td-suave mb-0">{collection.description}</p>}
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
          <div className="td-stat-value">{collection.createdAt.slice(0, 10)}</div>
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
        </div>
      ) : (
        <div className="d-flex flex-column gap-2">
          {(collection.cards ?? []).map((card) => (
            <CardItem key={card.id} card={card}  onDelete={() => deleteCard(card.id)} />
          ))}
        </div>
      )}

      {showCardForm && (
        <Modal title="Nueva tarjeta" onClose={() => setShowCardForm(false)}>
          <CardForm themeId={Number(collection.id)} onSave={addCard} onCancel={() => setShowCardForm(false)} />
        </Modal>
      )}
    </div>
  );
}