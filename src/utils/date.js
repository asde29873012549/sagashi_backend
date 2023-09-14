import { DateTime } from "luxon";

function getISODate30DaysAgo() {
	const currentDate = new Date();
	const thirtyDaysAgo = new Date(currentDate);
	thirtyDaysAgo.setDate(currentDate.getDate() - 30);

	const isoDateString = thirtyDaysAgo.toISOString().split("T")[0];
	return isoDateString;
}

const formatDateTime = (date) => {
	const parsedDate = DateTime.fromMillis(date, { zone: "utc" });
	const formattedDate = parsedDate.toISO({ includeOffset: true });
	return formattedDate;
};

export { getISODate30DaysAgo, formatDateTime };
