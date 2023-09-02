function getISODate30DaysAgo() {
	const currentDate = new Date();
	const thirtyDaysAgo = new Date(currentDate);
	thirtyDaysAgo.setDate(currentDate.getDate() - 30);

	const isoDateString = thirtyDaysAgo.toISOString().split("T")[0];
	return isoDateString;
}

export { getISODate30DaysAgo };
