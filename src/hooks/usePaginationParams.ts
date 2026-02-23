import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web' && typeof window !== 'undefined';

// Lee page y limit desde la URL actual
function readFromURL(defaultLimit: number) {
  if (!isWeb) return { page: 1, limit: defaultLimit };
  const params = new URLSearchParams(window.location.search);
  return {
    page:  parseInt(params.get('page') ?? '1', 10) || 1,
    limit: parseInt(params.get('limit') ?? String(defaultLimit), 10) || defaultLimit,
  };
}

// Escribe page y limit en la URL sin crear entrada en el historial
function writeToURL(page: number, limit: number, router: ReturnType<typeof useRouter>) {
  if (isWeb) {
    const url = new URL(window.location.href);
    url.searchParams.set('page', String(page));
    url.searchParams.set('limit', String(limit));
    // URLSearchParams codifica las comas de otros params (ej: filters) como %2C
    // Las restauramos porque la coma es un carácter válido en URLs (RFC 3986)
    window.history.replaceState({}, '', url.toString().replace(/%2C/gi, ','));
  } else {
    router.setParams({ page: String(page), limit: String(limit) });
  }
}

// Sincroniza page y limit con los query params de la URL (?page=2&limit=20)
export function usePaginationParams({ defaultLimit = 10, filters = [] as string[] } = {}) {
  const router = useRouter();
  const [page, setPageState] = useState(1);
  const [limit, setLimitState] = useState(defaultLimit);
  // Evita que el efecto [page, limit] escriba en URL cuando el cambio viene de la URL
  // o es la inicialización en el montaje (aún no se ha leído la URL)
  const skipNextURLWrite = useRef(true);

  // URL -> Estado
  // Al montar: lee la URL y sincroniza el estado
  // Se usa setTimeout(0) para ejecutarse después de que Expo Router haya aplicado history.pushState en
  // sus propios efectos, garantizando que window.location ya refleja la pantalla actual y no la anterior
  useEffect(() => {
    const timer = setTimeout(() => {
      const { page: urlPage, limit: urlLimit } = readFromURL(defaultLimit);
      writeToURL(urlPage, urlLimit, router);
      if (urlPage !== page || urlLimit !== limit) {
        skipNextURLWrite.current = true;
        setPageState(urlPage);
        setLimitState(urlLimit);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Estado -> URL
  // Cuando page o limit cambian por acción del usuario: escribe en la URL
  useEffect(() => {
    if (skipNextURLWrite.current) { skipNextURLWrite.current = false; return; }
    writeToURL(page, limit, router);
  }, [page, limit]);

  // Resetea a la primera página cuando cambian los filtros
  // Se omite el montaje inicial para no interferir con la lectura de la URL
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) { isMounted.current = true; return; }
    setPageState(1);
  }, [filters]);

  // Función para actualiar la página actual
  const setPage = (p: number) => setPageState(p);

  // Función para actualizar el límite de items por página (resetea a página 1)
  const setLimit = (l: number) => { setLimitState(l); setPageState(1); };

  return { page, limit, setPage, setLimit };
}
