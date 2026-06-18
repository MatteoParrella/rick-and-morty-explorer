const BASE_URL = "https://rickandmortyapi.com/api";

export async function getCharacters(page = 1, filters = {}) {
  const params = new URLSearchParams({
    page: String(page),
    ...filters,
  });

  const response = await fetch(`${BASE_URL}/character?${params}`);

  if (!response.ok) {
    throw new Error("Errore nel caricamento dei personaggi");
  }

  return response.json();
} 

export async function getCharacterById(id: string | undefined) {
  if (!id) {
    throw new Error("ID personaggio mancante");
  }

  const response = await fetch(`${BASE_URL}/character/${id}`);

  if (!response.ok) {
    throw new Error("Personaggio non trovato");
  }

  return response.json();
} 

export async function getEpisodes(page = 1, filters = {}) {
  const params = new URLSearchParams({
    page: String(page),
    ...filters,
  });

  const response = await fetch(`${BASE_URL}/episode?${params}`);

  if (!response.ok) {
    throw new Error("Errore nel caricamento degli episodi");
  }

  return response.json();
}

export async function getEpisodeById(id: string | undefined) {
  if (!id) {
    throw new Error("ID episodio mancante");
  }

  const response = await fetch(`${BASE_URL}/episode/${id}`);

  if (!response.ok) {
    throw new Error("Episodio non trovato");
  }

  return response.json();
}

export async function getLocations(page = 1, filters = {}) {
  const params = new URLSearchParams({
    page: String(page),
    ...filters,
  });

  const response = await fetch(`${BASE_URL}/location?${params}`);

  if (!response.ok) {
    throw new Error("Errore nel caricamento delle locations");
  }

  return response.json();
}

export async function getLocationById(id: string | undefined) {
  if (!id) {
    throw new Error("ID location mancante");
  }

  const response = await fetch(`${BASE_URL}/location/${id}`);

  if (!response.ok) {
    throw new Error("Location non trovata");
  }

  return response.json();
}

export async function getMultipleFromUrls(urls: string[]) {
  if (urls.length === 0) return [];

  // Extract the resource type and IDs from the first URL to decide if we can batch
  const batchMatch = urls[0].match(/\/api\/(character|episode|location)\/(\d+)$/);
  if (batchMatch) {
    const type = batchMatch[1];
    const ids = urls.map((u) => u.split("/").pop()).join(",");
    const response = await fetch(`${BASE_URL}/${type}/${ids}`);
    if (!response.ok) throw new Error("Errore nel caricamento dei dati collegati");
    const data = await response.json();
    // Single ID returns an object; multiple IDs return an array
    return Array.isArray(data) ? data : [data];
  }

  // Fallback: individual requests for unknown URL patterns
  return Promise.all(
    urls.map((url) =>
      fetch(url).then((r) => {
        if (!r.ok) throw new Error("Errore nel caricamento dei dati collegati");
        return r.json();
      })
    )
  );
}
export async function getAllEpisodes() {
  const firstResponse = await fetch(`${BASE_URL}/episode`);

  if (!firstResponse.ok) {
    throw new Error("Errore nel caricamento degli episodi");
  }

  const firstData = await firstResponse.json();

  const totalPages = firstData.info.pages;
  const allEpisodes = [...firstData.results];

  for (let page = 2; page <= totalPages; page++) {
    const response = await fetch(`${BASE_URL}/episode?page=${page}`);

    if (!response.ok) {
      throw new Error("Errore nel caricamento degli episodi");
    }

    const data = await response.json();
    allEpisodes.push(...data.results);
  }

  return allEpisodes;
}