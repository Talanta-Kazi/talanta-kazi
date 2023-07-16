import { RegisterInputSchema } from '@/lib/validations/auth';
import { GenericResponse } from '@/lib/types';
import { apiClient } from '@/lib/api';

const registerUserFn = async (user: RegisterInputSchema) => {
	const response = await apiClient.post<GenericResponse>('/api/register', user);
	return response.data;
};

export { registerUserFn };
