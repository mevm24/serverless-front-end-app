import { useEffect, useState } from 'react';
import { useAxios } from './../customHooks/useAxios';
import { Aside } from '../components/Common/Aside';
import { OperationToRender } from '../components/Operations/OperationToRender';

type OperationData = {
	id: string;
	type: string;
	cost: number;
	createdAt: string;
	updatedAt: string;
};

export const Operation = () => {
	const { axiosInstance } = useAxios();
	const [operations, setOperations] = useState<OperationData[]>([]);
	const [operationSelected, setOperationSelected] = useState('');
	const handleOperationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		if (value.trim() !== '') {
			setOperationSelected(value);
			return;
		}
		setOperationSelected('');
	};

	useEffect(() => {
		axiosInstance
			.get('/operation/get')
			.then((response) => {
				const operationSorted = response.data.operations.sort(
					(a: any, b: any) => {
						if (a.type > b.type) {
							return 1;
						}
						if (a.type < b.type) {
							return -1;
						}
						return 0;
					}
				);
				setOperations(operationSorted);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<div className='flex justify-center items-start w-auto mx-auto px-5 py-3 drop-shadow-lg'>
			<Aside />
			<div className='border px-5'>
				<div className='operation-layout'>
					<p className='text-black mt-2 mr-0 block whitespace-nowrap'>
						Select an operation from the list:
					</p>
					<select
						name='operation'
						onChange={handleOperationChange}
						id='operation'
						className='border my-5 w-full p-2'
					>
						<option value=''>Select an operation</option>
						{operations.map((operation: OperationData, index) => {
							return (
								<option
									key={`operation-type-${index}`}
									value={operation.type}
								>
									{operation.type}
								</option>
							);
						})}
					</select>
				</div>
				{operationSelected !== '' && (
					<div className='border w-full px-3 py-3 mb-5'>
						<OperationToRender operationId={operationSelected} />
					</div>
				)}
			</div>
		</div>
	);
};
