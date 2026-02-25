import { useState } from "react";
import "../styles/dashboard.css";
import CollectionForm from "../collectionForm";
import { CardItem } from "../cardItem";
import { CollectionCard } from "../collectionCard";
import type { Collection } from "../types/colection.interface";
import type { TabuCard } from "../types/tabuCard.interface";
import { CardForm } from "../cardForm";



//Info mockeada
const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: "1",
    name: "Animales del mar",
    description: "Fauna marina para niveles básicos",
    category: "Naturaleza",
    createdAt: "2025-01-10",
    cards: [
      { id: "c1", word: "Tiburón", tabuWords: ["pez", "dientes", "océano", "aleta", "Jaws"] },
      { id: "c2", word: "Pulpo", tabuWords: ["tentáculos", "tinta", "ocho", "marino"] },
    ],
  },
  {
    id: "2",
    name: "Tecnología",
    description: "Conceptos del mundo digital",
    category: "Educación",
    createdAt: "2025-01-15",
    cards: [
      { id: "c3", word: "Inteligencia Artificial", tabuWords: ["robot", "machine learning", "datos", "ChatGPT", "algoritmo"] },
    ],
  },
  {
    id: "3",
    name: "Cocina española",
    description: "Gastronomía y platos típicos de España",
    category: "Gastronomía",
    createdAt: "2025-02-01",
    cards: [],
  },
];

const CATEGORIES = ["Naturaleza", "Educación", "Gastronomía", "Deportes", "Historia", "Arte", "Ciencia", "Otro"];

const uid = () => Math.random().toString(36).slice(2, 9);


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





function CollectionDetail({ collection, onBack, onUpdate }: {
  collection: Collection;
  onBack: () => void;
  onUpdate: (col: Collection) => void;
}) {
  const [showCardForm, setShowCardForm] = useState(false);
  const [editingCard, setEditingCard] = useState<TabuCard | null>(null);

  const addCard = (data: Omit<TabuCard, "id">) => {
    onUpdate({ ...collection, cards: [...collection.cards, { ...data, id: uid() }] });
    setShowCardForm(false);
  };

  const updateCard = (data: Omit<TabuCard, "id">) => {
    if (!editingCard) return;
    onUpdate({ ...collection, cards: collection.cards.map((c) => c.id === editingCard.id ? { ...data, id: c.id } : c) });
    setEditingCard(null);
  };

  const deleteCard = (id: string) =>
    onUpdate({ ...collection, cards: collection.cards.filter((c) => c.id !== id) });

  return (
    <div>
      <button className="btn td-btn-sec px-3 py-2 mb-4" onClick={onBack}>← Volver</button>

      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
            <h2 className="mb-0">{collection.name}</h2>
            <span className="td-badge">{collection.category}</span>
          </div>
          {collection.description && <p className="td-suave mb-0">{collection.description}</p>}
        </div>
        <button className="btn td-btn-acento px-3 py-2" onClick={() => setShowCardForm(true)}>
          + Nueva tarjeta
        </button>
      </div>

      <div className="td-stat-row d-flex gap-4 p-3 mb-4">
        <div>
          <div className="td-stat-label">Tarjetas</div>
          <div className="td-stat-value">{collection.cards.length}</div>
        </div>
        <div className="td-stat-divider" />
        <div>
          <div className="td-stat-label">Creada</div>
          <div className="td-stat-value">{collection.createdAt}</div>
        </div>
      </div>

      {collection.cards.length === 0 ? (
        <div className="td-empty text-center py-5 px-3">
          <div className="td-empty-icon mb-2">🃏</div>
          <p className="mb-3">Esta colección no tiene tarjetas todavía.</p>
          <button className="btn td-btn-acento px-3 py-2" onClick={() => setShowCardForm(true)}>
            Crear primera tarjeta
          </button>
        </div>
      ) : (
        <div className="d-flex flex-column gap-2">
          {collection.cards.map((card) => (
            <CardItem key={card.id} card={card} onEdit={() => setEditingCard(card)} onDelete={() => deleteCard(card.id)} />
          ))}
        </div>
      )}

      {showCardForm && (
        <Modal title="Nueva tarjeta" onClose={() => setShowCardForm(false)}>
          <CardForm onSave={addCard} onCancel={() => setShowCardForm(false)} />
        </Modal>
      )}
      {editingCard && (
        <Modal title="Editar tarjeta" onClose={() => setEditingCard(null)}>
          <CardForm initial={editingCard} onSave={updateCard} onCancel={() => setEditingCard(null)} />
        </Modal>
      )}
    </div>
  );
}





