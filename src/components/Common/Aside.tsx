import { Link } from 'react-router-dom';

export const Aside = () => {
	return (
		<div className='flex flex-col px-5 py-2 h-full w-auto border mr-5 drop-shadow-lg'>
			<div className='text-center border rounded border-black my-2 px-5 hover:bg-black hover:text-white hover:transition-all'>
				<Link to={'/records/'} className='nav-link'>
					View Records
				</Link>
			</div>
			<div className='text-center border rounded border-black my-2 px-5 hover:bg-black hover:text-white hover:transition-all'>
				<Link to={'/'} className='nav-link'>
					Request Operation
				</Link>
			</div>
		</div>
	);
};
