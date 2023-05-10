import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ToastContextProvider } from '@components/common/Toasts/useToasts';

function App() {
	return (
		<ToastContextProvider>
			<RouterProvider router={router} />
		</ToastContextProvider>
	);
}

export default App;
