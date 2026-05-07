import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import type { Collection } from "../types/colection.interface";
import { cardService } from "./cardService";

// ─── Paleta ────────────────────────────────────────────────────────────────
const C = {
  primario:    "#281952",
  acento:      "#ff594d",
  secundario:  "#746baa",
  claro:       "#ffffff",
  bordeOsc:    "#281952",
  bordeLight:  "rgba(40,25,82,0.18)",
  suave:       "rgba(40,25,82,0.55)",
  muySuave:    "rgba(40,25,82,0.35)",
  fondoPagina: "#ffffff",
};
const hCutLine = `
  <div style="display:flex;align-items:center;gap:6px;padding:0;height:1px;flex-shrink:0;">
    <div style="flex:1;border-top:1.5px dashed ${C.muySuave};"></div>
  </div>
`;

const vCutLine = `
  <div style="width:1px;flex-shrink:0;display:flex;align-items:center;justify-content:center;">
    <div style="border-left:1.5px dashed ${C.muySuave};height:100%;"></div>
  </div>
`;

// Cara delantera
const renderFront = (word: string, forbiddenWords: string[]) => `
  <div style="
    width:100%;height:100%;
    background:#ffffff;
    border-radius:10px;
    border:3px solid ${C.acento};
    display:flex;flex-direction:column;
    overflow:hidden;
  ">


    <!-- Palabra principal -->
    <div style="
      background:${C.primario};
      margin:8px 10px 6px;
      border-radius:8px;
      padding:10px 8px;
      text-align:center;
    ">
      <span style="
        font-family:'Open Sans',sans-serif;
        font-size:16px;font-weight:700;
        color:#ffffff;line-height:1.2;
      ">${word}</span>
    </div>

    <!-- Palabras prohibidas -->
    <div style="flex:1;padding:4px 10px;display:flex;flex-direction:column;justify-content:center;gap:3px;">
      ${forbiddenWords.map(w => `
        <div style="
          font-family:'Open Sans',sans-serif;
          font-size:13px;font-weight:600;
          color:${C.acento};
          text-align:center;
          padding:3px 0;
        ">${w}</div>
      `).join("")}
    </div>

    <!-- Footer -->
    <div style="
      padding:6px;
      text-align:center;
      border-top:2px solid ${C.bordeLight};
    ">
    </div>
  </div>
`;

//Cara trasera
const renderBack = (
  collectionName: string,
  familyName: string,
  backImageUrl?: string
) => `
  <div style="
    width:100%;height:100%;
    background:#ffffff;
    border-radius:10px;
    border:3px solid ${C.acento};
    display:flex;flex-direction:column;
    overflow:hidden;
    position:relative;
  ">
    ${backImageUrl ? `
      <div style="
        position:absolute;inset:0;
        background:url('${backImageUrl}') center/contain no-repeat;
        opacity:0.55;
        border-radius:8px;
      "></div>
    ` : ""}

    <div style="
      position:relative;z-index:1;
      flex:1;display:flex;flex-direction:column;
      align-items:center;justify-content:center;
      gap:10px;padding:16px 10px;
    ">
      <!-- Puntitos decorativos -->
      <div style="display:flex;gap:5px;">
        ${Array(5).fill(`<div style="width:5px;height:5px;border-radius:50%;background:${C.acento};"></div>`).join("")}
      </div>

      <!-- Familia -->
      <div style="
        background:${C.acento};
        color:#ffffff;
        font-family:'Open Sans',sans-serif;
        font-size:8px;font-weight:700;
        letter-spacing:2px;text-transform:uppercase;
        padding:4px 12px;border-radius:20px;
      ">${familyName}</div>

      <!-- Línea -->
      <div style="width:35px;height:2px;background:${C.secundario};border-radius:2px;"></div>

      <!-- Nombre colección -->
      <div style="
        font-family:'Open Sans',sans-serif;
        font-size:13px;font-weight:700;
        color:${C.primario};
        text-align:center;line-height:1.3;
        padding:0 8px;
      ">${collectionName}</div>

      <!-- Línea -->
      <div style="width:35px;height:2px;background:${C.secundario};border-radius:2px;"></div>

      <!-- Puntitos decorativos -->
      <div style="display:flex;gap:5px;">
        ${Array(5).fill(`<div style="width:5px;height:5px;border-radius:50%;background:${C.acento};"></div>`).join("")}
      </div>
    </div>
  </div>
`;

