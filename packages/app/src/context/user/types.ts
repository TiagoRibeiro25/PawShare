export type LoggedUser = {
	id: number;
	coins: number;
	country: {
		name: string;
		code: string;
	};
};

export type UserContextProps = {
	loggedUser: LoggedUser | null;
	setLoggedUser: React.Dispatch<React.SetStateAction<LoggedUser | null>>;
};
