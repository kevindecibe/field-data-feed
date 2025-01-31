import { useEffect, useState } from 'react';

const FEED_ITEM_HEIGHT = 300; // tamaño aproximado de cada item
const BUFFER_ITEMS = 2; // cantidad de items adicionales a renderizar para evitar flickering

/**
 * Hook personalizado que calcula el número óptimo de elementos skeleton a mostrar
 * basado en el tamaño del dispositivo.
 * @returns {number} Número de elementos skeleton que deberían renderizarse
 */
export function useSkeletonCount() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const calculateItems = () => {
      const viewportHeight = window.innerHeight;
      const itemsCount =
        Math.ceil(viewportHeight / FEED_ITEM_HEIGHT) + BUFFER_ITEMS;
      setCount(itemsCount);
    };

    calculateItems();
    window.addEventListener('resize', calculateItems);
    return () => window.removeEventListener('resize', calculateItems);
  }, []);

  return count;
}
