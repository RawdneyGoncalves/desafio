export interface Package {
  body(body: any): unknown;
  params: any;
  id: number;
  name: string;
  themes: string[];
  version: string;
  created_at: Date;
  updated_at: Date;
}
