export const fetchHighlightPaintings = async (total = 1000) => {
	const limitPerRequest = 100; // AIC API max pro Request
	let artworks = [];
	let page = 1;

	try {
		while (artworks.length < total) {
			const response = await fetch(
				`https://api.artic.edu/api/v1/artworks?limit=${limitPerRequest}&page=${page}&fields=id,title,artist_title,date_display,image_id`
			);
			const data = await response.json();

			if (!data.data || data.data.length === 0) break; // keine weiteren Werke

			const paintings = data.data
				.filter((item) => item.image_id)
				.map((item) => ({
					objectID: item.id,
					primaryImageSmall: `https://www.artic.edu/iiif/2/${item.image_id}/full/600,/0/default.jpg`,
					title: item.title,
					artistDisplayName: item.artist_title || 'Unknown',
					objectDate: item.date_display || 'Unknown',
					classification: 'Painting',
				}));

			artworks = [...artworks, ...paintings];

			if (data.pagination?.total_pages && page >= data.pagination.total_pages)
				break;

			page++;
		}

		// nur die gewünschte Gesamtanzahl zurückgeben
		return artworks.slice(0, total);
	} catch (error) {
		console.error('Fehler beim Abrufen der Kunstwerke:', error);
		return [];
	}
};
