import type { NombreParcial } from "../interfaces/Parciales";

/**
 * Propiedades (Props) para el componente de Input de Notas.
 * Define la estructura necesaria para renderizar un campo de captura de calificación.
 */
export interface InputProps {
    /** * Texto descriptivo que se mostrará junto al input (ej: "Primer Parcial"). 
     */
    label: string;

    /** * Valor máximo permitido para este campo. 
     * Útil para validaciones visuales o atributos HTML como 'max'.
     */
    maxPoints: number;

    /** * El valor actual del input controlado.
     * Puede ser un número (la nota) o una cadena vacía (cuando se limpia el campo).
     */
    value: number | '';

    /** * Identificador único del parcial que este input modifica.
     * Corresponde a las claves del estado (ej: 'parcial1', 'parcial2').
     */
    name: NombreParcial;

    /** * Callback que se ejecuta cuando el usuario escribe en el input.
     * @param name - El nombre del parcial que se está modificando.
     * @param value - El nuevo valor ingresado como string.
     */
    onChange: (name: NombreParcial, value: string) => void;
}