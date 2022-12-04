import { RouterProvider } from 'react-router-dom';
import Header from '@components/global/Header/Header';
import router from './router';

function App() {
	return (
		<>
			<Header />
			<div id="app">
				<RouterProvider router={router} />
			</div>
		</>
	);
}

export default App;
