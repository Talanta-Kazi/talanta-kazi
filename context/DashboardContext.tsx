import { createContext } from 'react';

export const DashboardContext = createContext({
	handleDeviceSelect: (_id: string) => {},
});
