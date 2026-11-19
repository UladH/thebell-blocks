export enum ProductId {
  Tech = 'tech',
  Pro = 'pro',
  Invest = 'invest',
  Club = 'club',
}

export interface ProductTariff {
  id: string;
  label: string;
  period: string;
  priceUsd: number;
  priceUsdOld?: number;
}

export interface Product {
  id: ProductId;
  name: string;
  pitch: string;
  externalUrl: string;
  coverImage?: string;
  tariffs?: ProductTariff[];
}
