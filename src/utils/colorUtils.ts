/**
 * Utilidades para manipulación de colores
 * Pensado para manipular los colores de temas
 */

// Añade opacidad a un color
export const addOpacity = (color: string, opacity: number = 0.2): string => {
  // Si es rgb, convertir a rgba
  if (color.startsWith('rgb(')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`);
  }
  // Si es hex, añadir opacidad (formato #RRGGBB)
  if (color.startsWith('#')) {
    const hex = Math.round(opacity * 255).toString(16).padStart(2, '0');
    return color + hex;
  }
  return color;
};
