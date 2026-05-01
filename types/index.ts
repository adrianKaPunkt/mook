export type Location = {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  street?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  email?: string;
  imageUrl?: string;
  isActive: boolean;
  openingHours?: {
    de: { days: string; hours: string }[];
    en: { days: string; hours: string }[];
  };
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
};

export type MenuItem = {
  id: string;
  name: string;
  description_de: string | null;
  description_en: string | null;
  price: unknown | number;
  imageUrl: string | null;
  allergens: string[];
  spiceLevel: number | null;
  upgrades: unknown;
  newUntil?: Date | null;
  servingInfo: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  sortOrder?: number;
  isActive?: boolean;
  categoryId?: string;
};

export type MenuUpgrade = {
  name: string;
  price: number;
};

export type MenueCategory = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  sortOrder: number;
  isActive: boolean;
  name_de: string;
  name_en: string;
  description_de: string | null;
  description_en: string | null;
  imageUrl: string | null;
  locationId: string;
  items: MenuItem[];
};

export type Allergens = {
  key: string;
  name_de: string;
  name_en: string;
  description_de: string;
  description_en: string;
  imageUrl: string;
};
