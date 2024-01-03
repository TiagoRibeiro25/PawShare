import { TouchableOpacity } from 'react-native';

export type Props = {
	disabled?: boolean;
	className?: string;
	children: React.ReactNode;
	activeOpacity?: number;
	onPress?: () => void | Promise<void>;
} & React.ComponentProps<typeof TouchableOpacity>;
