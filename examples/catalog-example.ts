import type { ComponentType } from 'react';

export type CatalogExample = {
  id: string;
  title: string;
  description?: string;
  Component: ComponentType;
};
