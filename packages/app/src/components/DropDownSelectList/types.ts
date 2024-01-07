export type Option = {
	key: string;
	value: string;
	disabled?: boolean;
};

export type Props = {
	data: Option[];
	setSelected: (value: string) => void;
	searchPlaceholder?: string;
	defaultOption?: Option;
	label?: string;
	className?: string;
};
