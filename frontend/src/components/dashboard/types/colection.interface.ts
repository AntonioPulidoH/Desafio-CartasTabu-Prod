import type { TabuCard } from "./tabuCard.interface";

export interface Collection {
  id: string;
  name: string;
  description: string;
  creatorId:number;
  vocationalFamilyId:number;
  vocationalFamily?: { id: number; name: string };
  cards?:TabuCard[]
  createdAt:string

}