const getMessage = (error: any): string => {
	return error?.response?.data?.data[0]?.msg || 'An error occurred';
};

export default { getMessage };
