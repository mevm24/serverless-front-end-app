import { useState } from 'react';
import { useAxios } from '../../customHooks/useAxios';
export const Divition = () => {
	const { axiosInstance } = useAxios();
	const [numerator, setNumerator] = useState(0);
	const [denominator, setDenominator] = useState(1);
	const [error, setError] = useState('');
	const [result, setResult] = useState('');
	const handleFormSubmit = (event: any) => {
		event.preventDefault();

		axiosInstance
			.post('/operation/calculate/divition', {
				numerator,
				denominator,
			})
			.then((response) => {
				setResult(response.data.operationResponse);
			})
			.catch((error) => {
				console.log((error.response?.data as any)?.errors?.length > 0);
				if ((error.response?.data as any)?.errors?.length > 0) {
					const errors = (error.response?.data as any)?.errors
						?.map((error: any) => {
							return error.msg;
						})
						.join(', ');
					setError(errors);
					return;
				}
				setError(error.response.data.message);
			});
	};

	const handleChange = (event: any) => {
		const number = event.target.value;
		const input = event.target.name;
		if (input === 'denominator')
			if (number !== '0') {
				setDenominator(Number.parseInt(number));
				return;
			} else {
				setError("Denominator can't be zero");
				setDenominator(1);
			}
		else {
			setNumerator(Number.parseInt(number));
		}
	};
	return (
		<div className='w-full p-5'>
			<form onSubmit={handleFormSubmit}>
				<div className='w-full'>
					<label
						htmlFor='numerator'
						className='block text-sm font-medium leading-6 text-black-900 text-black'
					>
						Write the numerator
					</label>
					<div className='mt-2 mb-3'>
						<input
							id='numerator'
							name='numerator'
							type='text'
							onChange={handleChange}
							required={true}
							autoComplete='numerator'
							className='block w-full outline-none px-2 rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 appearance-none'
							value={numerator}
						/>
					</div>
				</div>
				<div className='w-full'>
					<label
						htmlFor='denominator'
						className='block text-sm font-medium leading-6 text-black-900 text-black'
					>
						Write the denominator
					</label>
					<div className='mt-2 mb-3'>
						<input
							id='denominator'
							name='denominator'
							type='text'
							onChange={handleChange}
							required={true}
							autoComplete='denominator'
							className='block w-full outline-none px-2 rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 appearance-none'
							value={denominator}
						/>
					</div>
				</div>
				{error && (
					<div className='w-full mt-2 mb-3'>
						<p className='text-red-500 text-center'>{error}</p>
					</div>
				)}
				{result !== '' && (
					<div className='w-full mt-2 mb-3'>
						<p className='text-black-500 text-black text-center'>
							The operation result is: {result}
						</p>
					</div>
				)}
				<div className='w-full'>
					<button
						type='submit'
						className='rounded-md bg-indigo-600 px-2 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline-none w-full hover:bg-red-500 hover:transition-all'
					>
						Calculate
					</button>
				</div>
			</form>
		</div>
	);
};
