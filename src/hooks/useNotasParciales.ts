import { useState, useEffect, useCallback } from "react";
import type { Parciales, NombreParcial } from "../interfaces/Parciales";

/**
 * Hook personalizado para la gestión y validación de notas académicas por parciales.
 * Maneja el estado de 3 parciales, valida rangos máximos y calcula el total automáticamente.
 */
export const useNotasParciales = () => {
    const [nota, setNota] = useState<Parciales>({
        parcial1: "",
        parcial2: "",
        parcial3: "",
        total: 0,
    });

    const MAX_P1_P2: number = 30;
    const MAX_P3: number = 40;
    const MAX_TOTAL: number = 100;
    const PASS_SCORE = 60;

    /**
     * Determina el puntaje máximo permitido según el parcial seleccionado.
     * @param {NombreParcial} nombreParcial - Identificador del parcial ('parcial1', 'parcial2', etc.)
     * @returns {number} El valor máximo permitido (30 o 40).
     */
    const obtenerNotaParcialMaxima = (nombreParcial: NombreParcial): number => {
        if (nombreParcial === 'parcial1' || nombreParcial === 'parcial2') {
            return MAX_P1_P2;
        }

        return MAX_P3;
    };

    /**
     * Calcula la suma total de los tres parciales actuales.
     * Memorizado con useCallback para evitar cálculos innecesarios si las notas no cambian.
     */
    const calcularTotal = useCallback(() => {
        const p1 = Number(nota.parcial1) || 0;
        const p2 = Number(nota.parcial2) || 0;
        const p3 = Number(nota.parcial3) || 0;

        return p1 + p2 + p3;
    }, [nota.parcial1, nota.parcial2, nota.parcial3]);

    // Efecto para actualizar el 'total' en el estado cada vez que cambian los parciales
    useEffect(() => {
        setNota((prev) => ({
            ...prev,
            total: calcularTotal(),
        }))
    }, [calcularTotal]);

    /**
     * Manejador para actualizar el valor de un parcial específico.
     * Incluye validaciones:
     * 1. Que el valor sea numérico.
     * 2. Que no sea negativo.
     * 3. Que no exceda el máximo permitido para ese parcial.
     * * @param {NombreParcial} nombreParcial - El campo que se está editando.
     * @param {string} valor - El valor ingresado por el usuario (input).
     */
    const handleCambiarNota = (nombreParcial: NombreParcial, valor: string) => {
        const max = obtenerNotaParcialMaxima(nombreParcial);
        const numValue = Number(valor);

        if (isNaN(numValue) || numValue < 0 || numValue > max) {
            return;
        }

        setNota((prev) => ({
            ...prev, 
            [nombreParcial]: numValue 
        }));
    }

    return {
        nota,
        handleCambiarNota,
        obtenerNotaParcialMaxima,
        MAX_TOTAL,
        PASS_SCORE,
    }
}