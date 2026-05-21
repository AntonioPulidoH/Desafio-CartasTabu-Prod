import type { TabuCard } from "./tabuCard.interface";

export interface Collection {
  id: string;
  name: string;
  description: string;
  creatorId:number;
  isPublic?: boolean;
  vocationalFamilyId:number;
  vocationalFamily?: { id: number; name: string };
  cards?:TabuCard[]
  createdAt:string;
  backImageUrl?: string;
  _count?: {        
    cards: number;
  };

}