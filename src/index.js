import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ConfigProvider} from "antd";
import {StoreProvider} from "./store/StoreProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ConfigProvider
			theme={{
				token: {
					fontFamily: 'Roboto, sans-serif'
				},
			}}
		>
			<StoreProvider>
				<App/>
			</StoreProvider>
		</ConfigProvider>
	</React.StrictMode>
);
