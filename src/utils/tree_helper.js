function cat_generator(result) {
	const cat = {};
	let current_department;
	let current_category;
	let min;
	let max;

	result.forEach((obj) => {
		if (obj.level === 1) {
			cat[obj.name] = {};
			current_department = obj.name;
			min = obj.start;
			max = obj.end;
		} else if (obj.level === 2) {
			cat[current_department][obj.name] = [];
			current_category = obj.name;
			min = obj.start;
			max = obj.end;
		} else if (obj.level === 3 && obj.start > min && obj.end < max) {
			cat[current_department][current_category].push(obj.name);
		}
	});

	return cat;
}

function size_generator(data, categorySplitNum) {
	const sizeObj = { Menswear: {}, Womenswear: {} };

	data.forEach((obj) => {
		if (obj.start < categorySplitNum) {
			sizeObj.Menswear[obj.name] = obj.Sizes.map((nested) => nested.name);
		}
		sizeObj.Womenswear[obj.name] = obj.Sizes.map((nested) => nested.name);
	});

	return sizeObj;
}

export { cat_generator, size_generator };
