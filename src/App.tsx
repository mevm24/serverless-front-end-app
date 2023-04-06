import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import NoPage from './pages/NoPage';
import { Records } from './pages/Records';
import { Operation } from './pages/Operation';

const App = () => {
	return (
		<div className='App'>
			<div className='container max-w-full max-h-full'>
				<HashRouter>
					<Routes>
						<Route path='/' element={<Layout />}>
							<Route index path='/' element={<Operation />} />
							<Route path='/records/' element={<Records />} />
							<Route path='*' element={<NoPage />} />
						</Route>
					</Routes>
				</HashRouter>
			</div>
		</div>
	);
};

export default App;
