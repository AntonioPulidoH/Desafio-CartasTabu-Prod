import type { Collection } from "./types/colection.interface";

export function CollectionCard({ collection, onOpen, onEdit, onDelete }: {
  collection: Collection;
  onOpen: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="td-card p-3 d-flex flex-column gap-3" onClick={onOpen}>
      <div className="d-flex justify-content-between align-items-start">
        <span className="td-badge">{collection.category}</span>
        <div className="d-flex gap-1" onClick={(e) => e.stopPropagation()}>
          <button className="td-btn-icon" onClick={onEdit} title="Editar">✏️</button>
          <button className="td-btn-icon danger" onClick={onDelete} title="Eliminar">🗑</button>
        </div>
      </div>
      <div>
        <h5 className="mb-1">{collection.name}</h5>
        {collection.description && (
          <p className="td-suave td-desc mb-0">{collection.description}</p>
        )}
      </div>
      <div className="d-flex justify-content-between align-items-center pt-2 border-top td-card-divider mt-auto">
        <span className="td-suave td-desc">
          <span className="fw-bold td-count">{collection.cards.length}</span> tarjetas
        </span>
        <span className="td-suave td-date">{collection.createdAt}</span>
      </div>
    </div>
  );
}