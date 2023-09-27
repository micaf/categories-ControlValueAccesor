import { Subcategory } from "./subcategory.model";

export interface Category {
    id: string;
    name: string;
    referenceCode?: string;
    subcategories?: Subcategory[];
  }