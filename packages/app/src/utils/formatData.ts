const capitalize = (str: string) => {
	return str
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};

const convertDateToLocaleString = (date: string): string => {
	const dateObj = new Date(date);
	return dateObj.toLocaleDateString('pt-PT', {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
	});
};

// Return number of days between two dates
const getDifferenceInDays = (firstDate: string, secondDate: string): number => {
	const date1 = new Date(firstDate);
	const date2 = new Date(secondDate);

	const diffTime = Math.abs(date2.getTime() - date1.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	return diffDays;
};

export default { capitalize, convertDateToLocaleString, getDifferenceInDays };
