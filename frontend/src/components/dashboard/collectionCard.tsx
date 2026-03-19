import { Download, Pencil, Share2, Trash2 } from "lucide-react";
import type { Collection } from "./types/colection.interface";
import { generateCollectionPDF } from "./services/pdfService";

export function CollectionCard({ collection, onOpen, onEdit, onDelete, onShare }: {
  collection: Collection;
  onOpen: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
}) {
  const role = sessionStorage.getItem("user_role") ?? "";
  const canCreate = role === "ADMIN" || role === "CREATOR";

  return (
    <div
      className="td-card p-3 d-flex flex-column gap-3 bg-light"
      onClick={onOpen}
    >

      <div className="td-card-header">

        <span className="td-badge">
          {collection.vocationalFamily?.name}
        </span>

        <div
          className="td-card-actions"
          onClick={(e) => e.stopPropagation()}
        >

          <button
            className="td-btn-icon text-dark"
            onClick={(e) => {
              e.stopPropagation();
              generateCollectionPDF(collection);
            }}
            title="Descargar PDF"
          >
            <Download size={16} strokeWidth={2} />
          </button>

          <button
            className="td-btn-icon text-dark"
            onClick={onShare}
            title="Compartir"
          >
            <Share2 size={16} strokeWidth={2} />
          </button>

          {canCreate && (
            <button
              className="td-btn-icon text-dark"
              onClick={onEdit}
              title="Editar"
            >
              <Pencil size={16} strokeWidth={2} />
            </button>
          )}

          {canCreate && (
            <button
              className="td-btn-icon danger text-danger"
              onClick={onDelete}
              title="Eliminar"
            >
              <Trash2 size={16} strokeWidth={2} />
            </button>
          )}

        </div>
      </div>

      <div>
        <h5 className="mb-1 text-dark">
          {collection.name}
        </h5>

        {collection.description && (
          <p className="td-suave td-desc mb-0">
            {collection.description}
          </p>
        )}
      </div>

      <div className="d-flex justify-content-between align-items-center pt-2 border-top td-card-divider mt-auto">

        <span className="td-suave td-desc text-dark">
          <span className="fw-bold td-count text-dark">
            {collection._count?.cards ?? (collection.cards ?? []).length}
          </span>{" "}
          tarjetas
        </span>

        <span className="td-suave td-date text-dark">
          {collection.createdAt.slice(0, 10)}
        </span>

      </div>

    </div>
  );
}