import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GenerateCardsDto } from "./dto/generate-cards.dto";

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
        model: "gemini-1.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const result = await model.generateContent(systemPrompt);
      const responseText = result.response.text();

      if (!responseText) {
        throw new InternalServerErrorException(
          "La IA no ha devuelto ningún contenido.",
        );
      }

      return JSON.parse(responseText);
    } catch (error) {
      console.error("Error en Google Gemini:", error);
      throw new InternalServerErrorException(
        "Fallo al generar las cartas con IA",
      );
    }
  }
}
