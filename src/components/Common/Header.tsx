import { Link } from 'react-router-dom';

export const HeaderTemplate = ({ userName = '' }) => {
	const logoutHandler = (e: any) => {
		e.preventDefault();
		sessionStorage.removeItem('token');
		window.location.reload();
	};
	return (
		<div className='flex align-middle justify-between px-5 py-3 border-b border-black'>
			<p className=''>Hello {userName}</p>
			<Link onClick={logoutHandler} to={''} className='nav-link'>
				Logout
			</Link>
		</div>
	);
};
