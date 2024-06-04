import {TradeList} from './page/tradeList'
import {TradeId} from './page/tradeId'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {Flex, Typography} from "antd";

const router = createBrowserRouter([
	{
		path: "/",
		element: <TradeList />,
	},
	{
		path: "/trade/:name",
		element: <TradeId />,
	},
]);

function App() {
	return (
		<div className="App">
			<Flex justify='space-between' align='center' gap={10}>
				<Typography.Title level={2} style={{textAlign: 'center', fontWeight: '500'}}>Центр государственных услуг
					в сфере "Торговля"</Typography.Title>
				{/*<Button size='large' type="primary" icon={<UserOutlined />}>*/}
				{/*	Войти*/}
				{/*</Button>*/}
			</Flex>

			<RouterProvider router={router} />
		</div>
	);
}

export default App;
