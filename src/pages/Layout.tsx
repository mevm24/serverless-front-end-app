import { Outlet } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useToken } from '../customHooks/useToken';
import { HeaderTemplate } from '../components/Common/Header';

const Layout = () => {
	const { token, setToken } = useToken();
	if (!token) {
		return <LoginForm setToken={setToken} />;
	}
	return (
		<div className=''>
			<HeaderTemplate userName={token.email} />
			<Outlet />
		</div>
	);
};

export default Layout;
