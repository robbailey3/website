import Header from '@components/global/Header/Header';
import { Outlet } from 'react-router-dom';

const Root = () => {
	return (
		<>
			<Header />
			<div id="main">
				<Outlet />
			</div>
		</>
	);
};

export default Root;
