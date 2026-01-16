export type Promotion = {
  id: number;
  name: string;
  annee: number;
};

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: "ADMIN" | "COORDON" | "ENCADREUR" | "ETUDIANT";
  promotion?: Promotion | null;
};
