import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserProvider from './components/app-context/UserProvider';
import LoginAdmin from './components/users/LoginAdmin';
import Container from './components/Container';
import ClientRouter from './client/ClientRouter';

function AppRouter() {
	return (
		<Switch>
			<Route path={'/loginAdmin'}>
				<UserProvider>
					<LoginAdmin />
				</UserProvider>
			</Route>
			<Route path={'/admin'}>
				<UserProvider>
					<Container />
				</UserProvider>
			</Route>
			<Route path=''>
				<ClientRouter />
			</Route>
		</Switch>
	);
}

export default AppRouter;
