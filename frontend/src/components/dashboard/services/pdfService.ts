import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import type { Collection } from "../types/colection.interface";
import { cardService } from "./cardService";

//Paleta de colores 
const C = {
  primario:    "#1a0f3c",
  acento:      "#e8402a",
  acentoSuave: "#ff6b5b",
  secundario:  "#5a4f8a",
  claro:       "#ffffff",
  fondo:       "#fafaf8",
  bordeLight:  "rgba(26,15,60,0.12)",
  suave:       "rgba(26,15,60,0.50)",
  muySuave:    "rgba(26,15,60,0.22)",
  corteLine:   "rgba(26,15,60,0.18)",
};


const A2_W_PX   = 1587;
const A2_H_PX   = 2245;
const CARD_W_PX = 476;   
const CARD_H_PX = 666;  
const MARGIN_PX = 155;  
const COL_SEP   = 20;  
const HCUT_H    = 20;   


const hCutLine = () => `
  <div style="
    display:flex;align-items:center;
    padding:0 ${MARGIN_PX}px;
    height:${HCUT_H}px;flex-shrink:0;
  ">
    <div style="flex:1;border-top:1px dashed ${C.corteLine};"></div>
    <div style="
      width:12px;height:12px;border-radius:50%;
      background:${C.fondo};border:1px dashed ${C.corteLine};
      flex-shrink:0;margin:0 -6px;z-index:1;
    "></div>
    <div style="flex:1;border-top:1px dashed ${C.corteLine};"></div>
  </div>
`;


const vCutLine = `
  <div style="
    width:${COL_SEP}px;flex-shrink:0;
    display:flex;align-items:stretch;justify-content:center;
  ">
    <div style="border-left:1px dashed ${C.corteLine};width:0;height:100%;"></div>
  </div>
`;


const renderFront = (word: string, forbiddenWords: string[]) => {
  const count = forbiddenWords.length;
  const wordFontSize = word.length > 14 ? "38px" : word.length > 10 ? "42px" : "36px";
  const forbFontSize = count >= 5 ? "41px" : count === 4 ? "44px" : "41px";
  const forbPaddingV = count >= 5 ? "5px" : "7px";

  return `
    <div style="
      width:${CARD_W_PX}px;height:${CARD_H_PX}px;
      background:#ffffff;border-radius:14px;border:2.5px solid ${C.acento};
      display:flex;flex-direction:column;overflow:hidden;
      box-shadow:0 4px 18px rgba(232,64,42,0.13), 0 1px 4px rgba(26,15,60,0.10);
      flex-shrink:0;
    ">
      <div style="
        background:linear-gradient(135deg, ${C.primario} 0%, #2d1f5e 100%);
        padding:13px 16px 12px;text-align:center;flex-shrink:0;
        display:flex;align-items:center;justify-content:center;gap:10px;
      ">
        <div style="width:8px;height:8px;border-radius:50%;background:${C.acento};opacity:0.7;flex-shrink:0;"></div>
        <span style="
          font-family:'Open Sans',sans-serif;font-size:22px;
          color:rgba(255,255,255,0.85);letter-spacing:1.8px;
          text-transform:uppercase;font-weight:700;
        ">Palabra prohibida</span>
        <div style="width:8px;height:8px;border-radius:50%;background:${C.acento};opacity:0.7;flex-shrink:0;"></div>
      </div>
      <div style="
        background:linear-gradient(160deg, ${C.acento} 0%, ${C.acentoSuave} 100%);
        margin:14px 16px 12px;border-radius:10px;padding:16px 14px 15px;
        text-align:center;flex-shrink:0;position:relative;overflow:hidden;
      ">
        <div style="position:absolute;top:-12px;right:-12px;width:70px;height:70px;border-radius:50%;background:rgba(255,255,255,0.10);"></div>
        <div style="position:absolute;bottom:-10px;left:-10px;width:50px;height:50px;border-radius:50%;background:rgba(255,255,255,0.08);"></div>
        <span style="
          font-family:'Open Sans',sans-serif;font-size:${wordFontSize};font-weight:800;
          color:#ffffff;line-height:1.25;letter-spacing:-0.3px;
          position:relative;z-index:1;text-shadow:0 1px 4px rgba(0,0,0,0.20);word-break:break-word;
        ">${word}</span>
      </div>
      <div style="flex:1;padding:4px 16px 8px;display:flex;flex-direction:column;justify-content:center;gap:2px;overflow:hidden;">
        ${forbiddenWords.map((w, i) => `
          <div style="
            font-family:'Open Sans',sans-serif;font-size:${forbFontSize};font-weight:700;
            color:${C.primario};text-align:center;padding:${forbPaddingV} 10px;
            border-bottom:${i < forbiddenWords.length - 1 ? `1px solid ${C.bordeLight}` : "none"};
          ">${w}</div>
        `).join("")}
      </div>
    </div>
  `;
};

