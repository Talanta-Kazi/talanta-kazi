import useStore from '@/store/index';
import { useMutation } from '@tanstack/react-query';
import { isArrayEmpty } from '@/lib/utils';
import { updateProfileFn } from '@/app/(talent)/actions';
import { ProfileInputSchema } from '@/lib/validations/profile';
import { useSession } from 'next-auth/react';

export default function useUpdateProfile() {
	const { displaySnackMessage } = useStore();
	const session = useSession();

	// TODO: This should be handled by the hook
	if (!session) {
		displaySnackMessage({
			message: 'Unauthorized',
			severity: 'error',
		});
	}

	const id = session?.data?.user?.id as string;

	const {
		mutate: updateProfile,
		status,
		isSuccess,
	} = useMutation(
		(payload: Partial<ProfileInputSchema>) => updateProfileFn(id, payload),
		{
			onSuccess() {
				displaySnackMessage({
					message: 'Profile updated successful.',
				});
			},
			onError(error: Error) {
				if (isArrayEmpty((error as any).response.data.error)) {
					(error as any).response.data.error.forEach((el: any) =>
						displaySnackMessage({
							message: el.message,
							severity: 'error',
						}),
					);
				} else {
					displaySnackMessage({
						message: (error as any).response.data.message,
						severity: 'error',
					});
				}
			},
		},
	);

	return {
		loading: status === 'loading',
		status,
		updateProfile,
		isSuccess,
	};
}

// status: "error" | "idle" | "loading" | "success"