export default function TabuDashboard() {
  const [collections, setCollections] = useState<Collection[]>(INITIAL_COLLECTIONS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("Todas");

  const selectedCollection = selectedId ? collections.find((c) => c.id === selectedId) ?? null : null;

  const filtered = collections.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
      || c.description.toLowerCase().includes(search.toLowerCase());
    return matchSearch && (filterCat === "Todas" || c.category === filterCat);
  });

  const createCollection = (data: Partial<Collection>) => {
    const newCol: Collection = {
      id: uid(), name: data.name!, description: data.description || "",
      category: data.category!, cards: [], createdAt: new Date().toISOString().slice(0, 10),
    };
    setCollections([newCol, ...collections]);
    setShowCreate(false);
  };

  const saveEdit = (data: Partial<Collection>) => {
    if (!editingCollection) return;
    setCollections(collections.map((c) => c.id === editingCollection.id ? { ...c, ...data } : c));
    setEditingCollection(null);
  };

  const deleteCollection = (id: string) =>
    setCollections(collections.filter((c) => c.id !== id));

  const updateFromDetail = (updated: Collection) =>
    setCollections(collections.map((c) => c.id === updated.id ? updated : c));

  return (
    <div className="tabu-dashboard">

      {/* Sidebar */}
      <aside className="td-sidebar d-flex flex-column p-4 gap-4">
        <div className="d-flex align-items-center gap-2">
          <div className="td-logo-icon d-flex align-items-center justify-content-center fw-bold fs-5">T</div>
          <div>
            <div className="td-logo-nombre">TABÚ</div>
            <div className="td-logo-sub">DASHBOARD</div>
          </div>
        </div>

        <nav className="d-flex flex-column gap-1">
          <button
            className={`td-nav-link px-3 py-2 ${!selectedCollection ? "active" : ""}`}
            onClick={() => setSelectedId(null)}
          >
            ▦ &nbsp;Colecciones
          </button>
        </nav>

        <div className="td-stats-box p-3 mt-auto">
          <div className="td-suave td-stats-label mb-1">Total colecciones</div>
          <div className="value">{collections.length}</div>
          <div className="td-suave td-stats-label mt-1">
            {collections.reduce((a, c) => a + c.cards.length, 0)} tarjetas
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="td-main">
        {selectedCollection ? (
          <CollectionDetail
            collection={selectedCollection}
            onBack={() => setSelectedId(null)}
            onUpdate={updateFromDetail}
          />
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
              <div>
                <h1 className="mb-1">Colecciones</h1>
                <p className="td-suave mb-0">Gestiona tus temas y tarjetas del juego Tabú</p>
              </div>
              <button className="btn td-btn-acento px-3 py-2" onClick={() => setShowCreate(true)}>
                + Nueva colección
              </button>
            </div>

            <div className="d-flex gap-2 flex-wrap mb-4">
              <input
                className="form-control td-input td-search"
                placeholder="Buscar colecciones..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="d-flex gap-2 flex-wrap">
                {["Todas", ...CATEGORIES].map((cat) => (
                  <button
                    key={cat}
                    className={`td-pill ${filterCat === cat ? "active" : ""}`}
                    onClick={() => setFilterCat(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="td-empty text-center py-5">
                <div className="td-empty-icon mb-2">📦</div>
                <p className="mb-3 td-suave">
                  {search || filterCat !== "Todas"
                    ? "No hay colecciones que coincidan."
                    : "Todavía no tienes colecciones."}
                </p>
                {!search && filterCat === "Todas" && (
                  <button className="btn td-btn-acento px-3 py-2" onClick={() => setShowCreate(true)}>
                    Crear colección
                  </button>
                )}
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
                {filtered.map((col) => (
                  <div key={col.id} className="col">
                    <CollectionCard
                      collection={col}
                      onOpen={() => setSelectedId(col.id)}
                      onEdit={() => setEditingCollection(col)}
                      onDelete={() => deleteCollection(col.id)}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {showCreate && (
        <Modal title="Nueva colección" onClose={() => setShowCreate(false)}>
          <CollectionForm onSave={createCollection} onCancel={() => setShowCreate(false)} />
        </Modal>
      )}
      {editingCollection && (
        <Modal title="Editar colección" onClose={() => setEditingCollection(null)}>
          <CollectionForm initial={editingCollection} onSave={saveEdit} onCancel={() => setEditingCollection(null)} />
        </Modal>
      )}
    </div>
  );
}