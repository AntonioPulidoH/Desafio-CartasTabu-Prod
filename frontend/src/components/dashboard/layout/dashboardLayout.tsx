import { useState, useEffect } from "react";
import "../styles/dashboard.css";
import CollectionForm from "../collectionForm";
import { CollectionCard } from "../collectionCard";
import type { Collection } from "../types/colection.interface";
import { CollectionDetail } from "../collectionDetail";
import { useWebSocket } from "../../../hooks/useWebsocket";
import { AdminSidebar } from "../../AdminSidebar/AdminSidebar";
import toast, { Toaster } from "react-hot-toast";
import { themeService } from "../services/themeService";
import { AiCollectionModal } from "../AiCollectionModal";
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

export default function TabuDashboard() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(
    null,
  );
  const [search, setSearch] = useState("");
  const [filterFamilyId, setFilterFamilyId] = useState<number | null>(null);
  const [loadingCollections, setLoadingCollections] = useState(true);
  const [showAiModal, setShowAiModal] = useState(false);

  const selectedCollection = selectedId
    ? (collections.find((c) => c.id === selectedId) ?? null)
    : null;

  const fetchCollections = async () => {
    try {
      const data = await themeService.getAll();
      setCollections(data);
    } catch (err) {
      console.error("Error al cargar las temáticas", err);
    } finally {
      setLoadingCollections(false);
    }
  };

  const filtered = collections.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchFamily =
      filterFamilyId === null || c.vocationalFamilyId === filterFamilyId;
    return matchSearch && matchFamily;
  });

  useWebSocket({
    onThemeCreated: () => {
      fetchCollections();
      toast.success("Nueva colección creada");
    },
    onThemeUpdated: () => {
      fetchCollections();
      toast("Colección actualizada");
    },
    onThemeDeleted: () => {
      fetchCollections();
      toast.error("Colección eliminada");
    },
    onCardCreated: () => {
      fetchCollections();
      toast.success("Nueva tarjeta creada");
    },
    onCardUpdated: () => {
      fetchCollections();
      toast("Tarjeta actualizada");
    },
    onCardDeleted: () => {
      fetchCollections();
      toast.error("Tarjeta eliminada");
    },
  });

  useEffect(() => {
    fetchCollections();
  }, []);

  const createCollection = async () => {
    setShowCreate(false);
    await fetchCollections();
  };

  const saveEdit = async (data: Partial<Collection>) => {
    if (!editingCollection) return;
    await themeService.update(String(editingCollection.id), data);
    await fetchCollections();
    setEditingCollection(null);
  };

  const deleteCollection = async (id: string) => {
    await themeService.delete(id);
    setCollections(collections.filter((c) => c.id !== id));
  };

  const updateFromDetail = (updated: Collection) =>
    setCollections(collections.map((c) => (c.id === updated.id ? updated : c)));

  const handleSaveAiCollection = async (generatedData: any) => {
    try {
      // Crea la temática
      const themePayload = {
        name: generatedData.name,
        description: generatedData.description,
        vocationalFamilyId: generatedData.vocationalFamilyId,
        creatorId: 1, // ⚠️ ¡OJO! Recuerda cambiar esto por el ID real de tu usuario (o sacarlo del contexto/estado)
      };

      const newTheme = await themeService.create(themePayload);

      // Crear cartas
      const token = sessionStorage.getItem("access_token");
      const API_URL =
        import.meta.env.VITE_LOCAL_API_URL || import.meta.env.VITE_API_URL;

      const cardPromises = generatedData.cards.map((card: any) => {
        const cardPayload = {
          keyword: card.keyword,
          themeId: newTheme.id,
          creatorId: 1,
          forbiddenWords: card.forbiddenWords,
        };

        return axios.post(`${API_URL}/cards`, cardPayload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      });

      // Guarda las cartas en la BD
      await Promise.all(cardPromises);

      setShowAiModal(false);
      await fetchCollections();
      toast.success("Colección guardada con éxito");
    } catch (error) {
      console.error("Error al guardar en BD:", error);
      toast.error("Error al guardar la colección.");
    }
  };

  return (
    <div className="tabu-dashboard">
      <Toaster position="top-right" reverseOrder={false} />
      <aside className="td-sidebar d-flex flex-column ">
        <AdminSidebar></AdminSidebar>

        <div className="td-stats-box p-3 mt-auto">
          <div className="td-suave td-stats-label mb-1">Total temáticas</div>
          <div className="value">{collections.length}</div>
          <div className="td-suave td-stats-label mt-1">
            {collections.reduce((a, c) => a + (c.cards ?? []).length, 0)}{" "}
            tarjetas
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
                <p className="td-suave mb-0">
                  Gestiona tus temas y tarjetas del juego Tabú
                </p>
              </div>
              {/* Botones */}
              <div className="d-flex gap-2">
                <button
                  className="btn btn-dark border border-secondary px-3 py-2"
                  onClick={() => setShowAiModal(true)}
                  style={{
                    background: "var(--color-tarjeta)",
                    color: "var(--color-claro)",
                  }}
                >
                  ✨ Asistente IA
                </button>
                <button
                  className="btn td-btn-acento px-3 py-2"
                  onClick={() => setShowCreate(true)}
                >
                  + Nueva colección
                </button>
              </div>
            </div>

            <div className="d-flex gap-2 flex-wrap mb-4">
              <input
                className="form-control td-input td-search"
                placeholder="Buscar temáticas..."
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
                  .filter(
                    (c, index, self) =>
                      self.findIndex(
                        (x) => x.vocationalFamilyId === c.vocationalFamilyId,
                      ) === index,
                  )
                  .map((c) => (
                    <button
                      key={c.vocationalFamilyId}
                      className={`td-pill ${filterFamilyId === c.vocationalFamilyId ? "active" : ""}`}
                      onClick={() => setFilterFamilyId(c.vocationalFamilyId)}
                    >
                      {c.vocationalFamily?.name ??
                        `Familia ${c.vocationalFamilyId}`}
                    </button>
                  ))}
              </div>
            </div>

            {loadingCollections ? (
              <div className="text-center py-5 td-suave">
                Cargando temáticas...
              </div>
            ) : filtered.length === 0 ? (
              <div className="td-empty text-center py-5">
                <div className="td-empty-icon mb-2">📦</div>
                <p className="mb-3 td-suave">
                  {search || filterFamilyId !== null
                    ? "No hay temáticas que coincidan."
                    : "Todavía no tienes temáticas."}
                </p>
                {!search && filterFamilyId === null && (
                  <button
                    className="btn td-btn-acento px-3 py-2"
                    onClick={() => setShowCreate(true)}
                  >
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
                        toast.success("Se ha copiado el enlace");
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Modal Clásico */}
      {showCreate && (
        <Modal title="Nueva colección" onClose={() => setShowCreate(false)}>
          <CollectionForm
            onSave={createCollection}
            onCancel={() => setShowCreate(false)}
          />
        </Modal>
      )}

      {/* Modal Asistente IA */}
      {showAiModal && (
        <AiCollectionModal
          onClose={() => setShowAiModal(false)}
          onSaveGenerated={handleSaveAiCollection}
        />
      )}

      {showCreate && (
        <Modal title="Nueva colección" onClose={() => setShowCreate(false)}>
          <CollectionForm
            onSave={createCollection}
            onCancel={() => setShowCreate(false)}
          />
        </Modal>
      )}
      {editingCollection && (
        <Modal
          title="Editar colección"
          onClose={() => setEditingCollection(null)}
        >
          <CollectionForm
            initial={editingCollection}
            onSave={saveEdit}
            onCancel={() => setEditingCollection(null)}
          />
        </Modal>
      )}
    </div>
  );
}
