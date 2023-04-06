import { useState } from 'react';
import { useAxios } from '../../customHooks/useAxios';
export const RandomStringGenerator = () => {
	const { axiosInstance } = useAxios();
	const [error, setError] = useState('');
	const [result, setResult] = useState([]);
	const [initialState] = useState({
		n: '',
		length: '',
		characters: '',
	});

	const [inputs, setInputs] = useState(initialState);
	const handleFormSubmit = (event: any) => {
		event.preventDefault();
		let validated = true;
		const keys = Object.values(inputs);
		keys.forEach((value) => {
			if (value === '') validated = false;
		});
		if (validated) {
			axiosInstance
				.post('/operation/calculate/random-string', {
					n: Number.parseInt(inputs.n),
					length: Number.parseInt(inputs.length),
					characters: inputs.characters,
				})
				.then((response) => {
					const { operationResponse } = response.data;
					if (operationResponse.error) {
						setError(operationResponse.error.message);
						setResult([]);
					} else {
						setResult(operationResponse.result.random.data);
						setError('');
					}
				})
				.catch((error) => {
					console.log(
						(error.response?.data as any)?.errors?.length > 0
					);
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
		}
	};

	const handleChange = (event: any) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	return (
		<div className='w-full p-5'>
			<form onSubmit={handleFormSubmit}>
				<div className='w-full'>
					<label
						htmlFor='n'
						className='block text-sm font-medium leading-6 text-black-900 text-black'
					>
						Enter the number of random strings you want to generate
						(Max 100)
					</label>
					<div className='mt-2 mb-3'>
						<input
							id='n'
							name='n'
							type='text'
							onChange={handleChange}
							required={true}
							autoComplete='n'
							className='block w-full outline-none px-2 rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 appearance-none'
							value={inputs.n}
							min={1}
							max={100}
						/>
					</div>
				</div>
				<div className='w-full'>
					<label
						htmlFor='length'
						className='block text-sm font-medium leading-6 text-black-900 text-black'
					>
						Enter the length of every string in a range from 1 to 32
						(Every string will have the same length)
					</label>
					<div className='mt-2 mb-3'>
						<input
							id='length'
							name='length'
							type='text'
							onChange={handleChange}
							required={true}
							autoComplete='length'
							className='block w-full outline-none px-2 rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 appearance-none'
							value={inputs.length}
							min={1}
							max={32}
						/>
					</div>
				</div>
				<div className='w-full'>
					<label
						htmlFor='characters'
						className='block text-sm font-medium leading-6 text-black-900 text-black'
					>
						Enter the characters you want your strings to have
					</label>
					<div className='mt-2 mb-3'>
						<input
							id='characters'
							name='characters'
							type='text'
							onChange={handleChange}
							required={true}
							autoComplete='characters'
							className='block w-full outline-none px-2 rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 appearance-none'
							value={inputs.characters}
						/>
					</div>
				</div>
				{error && (
					<div className='w-full mt-2 mb-3'>
						<p className='text-red-500 text-center'>{error}</p>
					</div>
				)}
				{result && (
					<div className='w-full mt-2 mb-3'>
						<p className='text-black-500 text-black text-center'>
							Your random string
							{Number.parseInt(inputs.n) > 1
								? 's are'
								: ' is'}:{' '}
						</p>
						<ul className='max-h-80 border p-5 overflow-y-auto list-decimal'>
							{result.map((item) => (
								<li className='list-item text-center px-5 w-96 mx-auto'>
									<b>{item}</b>
								</li>
							))}
						</ul>
					</div>
				)}
				<div className='w-full'>
					<button
						type='submit'
						className='rounded-md bg-indigo-600 px-2 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline-none w-full hover:bg-red-500 hover:transition-all'
					>
						Get Random String
					</button>
				</div>
			</form>
		</div>
	);
};
