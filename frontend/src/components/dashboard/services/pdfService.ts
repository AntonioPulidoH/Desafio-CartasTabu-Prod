import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import type { Collection } from "../types/colection.interface";
import { cardService } from "./cardService";

//Paleta de coloers
const C = {
  primario:   "#281952",
  fondo:      "#1e1245",
  acento:     "#ff594d",
  secundario: "#746baa",
  claro:      "#fdfbf7",
  borde:      "rgba(255,255,255,0.25)",     
  bordeLight: "rgba(255, 255, 255, 0.75)",  
  suave:      "rgba(255, 255, 255, 0.87)",  
  muySuave:   "rgba(255, 255, 255, 0.62)",  
};


const hCutLine = `
  <div style="display:flex;align-items:center;gap:6px;padding:0 32px;height:16px;">
    <span style="color:${C.muySuave};font-size:12px;line-height:1;">✂</span>
    <div style="flex:1;border-top:1.5px dashed ${C.muySuave};"></div>
  </div>
`;

const vCutLine = `
  <div style="width:16px;display:flex;justify-content:center;">
    <div style="border-left:1.5px dashed ${C.muySuave};height:100%;"></div>
  </div>
`;

// Parte de delante
const renderFront = (word: string, forbiddenWords: string[]) => `
  <div style="
    width:100%;height:100%;
    background:${C.primario};
    border-radius:10px;border:1.5px solid ${C.borde};
    display:flex;flex-direction:column;overflow:hidden;
  ">
    <div style="padding:8px 10px 6px;text-align:center;border-bottom:1px solid ${C.bordeLight};">
      <span style="font-family:'Varela Round',sans-serif;font-size:9px;color:${C.suave};letter-spacing:1.5px;text-transform:uppercase;">
        ¿Qué palabra se esconde?
      </span>
    </div>

    <div style="background:${C.fondo};margin:8px 10px;border-radius:6px;padding:8px 6px;text-align:center;border:1px solid ${C.bordeLight};">
      <span style="font-family:'Varela Round',sans-serif;font-size:16px;font-weight:700;color:${C.claro};line-height:1.2;">
        ${word}
      </span>
    </div>

    <div style="flex:1;padding:0 10px;display:flex;flex-direction:column;gap:4px;justify-content:center;">
      ${forbiddenWords.map(w => `
        <div style="font-family:'Open Sans',sans-serif;font-size:11px;color:${C.acento};text-align:center;padding:3px 0;">
          ${w}
        </div>
      `).join("")}
    </div>

    <div style="padding:6px;text-align:center;border-top:1px solid ${C.bordeLight};">
      <span style="color:${C.acento};font-size:14px;">✕</span>
    </div>
  </div>
`;

// Parte de atrás
const renderBack = (collectionName: string, familyName: string) => `
  <div style="
    width:100%;height:100%;
    background:${C.primario};
    border-radius:10px;border:1.5px solid ${C.borde};
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    gap:10px;padding:16px 12px;
  ">
    <div style="display:flex;gap:5px;">
      ${Array(5).fill(`<div style="width:4px;height:4px;border-radius:50%;background:${C.borde};"></div>`).join("")}
    </div>

    <div style="background:${C.acento};color:${C.claro};font-family:'Open Sans',sans-serif;font-size:8px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:3px 10px;border-radius:20px;">
      ${familyName}
    </div>

    <div style="width:30px;height:1.5px;background:${C.secundario};"></div>

    <div style="font-family:'Varela Round',sans-serif;font-size:13px;color:${C.claro};text-align:center;line-height:1.4;">
      ${collectionName}
    </div>

    <div style="width:30px;height:1.5px;background:${C.secundario};"></div>

    <div style="display:flex;gap:5px;">
      ${Array(5).fill(`<div style="width:4px;height:4px;border-radius:50%;background:${C.borde};"></div>`).join("")}
    </div>
  </div>
`;

//Fila con las cartas
const renderRow = (
  row: { word: string; forbiddenWords?: string[] }[],
  isFront: boolean,
  collectionName: string,
  familyName: string
) => `
  <div style="display:flex;align-items:stretch;padding:0 32px;height:190px;">
    ${row.map((card, i) => `
      ${i > 0 ? vCutLine : ""}
      <div style="flex:1;padding:4px;">
        ${isFront
          ? renderFront(card.word, card.forbiddenWords ?? [])
          : renderBack(collectionName, familyName)
        }
      </div>
    `).join("")}
    ${row.length < 3
      ? Array(3 - row.length).fill(`${vCutLine}<div style="flex:1;"></div>`).join("")
      : ""
    }
  </div>
`;


export const generateCollectionPDF = async (collection: Collection) => {
  let cards = collection.cards ?? [];
  if (cards.length === 0) {
    try {
      cards = await cardService.getByTheme(Number(collection.id));
    } catch (e) {
      console.error("Error cargando tarjetas para el PDF", e);
    }
  }

  const familyName = collection.vocationalFamily?.name ?? "Colección";
  const rows: typeof cards[] = [];
  for (let i = 0; i < cards.length; i += 3) {
    rows.push(cards.slice(i, i + 3));
  }


  const A4_HEIGHT_PX = 1122;

  const container = document.createElement("div");
  container.style.cssText = `
    position:fixed;left:-9999px;top:0;
    width:794px;
    min-height:${A4_HEIGHT_PX}px;
    background:${C.fondo};
    font-family:'Open Sans',sans-serif;
  `;

  container.innerHTML = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Varela+Round&display=swap');
      * { box-sizing:border-box; margin:0; padding:0; }
    </style>

    <!-- Cabecera -->
    <div style="padding:36px 32px 20px;">
      <div style="display:inline-block;background:${C.acento};color:${C.claro};font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:3px 12px;border-radius:20px;margin-bottom:8px;">
        ${familyName}
      </div>
      <h1 style="font-family:'Varela Round',sans-serif;font-size:22px;color:${C.claro};margin-bottom:4px;">
        ${collection.name}
      </h1>
      <p style="color:${C.suave};font-size:11px;">
        ${cards.length} tarjetas · recorta por las líneas punteadas
      </p>
    </div>

    ${hCutLine}

    ${rows.map(row => `
      ${renderRow(row, true,  collection.name, familyName)}
      ${hCutLine}
      ${renderRow(row, false, collection.name, familyName)}
      ${hCutLine}
    `).join("")}

    <!-- Pie -->
    <div style="padding:12px 32px 0;display:flex;justify-content:space-between;">
      <span style="color:${C.muySuave};font-size:10px;letter-spacing:1px;text-transform:uppercase;">
        Tabú · ${collection.name}
      </span>
      <span style="color:${C.muySuave};font-size:10px;">
        ${new Date().toLocaleDateString("es-ES")}
      </span>
    </div>
  `;

  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      backgroundColor: C.fondo,
      height: Math.max(container.scrollHeight, A4_HEIGHT_PX),
      windowHeight: Math.max(container.scrollHeight, A4_HEIGHT_PX),
    });

    const imgData  = canvas.toDataURL("image/png");
    const pdf      = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });
    const pgW      = pdf.internal.pageSize.getWidth();
    const pgH      = pdf.internal.pageSize.getHeight();
    const imgH     = (canvas.height * pgW) / canvas.width;

    let y = 0;
    while (y < imgH) {
      if (y > 0) {
        pdf.addPage();
        pdf.setFillColor(30, 18, 69);
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