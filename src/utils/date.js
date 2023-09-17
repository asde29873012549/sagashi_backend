import { DateTime } from "luxon";

function getISODate30DaysAgo() {
	const currentDate = new Date();
	const thirtyDaysAgo = new Date(currentDate);
	thirtyDaysAgo.setDate(currentDate.getDate() - 30);

	const isoDateString = thirtyDaysAgo.toISOString().split("T")[0];
	return isoDateString;
}

const formatDateTime = () => {
	const formattedDate = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss");
	return formattedDate;
};

export { getISODate30DaysAgo, formatDateTime };
