import type { TabuCard } from "./types/tabuCard.interface";

export function CardItem({ card,  onDelete }: { card: TabuCard; onDelete: () => void }) {
  console.log('card:', card)
  return (
    <div className="td-card-item d-flex align-items-start gap-3 p-3">
      <div className="flex-grow-1">
        <div className="td-card-word mb-2">{card.word}</div>
        <div className="d-flex flex-wrap gap-1">
          {card.forbiddenWords.map((w, i) => <span key={i} className="td-chip">{w}</span>)}
        </div>
      </div>
      <div className="d-flex gap-1 flex-shrink-0">
        <button className="td-btn-icon danger" onClick={onDelete} title="Eliminar">🗑</button>
      </div>
    </div>
  );
}