import React, { PropsWithChildren, createContext, useMemo, useState } from 'react';
import { Gender, Size } from '../../../types';
import { SittingFeedContextProps } from './types';

const SittingFeedContext = createContext<SittingFeedContextProps | undefined>(undefined);

const SittingFeedProvider: React.FC<PropsWithChildren> = ({ children }): React.JSX.Element => {
	const [type, setType] = useState<string>('Any');
	const [region, setRegion] = useState<string>('Any');
	const [size, setSize] = useState<Size>('Any');
	const [gender, setGender] = useState<Gender>('Any');
	const [color, setColor] = useState<string>('Any');
	const [coins, setCoins] = useState<number>(0);

	const contextValue: SittingFeedContextProps = useMemo(
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
			coins,
			setCoins,
		}),
		[coins, color, gender, region, size, type],
	);

	return (
		<SittingFeedContext.Provider value={contextValue}>{children}</SittingFeedContext.Provider>
	);
};

const useSittingFeedContext = (): SittingFeedContextProps => {
	const context = React.useContext(SittingFeedContext);

	if (context === undefined) {
		throw new Error('useSittingFeedContext must be used within a SittingFeedProvider');
	}

	return context;
};

export { SittingFeedProvider, useSittingFeedContext };
