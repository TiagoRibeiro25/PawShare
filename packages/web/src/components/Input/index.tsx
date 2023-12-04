import React from "react";

type InputProps = {
	id: string;
	name: string;
	label?: string;
	type: string;
	required?: boolean;
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
	id,
	name,
	label,
	type,
	placeholder,
	required,
	value,
	onChange,
}): JSX.Element => {
	return (
		<>
			<label
				className={
					label ? "text-sm font-semibold text-secondaryColor" : "hidden"
				}
				htmlFor={id}
			>
				{label}
			</label>
			<input
				className="w-full px-4 py-2 mt-2 text-base placeholder-gray-500 border rounded-lg text-tertiaryColor border-secondaryColor focus:outline-none focus:border-tertiaryColor"
				id={id}
				name={name}
				type={type}
				placeholder={placeholder}
				required={required}
				value={value}
				onChange={onChange}
			/>
		</>
	);
};

export default Input;
