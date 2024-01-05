export type LoggedUser = {
	id: number;
	coins: number;
};

export type UserContextProps = {
	loggedUser: LoggedUser | null;
	setLoggedUser: React.Dispatch<React.SetStateAction<LoggedUser | null>>;
};
