import { getSpecialisms } from '@/app/(marketing)/actions';

export default async function Specialism() {
	const specialism = await getSpecialisms();

	return <div>Specialism</div>;
}
