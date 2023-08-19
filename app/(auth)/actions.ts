import { apiClient } from '@/lib/api';
import { GenericResponse } from '@/lib/types';
import { RegisterInputSchema } from '@/lib/validations/auth';

const registerUserFn = async (user: RegisterInputSchema) => {
	const response = await apiClient.post<GenericResponse>('/api/register', user);
	return response.data;
};

export { registerUserFn };
