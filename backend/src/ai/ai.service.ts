import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";
import { GenerateCardsDto } from "./dto/generate-cards.dto";

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>("OPENAI_API_KEY"),
    });
  }

  async generateCards(dto: GenerateCardsDto) {
    const { vocationalFamily, amount, context } = dto;

    const systemPrompt = `
      Eres un experto creador de contenido educativo para el juego 'Tabú' enfocado en estudiantes de Formación Profesional en España.
      Tu tarea es generar cartas para la Familia Profesional de: "${vocationalFamily}".
      
      Instrucciones obligatorias:
      1. Genera exactamente ${amount} cartas.
      2. El contexto adicional del profesor es: "${context || "Ninguno en particular. Usa un nivel intermedio."}". Adapta el tono y la dificultad a este contexto.
      3. Cada carta debe tener un "keyword" (la palabra a adivinar).
      4. Cada carta debe tener entre 3 y 5 "forbiddenWords" (palabras tabú que no se pueden decir para describir el keyword).
      5. Responde ÚNICAMENTE con un JSON válido que siga esta estructura exacta:
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
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" }, // Fuerza que devuelva JSON
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: "Genera las cartas ahora." },
        ],
        temperature: 0.7, // 0.7 da cierta creatividad
      });

      const jsonContent = response.choices[0].message.content;

      if (!jsonContent) {
        throw new InternalServerErrorException(
          "El asistente IA no ha devuelto ningún contenido.",
        );
      }

      return JSON.parse(jsonContent);
    } catch (error) {
      console.error("Error en OpenAI:", error);
      throw new InternalServerErrorException(
        "Fallo al generar las cartas con IA",
      );
    }
  }
}
