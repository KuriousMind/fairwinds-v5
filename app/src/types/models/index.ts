export interface User {
  id: string;
  email: string;
  rv?: RV;
}

export interface RV {
  id: string;
  make: string;
  model: string;
  year: number;
  vin?: string;
  notes?: string;
  photos?: string[];
}

export interface MaintenanceRecord {
  id: string;
  title: string;
  date: string;
  type: string;
  notes?: string;
  photos?: string[];
}

export interface Document {
  id: string;
  title: string;
  type: string;
  url: string;
  tags?: string[];
}
