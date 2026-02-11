import type { NombreParcial } from "./Parciales";

export interface InputProps {
    label: string;
    maxPoints: number;
    value: number | '';
    name: NombreParcial;
    onChange: (name: NombreParcial, value: string) => void;
}