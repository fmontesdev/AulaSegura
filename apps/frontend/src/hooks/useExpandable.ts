import { useState, useCallback } from 'react';

// Hook personalizado para manejar el estado de expansión/contracción de múltiples elementos
export function useExpandable() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Alterna el estado de expansión de un elemento
  const toggle = useCallback((id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  // Verifica si un elemento está expandido
  const isExpanded = useCallback((id: string): boolean => {
    return expandedItems.has(id);
  }, [expandedItems]);

  // Resetea todos los elementos a su estado contraído
  const reset = useCallback(() => {
    setExpandedItems(new Set());
  }, []);

  // Expande un elemento específico
  const expand = useCallback((id: string) => {
    setExpandedItems(prev => new Set(prev).add(id));
  }, []);

  // Contrae un elemento específico
  const collapse = useCallback((id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }, []);

  return {
    toggle,
    isExpanded,
    reset,
    expand,
    collapse,
    expandedItems,
  };
}
