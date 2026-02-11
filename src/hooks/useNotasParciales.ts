import { useState, useEffect, useCallback } from "react";
import type { Parciales, NombreParcial } from "../interfaces/Parciales";

/**
 * Hook de lógica de negocio para el módulo de calificaciones.
 * * **Responsabilidades:**
 * 1. Centraliza el estado de las notas (Single Source of Truth).
 * 2. Aplica reglas de negocio (validación de rangos 0-30/40).
 * 3. Automatiza el cálculo del total mediante efectos.
 * * @returns {Object} API pública del hook para consumir en componentes de vista.
 */
export const useNotasParciales = () => {
    // Estado inicial: Usamos cadenas vacías ("") para representar campos limpios en la UI
    // en lugar de 0, mejorando la experiencia de usuario (UX).
    const [nota, setNota] = useState<Parciales>({
        parcial1: "",
        parcial2: "",
        parcial3: "",
        total: 0,
    });

    // --- Constantes de Configuración (Business Logic) ---
    /** Límite máximo para el 1er y 2do parcial (30%) */
    const MAX_P1_P2: number = 30;
    /** Límite máximo para el 3er parcial (40%) */
    const MAX_P3: number = 40;
    /** Total acumulado máximo del curso */
    const MAX_TOTAL: number = 100;
    /** Puntaje mínimo para aprobar la asignatura */
    const PASS_SCORE = 60;

    /**
     * Helper para obtener dinámicamente el tope de calificación según el parcial.
     * Útil para validar inputs y mostrar feedback visual al usuario.
     * * @param {NombreParcial} nombreParcial - La clave del parcial ('parcial1' | 'parcial2' | 'parcial3').
     * @returns {number} El valor máximo permitido (30 o 40).
     */
    const obtenerNotaParcialMaxima = (nombreParcial: NombreParcial): number => {
        // Lógica de agrupación: P1 y P2 comparten el mismo peso ponderado.
        if (nombreParcial === 'parcial1' || nombreParcial === 'parcial2') {
            return MAX_P1_P2;
        }
        return MAX_P3;
    };

    /**
     * Calcula la sumatoria de las notas actuales.
     * * **Optimización:** Envuelto en `useCallback` para mantener la identidad referencial
     * de la función y evitar ejecuciones innecesarias del `useEffect` dependiente.
     */
    const calcularTotal = useCallback(() => {
        // Conversión segura: 'Number' convierte "" a 0, evitando NaN en la suma visual.
        const p1 = Number(nota.parcial1) || 0;
        const p2 = Number(nota.parcial2) || 0;
        const p3 = Number(nota.parcial3) || 0;

        return p1 + p2 + p3;
    }, [nota.parcial1, nota.parcial2, nota.parcial3]);

    /**
     * Efecto secundario: Sincronización de datos.
     * Mantiene la propiedad `total` siempre consistente con los valores de los parciales.
     */
    useEffect(() => {
        setNota((prev) => ({
            ...prev,
            total: calcularTotal(),
        }))
    }, [calcularTotal]);

    /**
     * Manejador de eventos (Event Handler) para inputs controlados.
     * Realiza validaciones estrictas antes de actualizar el estado para garantizar integridad de datos.
     * * @param {NombreParcial} nombreParcial - Identificador del campo a modificar.
     * @param {string} valor - Valor crudo proveniente del input HTML (siempre es string).
     */
    const handleCambiarNota = (nombreParcial: NombreParcial, valor: string) => {
        // 1. Obtener regla de validación específica para este campo
        const max = obtenerNotaParcialMaxima(nombreParcial);
        
        // 2. Intentar conversión numérica
        const numValue = Number(valor);

        // 3. Guardias de Validación (Validation Guards):
        // - Si no es número (isNaN)
        // - Si es negativo
        // - Si supera el máximo permitido para ese parcial
        if (isNaN(numValue) || numValue < 0 || numValue > max) {
            // Early Return: Ignoramos el cambio, el input no se actualiza.
            return;
        }

        // 4. Actualización inmutable del estado
        // Usamos Computed Property Names ([nombreParcial]) para dinamismo.
        setNota((prev) => ({
            ...prev, 
            [nombreParcial]: numValue 
        }));
    }

    // Exponemos solo lo necesario (Principio de Encapsulamiento)
    return {
        nota,
        handleCambiarNota,
        obtenerNotaParcialMaxima,
        MAX_TOTAL,
        PASS_SCORE,
    }
}