//Carta trasera 
const renderBack = (
  collectionName: string,
  familyName: string,
  backImageUrl?: string,
) => `
  <div style="
    width:${CARD_W_PX}px;
    height:${CARD_H_PX}px;
    border:2px solid #1e1b4b;
    border-radius:16px;
    box-sizing:border-box;
    overflow:hidden;
    position:relative;
    background:#24164f;
    color:white;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    text-align:center;
    font-family:Arial, sans-serif;
  ">
    ${
      backImageUrl
        ? `<img 
            src="${backImageUrl}" 
            style="
              position:absolute;
              inset:0;
              width:100%;
              height:100%;
              object-fit:cover;
              z-index:0;
            "
          />`
        : ``
    }

    <div style="
      position:absolute;
      inset:0;
      background:rgba(20, 10, 50, 0.45);
      z-index:1;
    "></div>

    <div style="
      position:relative;
      z-index:2;
      font-size:22px;
      font-weight:bold;
      margin-bottom:8px;
    ">
      ${collectionName}
    </div>

    <div style="
      position:relative;
      z-index:2;
      font-size:16px;
      opacity:0.95;
    ">
      ${familyName}
    </div>
  </div>
`;


type CardData = { word: string; forbiddenWords?: string[] } | null;
const rotatedSlot = (inner: string) => `
  <div style="
    width:${CARD_H_PX}px;
    height:${CARD_W_PX}px;
    flex-shrink:0;
    position:relative;
    overflow:hidden;
  ">
    <div style="
      position:absolute;
      top:${(CARD_W_PX - CARD_H_PX) / 2}px;
      left:${(CARD_H_PX - CARD_W_PX) / 2}px;
      transform:rotate(-90deg);
      transform-origin:center center;
    ">
      ${inner}
    </div>
  </div>
`;

const renderSlot = (
  card: CardData,
  isFront: boolean,
  collectionName: string,
  familyName: string,
  backImageUrl?: string,
) => {
  const inner = card
    ? isFront
      ? renderFront(card.word, card.forbiddenWords ?? [])
      : renderBack(collectionName, familyName, backImageUrl)
    : `<div style="width:${CARD_W_PX}px;height:${CARD_H_PX}px;"></div>`;

  return rotatedSlot(inner);
};
//dos cartas rotadas en columnas
const renderRow = (
  cardA: CardData,
  cardB: CardData,
  isFront: boolean,
  collectionName: string,
  familyName: string,
  backImageUrl?: string,
) => `
  ${renderSlot(cardA, isFront, collectionName, familyName, backImageUrl)}
  ${vCutLine}
  ${renderSlot(cardB, isFront, collectionName, familyName, backImageUrl)}
`;


// Fila 1: F1 | F3   (frontales de cartas 1 y 3, rotadas)
// Fila 2: R1 | R3   (reversos  de cartas 1 y 3, rotadas)
// Fila 3: F2 | F4   (frontales de cartas 2 y 4, rotadas)
// Fila 4: R2 | R4   (reversos  de cartas 2 y 4, rotadas)
const renderCardGroup = (
  c1: CardData,
  c2: CardData,
  c3: CardData,
  c4: CardData,
  collectionName: string,
  familyName: string,
  backImageUrl?: string,
) => `
  ${renderRow(c1, c3, true, collectionName, familyName, backImageUrl)}
  ${hCutLine()}
  ${renderRow(c1, c3, false, collectionName, familyName, backImageUrl)}
  ${hCutLine()}
  ${renderRow(c2, c4, true, collectionName, familyName, backImageUrl)}
  ${hCutLine()}
  ${renderRow(c2, c4, false, collectionName, familyName, backImageUrl)}
`;

export const generateCollectionPDF = async (
  collection: Collection & { backImageUrl?: string }
) => {
  let cards = collection.cards ?? [];
  if (cards.length === 0) {
    try {
      cards = await cardService.getByTheme(Number(collection.id));
    } catch (e) {
      console.error("Error cargando tarjetas para el PDF", e);
    }
  }

  const familyName   = collection.vocationalFamily?.name ?? "Colección";

  // Agrupar de 4 en 4 (un grupo = una página A2)
  const groups: [CardData, CardData, CardData, CardData][] = [];
  for (let i = 0; i < cards.length; i += 4) {
    groups.push([
      cards[i]   ?? null,
      cards[i+1] ?? null,
      cards[i+2] ?? null,
      cards[i+3] ?? null,
    ]);
  }

 
  const sharedStyles = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Lexend:wght@700;800&display=swap');
      * { box-sizing:border-box; margin:0; padding:0; }
    </style>
  `;

  // A2 420mm × 594mm
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a2",
  });
  const pgW = pdf.internal.pageSize.getWidth();
  const pgH = pdf.internal.pageSize.getHeight();


  for (let gi = 0; gi < groups.length; gi++) {
    const [c1, c2, c3, c4] = groups[gi];

    const container = document.createElement("div");
    container.style.cssText = `
      position:fixed;left:-9999px;top:0;
      width:${A2_W_PX}px;height:${A2_H_PX}px;
      background:${C.fondo};font-family:'Open Sans',sans-serif;
      overflow:hidden;
    `;

    container.innerHTML = `
      ${gi === 0 ? sharedStyles : ""}
      ${hCutLine()}
      ${renderCardGroup(c1, c2, c3, c4, collection.name, familyName)}
      ${hCutLine()}
    `;

    document.body.appendChild(container);

    try {
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: C.fondo,
        width:  A2_W_PX,
        height: A2_H_PX,
        windowWidth:  A2_W_PX,
        windowHeight: A2_H_PX,
      });

      const imgData = canvas.toDataURL("image/png");

      if (gi > 0) {
        pdf.addPage();
        pdf.setFillColor(250, 250, 248);
        pdf.rect(0, 0, pgW, pgH, "F");
      }

      pdf.addImage(imgData, "PNG", 0, 0, pgW, pgH);
    } finally {
      document.body.removeChild(container);
    }
  }

  pdf.save(`${collection.name}.pdf`);
};