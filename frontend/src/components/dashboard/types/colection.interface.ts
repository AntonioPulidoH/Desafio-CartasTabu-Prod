import type { TabuCard } from "./tabuCard.interface";

export interface Collection {
  id: string;
  name: string;
  description: string;
  category: string;
  cards: TabuCard[];
  createdAt: string;
}