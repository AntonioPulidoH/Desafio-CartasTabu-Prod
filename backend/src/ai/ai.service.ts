import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GenerateCardsDto } from "./dto/generate-cards.dto";
import { GenerateCollectionDto } from "./dto/generate-collection.dto";

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>("GEMINI_API_KEY");

    if (!apiKey) {
      throw new Error(
        "Falta la variable de entorno GEMINI_API_KEY. Revisa tu archivo .env",
      );
    }

    // Inicializa el SDK de Google con la clave
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateCards(dto: GenerateCardsDto) {
    const { vocationalFamily, amount, context } = dto;

    const systemPrompt = `
      Eres un experto creador de contenido educativo para el juego 'Tabú' enfocado en estudiantes de Formación Profesional en España.
      Tu tarea es generar exactamente ${amount} cartas para la Familia Profesional de: "${vocationalFamily}".
      
      El contexto adicional del profesor es: "${context || "Ninguno en particular. Usa un nivel intermedio."}".
      
      Devuelve ÚNICAMENTE un objeto JSON válido con la siguiente estructura, sin texto markdown adicional:
      {
        "cards": [
          {
            "keyword": "PalabraPrincipal",
            "forbiddenWords": ["Tabu1", "Tabu2", "Tabu3", "Tabu4"]
          }
        ]
      }
    `;

    try {
      const model = this.genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const result = await model.generateContent(systemPrompt);
      const responseText = result.response.text();

      if (!responseText) {
        throw new InternalServerErrorException(
          "El asistente IA no ha devuelto ningún contenido.",
        );
      }

      return JSON.parse(responseText);
    } catch (error) {
      console.error("Error en Google Gemini:", error);
      throw new InternalServerErrorException(
        "Fallo al generar las cartas con el asistente IA",
      );
    }
  }

  async generateCollection(dto: GenerateCollectionDto) {
    const { vocationalFamily, topic, amount, context } = dto;

    const topicText = topic ? `centrada en el tema específico: "${topic}"` : "";

    const systemPrompt = `
      Eres un experto creador de contenido educativo para el juego 'Tabú' enfocado en estudiantes de Formación Profesional en España.
      Tu tarea es crear una Colección Temática completa de la Familia Profesional: "${vocationalFamily}" ${topicText}.
      
      El contexto adicional del profesor es: "${context || "Ninguno en particular. Usa un nivel intermedio."}".
      
      Instrucciones obligatorias:
      1. Inventa un "name" (título) atractivo y descriptivo para la colección (máximo 50 caracteres).
      2. Inventa una "description" breve (máximo 150 caracteres) explicando qué se va a repasar.
      3. Genera exactamente ${amount} cartas relacionadas con el tema.
      4. Cada carta debe tener un "keyword" (la palabra a adivinar) y entre 4 y 6 "forbiddenWords" (palabras tabú).
      
      Devuelve ÚNICAMENTE un objeto JSON válido con la siguiente estructura, sin texto markdown adicional:
      {
        "name": "Título de la Colección",
        "description": "Descripción breve de la temática",
        "cards": [
          {
            "keyword": "PalabraPrincipal",
            "forbiddenWords": ["Tabu1", "Tabu2", "Tabu3"]
          }
        ]
      }
    `;

    try {
      const model = this.genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const result = await model.generateContent(systemPrompt);
      let responseText = result.response.text();

      if (!responseText) {
        throw new InternalServerErrorException(
          "El asistente IA no ha devuelto ningún contenido.",
        );
      }

      responseText = responseText
        .replace(/```json/gi, "")
        .replace(/```/gi, "")
        .trim();

      return JSON.parse(responseText);
    } catch (error) {
      console.error("Error al generar colección con el asistente IA:", error);
      throw new InternalServerErrorException(
        "Fallo al generar la colección con el asistente IA",
      );
    }
  }
}
