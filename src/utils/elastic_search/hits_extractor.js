export default function hits_extractor(data) {
	if (data.hits.hits.length === 0) return {};
	const result = data.hits.hits.map((hit) => {
		/* eslint-disable*/
		const hits = hit._source;
		/* eslint-disable */
		hits.sort = hit.sort;
		return hits;
	});

	return result;
}
