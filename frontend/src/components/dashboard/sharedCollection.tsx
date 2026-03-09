import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCollection } from "./actions/getCollectionLink";
import { CardItem } from "./cardItem";
import type { Collection } from "./types/colection.interface";

export function SharedCollection() {
  const { id } = useParams();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [error, setError] = useState("");

useEffect(() => {
  getCollection(Number(id))
    .then(data => setCollection({
      ...data,
      cards: (data.cards ?? []).map((c: any) => ({
        ...c,
        word: c.keyword,
        forbiddenWords: c.forbiddenWords ?? []
      }))
    }))
    .catch(err => setError(err.message));
}, [id]);

  if (error) return (
    <div className="td-empty text-center py-5">
      <div className="td-empty-icon mb-2">😕</div>
      <p>{error}</p>
    </div>
  );

  if (!collection) return (
    <div className="td-empty text-center py-5">
      <p>Cargando...</p>
    </div>
  );

  return (
    <div className="container py-4" style={{ maxWidth: "700px" }}>
      <div className="mb-4">
        <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
          <h2 className="mb-0">{collection.name}</h2>
          {collection.vocationalFamily?.name && (
            <span className="td-badge">Familia {collection.vocationalFamily.name}</span>
          )}
        </div>
        {collection.description && (
          <p className="td-suave mb-0">{collection.description}</p>
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
        <div className="td-empty text-center py-5">
          <div className="td-empty-icon mb-2">🃏</div>
          <p>Esta colección no tiene tarjetas.</p>
        </div>
      ) : (
        <div className="d-flex flex-column gap-2">
          {collection.cards!.map(card => (
            <CardItem key={card.id} card={card} onDelete={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
}