const renderCardRow = (
  pair1: { word: string; forbiddenWords?: string[] } | null,
  pair2: { word: string; forbiddenWords?: string[] } | null,
  collectionName: string,
  familyName: string,
  backImageUrl?: string,
) => {
  const CARD_H = "260px";

  const slot = (
    card: { word: string; forbiddenWords?: string[] } | null,
    isFront: boolean
  ) => `
    <div style="flex:1;padding:0;height:${CARD_H};">
      ${card
        ? (isFront
            ? renderFront(card.word, card.forbiddenWords ?? [])
            : renderBack(collectionName, familyName, backImageUrl))
        : `<div style="width:100%;height:100%;"></div>`
      }
    </div>
  `;

  return `
    <div style="display:flex;align-items:stretch;padding:0;">
      ${slot(pair1, true)}
      ${vCutLine}
      ${slot(pair1, false)}
      ${vCutLine}
      ${slot(pair2, true)}
      ${vCutLine}
      ${slot(pair2, false)}
    </div>
  `;
};

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
  const backImageUrl = collection.backImageUrl;

//Para agrupar pedí ayuda a la IA
  const rows: [
    typeof cards[0] | null,
    typeof cards[0] | null
  ][] = [];
  for (let i = 0; i < cards.length; i += 2) {
    rows.push([cards[i] ?? null, cards[i + 1] ?? null]);
  }

  const A4_HEIGHT_PX = 1122;

  const container = document.createElement("div");
  container.style.cssText = `
    position:fixed;left:-9999px;top:0;
    width:794px;
    min-height:${A4_HEIGHT_PX}px;
    background:${C.fondoPagina};
    font-family:'Open Sans',sans-serif;
  `;

  container.innerHTML = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Varela+Round&display=swap');
      * { box-sizing:border-box; margin:0; padding:0; }
    </style>

    <!-- Cabecera -->
    <div style="padding:28px 16px 14px;">
      <div style="
        display:inline-block;
        background:${C.acento};color:${C.claro};
        font-size:8px;font-weight:700;
        letter-spacing:2px;text-transform:uppercase;
        padding:3px 12px;border-radius:20px;margin-bottom:7px;
      ">${familyName}</div>
      <h1 style="
        font-family:'Varela Round',sans-serif;
        font-size:22px;color:${C.primario};
        margin-bottom:3px;line-height:1.2;
      ">${collection.name}</h1>
      <p style="color:${C.suave};font-size:10px;">
        ${cards.length} tarjetas · recorta por las líneas punteadas
      </p>
    </div>

    ${hCutLine}

    ${rows.map(([c1, c2]) => `
      ${renderCardRow(c1, c2, collection.name, familyName, backImageUrl)}
      ${hCutLine}
    `).join("")}

    <!-- Pie -->
    <div style="padding:8px 16px 16px;display:flex;justify-content:space-between;">
      <span style="color:${C.muySuave};font-size:9px;letter-spacing:1px;text-transform:uppercase;">
        Tabú · ${collection.name}
      </span>
      <span style="color:${C.muySuave};font-size:9px;">
        ${new Date().toLocaleDateString("es-ES")}
      </span>
    </div>
  `;

  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      backgroundColor: C.fondoPagina,
      height: Math.max(container.scrollHeight, A4_HEIGHT_PX),
      windowHeight: Math.max(container.scrollHeight, A4_HEIGHT_PX),
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf     = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });
    const pgW     = pdf.internal.pageSize.getWidth();
    const pgH     = pdf.internal.pageSize.getHeight();
    const imgH    = (canvas.height * pgW) / canvas.width;

    let y = 0;
    while (y < imgH) {
      if (y > 0) {
        pdf.addPage();
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, 0, pgW, pgH, "F");
      }
      pdf.addImage(imgData, "PNG", 0, -y, pgW, imgH);
      y += pgH;
    }

    pdf.save(`${collection.name}.pdf`);
  } finally {
    document.body.removeChild(container);
  }
};