export interface Parciales {
    parcial1: number | "";
    parcial2: number | "";
    parcial3: number | "";
    total: number;
}

export type NombreParcial = keyof Omit<Parciales, "total">;