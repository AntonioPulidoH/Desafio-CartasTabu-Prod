import { useState, useEffect } from "react";
import "../styles/dashboard.css";
import CollectionForm from "../collectionForm";
import { CollectionCard } from "../collectionCard";
import type { Collection } from "../types/colection.interface";
import { getThemes } from "../actions/getThemes";
import { deleteThemes } from "../actions/deleteTheme";
import { updateThemes } from "../actions/updateTheme";
import { CollectionDetail } from "../collectionDetail";
import { useWebSocket } from "../../../hooks/useWebsocket";
import { AdminSidebar } from "../../AdminSidebar/AdminSidebar";
import toast, { Toaster } from "react-hot-toast";


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



export default function TabuDashboard() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [search, setSearch] = useState("");
  const [filterFamilyId, setFilterFamilyId] = useState<number | null>(null);
  const [loadingCollections, setLoadingCollections] = useState(true);

  const selectedCollection = selectedId ? collections.find((c) => c.id === selectedId) ?? null : null;
 

  const fetchCollections = async () => {
    

    try {
      const data = await getThemes();
      setCollections(data);
    } catch (err) {
      console.error('Error al cargar colecciones', err);
    } finally {
      setLoadingCollections(false);
    }
  };
useWebSocket(fetchCollections);
  useEffect(() => {
    fetchCollections();
  }, []);

  const filtered = collections.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchFamily = filterFamilyId === null || c.vocationalFamilyId === filterFamilyId;
    return matchSearch && matchFamily;
  });

  const createCollection = async () => {
    setShowCreate(false);
    await fetchCollections(); 
  };

const saveEdit = async (data: Partial<Collection>) => {
  if (!editingCollection) return;
  await updateThemes(String(editingCollection.id), data);
  await fetchCollections();
  setEditingCollection(null);
};

const deleteCollection = async (id: string) => {
  await deleteThemes(id);
  setCollections(collections.filter((c) => c.id !== id));
};

const updateFromDetail = (updated: Collection) =>
  setCollections(collections.map((c) => c.id === updated.id ? updated : c));

  return (
    <div className="tabu-dashboard">
    <Toaster position="top-right" reverseOrder={false} />
      <aside className="td-sidebar d-flex flex-column ">
       

      <AdminSidebar></AdminSidebar>

        <div className="td-stats-box p-3 mt-auto">
          <div className="td-suave td-stats-label mb-1">Total colecciones</div>
          <div className="value">{collections.length}</div>
          <div className="td-suave td-stats-label mt-1">
            {collections.reduce((a, c) => a + (c.cards ?? []).length, 0)} tarjetas
          </div>
        </div>
      </aside>

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
                <button
                  className={`td-pill ${filterFamilyId === null ? "active" : ""}`}
                  onClick={() => setFilterFamilyId(null)}
                >
                  Todas
                </button>
                {collections
                  .filter((c, index, self) => 
                    self.findIndex(x => x.vocationalFamilyId === c.vocationalFamilyId) === index
                  )
                  .map((c) => (
                    <button
                      key={c.vocationalFamilyId}
                      className={`td-pill ${filterFamilyId === c.vocationalFamilyId ? "active" : ""}`}
                      onClick={() => setFilterFamilyId(c.vocationalFamilyId)}
                    >
                      {c.vocationalFamily?.name ?? `Familia ${c.vocationalFamilyId}`}
                    </button>
                  ))}
              </div>
              </div>

            {loadingCollections ? (
              <div className="text-center py-5 td-suave">Cargando colecciones...</div>
            ) : filtered.length === 0 ? (
              <div className="td-empty text-center py-5">
                <div className="td-empty-icon mb-2">📦</div>
                <p className="mb-3 td-suave">
                  {search || filterFamilyId !== null
                    ? "No hay colecciones que coincidan."
                    : "Todavía no tienes colecciones."}
                </p>
                {!search && filterFamilyId === null && (
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
                      onShare={() => {
                        const url = `${window.location.origin}/collection/${col.id}`;
                        navigator.clipboard.writeText(url);
                        toast.success('Se ha copiado el enlace')
                      }}
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