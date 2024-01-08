import React, { PropsWithChildren, createContext, useMemo, useState } from 'react';
import { Gender, Size } from '../../../types';
import { AdoptionFeedContextProps } from './types';

const AdoptionFeedContext = createContext<AdoptionFeedContextProps | undefined>(undefined);

const AdoptionFeedProvider: React.FC<PropsWithChildren> = ({
	children,
}): React.JSX.Element => {
	const [type, setType] = useState<string>('Any');
	const [region, setRegion] = useState<string>('Any');
	const [size, setSize] = useState<Size>('Any');
	const [gender, setGender] = useState<Gender>('Any');
	const [color, setColor] = useState<string>('Any');

	const contextValue: AdoptionFeedContextProps = useMemo(
		() => ({
			type,
			setType,
			region,
			setRegion,
			size,
			setSize,
			gender,
			setGender,
			color,
			setColor,
		}),
		[color, gender, region, size, type],
	);

	return (
		<AdoptionFeedContext.Provider value={contextValue}>
			{children}
		</AdoptionFeedContext.Provider>
	);
};

const useAdoptionFeedContext = (): AdoptionFeedContextProps => {
	const context = React.useContext(AdoptionFeedContext);

	if (context === undefined) {
		throw new Error('useAdoptionFeedContext must be used within a AdoptionFeedProvider');
	}

	return context;
};

export { AdoptionFeedProvider, useAdoptionFeedContext };
