import { useState } from 'react';
import { useAxios } from './../customHooks/useAxios';

const LoginForm = ({ setToken }: { setToken: Function }) => {
	const { axiosInstance } = useAxios();
	const [initialState] = useState({
		email: '',
		password: '',
	});

	const [inputs, setInputs] = useState(initialState);
	const [error, setError] = useState('');

	const handleChange = (event: any) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		let validated = true;
		const keys = Object.values(inputs);
		keys.forEach((value) => {
			if (value === '') validated = false;
		});
		if (validated) {
			try {
				const { data } = await axiosInstance.post('/user/login', {
					username: inputs.email,
					password: inputs.password,
				});
				const dataToHold = {
					email: inputs.email,
					token: data.token,
				};
				setToken(dataToHold);
				setError('');
			} catch (error: any) {
				console.log(error.response.data.message);
				setError(error.response.data.message);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='mx-full w-full h-full min-h-screen'></div>
			<div className='border border-black-900/10 px-5 py-5 mx-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 drop-shadow-lg'>
				<h2 className='text-center text-lg font-semibold leading-7 text-black-900 text-black'>
					Login Form
				</h2>

				<div className='mt-10 flex align-middle justify-center flex-wrap gap-x-6 gap-y-8 sm:grid-cols-6'>
					<div className='w-full'>
						<label
							htmlFor='email'
							className='block text-sm font-medium leading-6 text-black-900 text-black'
						>
							Email address
						</label>
						<div className='mt-2'>
							<input
								id='email'
								name='email'
								type='email'
								onChange={handleChange}
								required={true}
								autoComplete='email'
								className='block w-full outline-none px-2 rounded-md border-0 py-1.5 text-black-900 shadow-sm ring-1 ring-inset ring-black-300 placeholder:text-black-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
						</div>
					</div>
					<div className='w-full'>
						<label
							htmlFor='password'
							className='block text-sm font-medium leading-6 text-black-900 text-black'
						>
							Password
						</label>
						<div className='mt-2'>
							<input
								type='password'
								name='password'
								id='password'
								onChange={handleChange}
								required={true}
								className='block w-full outline-none px-2 rounded-md border-0 py-1.5 text-black-900 shadow-sm ring-1 ring-inset ring-black-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
						</div>
					</div>
					{error && (
						<div className='w-full'>
							<p className='text-red-500 text-center'>{error}</p>
						</div>
					)}
					<div className='w-full'>
						<button
							type='submit'
							className='block rounded-md bg-indigo-600 px-2 py-2 text-md font-semibold text-white shadow-sm focus-visible:outline-none w-1/2 mx-auto hover:bg-red-700 hover:text-white hover:transition-all drop-shadow-lg'
						>
							Login
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default LoginForm;
