/**
 * Representa el estado completo de las calificaciones de un estudiante.
 * Se utiliza tanto para el almacenamiento en el estado (useState) como para la manipulación de datos.
 */
export interface Parciales {
    /** * Nota del Primer Parcial. 
     * Puede ser un número (calificación) o una cadena vacía (campo limpio en la UI).
     */
    parcial1: number | "";

    /** * Nota del Segundo Parcial. 
     * Puede ser un número o una cadena vacía.
     */
    parcial2: number | "";

    /** * Nota del Tercer Parcial. 
     * Puede ser un número o una cadena vacía.
     */
    parcial3: number | "";

    /** * La suma total de los tres parciales.
     * Es estrictamente un número (inicia en 0), ya que es un valor calculado, no ingresado.
     */
    total: number;
}

/**
 * Tipo utilitario que extrae solo las claves (nombres) de los parciales editables.
 * * @example
 * // El tipo resultante es equivalente a:
 * type NombreParcial = "parcial1" | "parcial2" | "parcial3";
 * * Se excluye "total" porque no es un campo que el usuario pueda editar directamente.
 */
export type NombreParcial = keyof Omit<Parciales, "total">;