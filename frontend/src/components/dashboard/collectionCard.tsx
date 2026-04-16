import { Download, Pencil, Share2, Trash2, Globe, Lock } from "lucide-react";
import type { Collection } from "./types/colection.interface";
import { generateCollectionPDF } from "./services/pdfService";

function getCurrentUserId(): number | null {
  const token = sessionStorage.getItem("access_token");
  if (!token) return null;
  try {
    const payload = JSON.parse(
      window.atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
    );
    return payload.sub ?? null;
  } catch {
    return null;
  }
}

export function CollectionCard({ collection, onOpen, onEdit, onDelete, onShare, onToggleVisibility }: {
  collection: Collection;
  onOpen: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
  onToggleVisibility?: (id: string) => void;
}) {
  const role = sessionStorage.getItem("user_role") ?? "";
  const canCreate = role === "ADMIN" || role === "CREATOR";
  const currentUserId = getCurrentUserId();
  const isOwner = currentUserId !== null && collection.creatorId === currentUserId;

  return (
    <div
      className="td-card p-3 d-flex flex-column gap-3 bg-light"
      onClick={onOpen}
    >
      <div className="td-card-header">
        <div className="d-flex align-items-center gap-2">
          <span className="td-badge">
            {collection.vocationalFamily?.name}
          </span>
          {/* Badge público/privado visible para todos */}
          <span
            className={`td-badge ${collection.isPublic ? "bg-success text-white" : "bg-secondary text-white"}`}
            style={{ fontSize: "0.7rem" }}
          >
            {collection.isPublic ? "Pública" : "Privada"}
          </span>
        </div>

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


          {isOwner && onToggleVisibility && (
            <button
              className="td-btn-icon text-dark"
              onClick={(e) => {
                e.stopPropagation();
                onToggleVisibility(collection.id);
              }}
              title={collection.isPublic ? "Hacer privada" : "Hacer pública"}
            >
              {collection.isPublic
                ? <Lock size={16} strokeWidth={2} />
                : <Globe size={16} strokeWidth={2} />
              }
            </button>
          )}

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
        <h5 className="mb-1 text-dark">{collection.name}</h5>
        {collection.description && (
          <p className="td-suave td-desc mb-0">{collection.description}</p>
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