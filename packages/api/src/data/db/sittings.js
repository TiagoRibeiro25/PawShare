module.exports = [
	{
		owner_id: 1,
		animal_id: 1,
		email_contact: "john.doe@pawshare.com",
		phone_contact: "123456789",
		notes: JSON.stringify(["Lorem ipsum dolor sit amet, consectetur adipiscing elit."]),
		city: "Porto",
		coins: 200,
		start_date: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000), // Today plus 30 days
		end_date: new Date(new Date().getTime() + 33 * 24 * 60 * 60 * 1000), // Today plus 33 days
	},
	{
		owner_id: 2,
		animal_id: 2,
		email_contact: "jane.doe@pawshare.com",
		phone_contact: "987654321",
		notes: JSON.stringify([
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		]),
		city: "Lisbon",
		coins: 100,
		start_date: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000), // Today plus 2 weeks
		end_date: new Date(new Date().getTime() + 16 * 24 * 60 * 60 * 1000), // Today plus 2 weeks and 2 days
	},
	{
		owner_id: 1,
		animal_id: 7,
		email_contact: "john.doe@pawshare.com",
		phone_contact: "123456789",
		city: "Porto",
		coins: 300,
		start_date: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // Yesterday
		end_date: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000), // Today plus 3 days
		is_closed: true,
	},
];
