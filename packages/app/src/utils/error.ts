const getMessage = (error: any): string => {
	console.log(error);

	if (
		error &&
		error.response &&
		error.response.data &&
		error.response.data.data &&
		error.response.data.data[0] &&
		error.response.data.data[0].msg
	) {
		return error.response.data.data[0].msg;
	} else {
		return 'An error occurred';
	}
};
export default { getMessage };
