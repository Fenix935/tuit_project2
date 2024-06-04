import {getValueByLang} from "../../libs/functions";
import {Card, Empty, Flex, Rate, Skeleton, Space} from "antd";
import {tradeApi} from "../../api/apiService";
import dayjs from "dayjs";
import {Link} from "react-router-dom";
import './index.css'

export const TradeList = () => {
	const {data, isLoading} = tradeApi.useGetTradeListQuery({ offset: 0, limit: 10 });

	return (
		<>
			<p className="data_list_title">Список данных:</p>
			{
				isLoading
					? (
						[1,2,3].map((item, index) => (
							<Skeleton className='skeleton_wrapper'  paragraph={{ rows: 4 }} key={index} active />
						))
					)
					: (
						(data && data.result)
							? (
								<Space
									className='space_wrapper'
									direction="vertical"
									size="middle"
								>
									{
										data.result.data.map((item) => (
											<Link to={`/trade/${item.name}`} key={item.name}>
												<Card
													className='card_item'
													title={
														<p className='title_text'
														   title={getValueByLang(item.dataName)}>{getValueByLang(item.dataName)}</p>
													}
													key={item.structId}
													hoverable
												>
													<Flex className='card_item_content'>
														<p className='card_content_name'>Имя набора:</p>
														<p className='card_content_value'>{item.name}</p>
													</Flex>
													<Flex className='card_item_content'>
														<p className='card_content_name'>Дата последнего изменения:</p>
														<p className='card_content_value'>{dayjs(item.lastUpdate).format('DD.MM.YYYY')}</p>
													</Flex>
													<Flex className='card_item_content'>
														<p className='card_content_name'>Название организации:</p>
														<p className='card_content_value'>{getValueByLang(item.orgName)}</p>
													</Flex>
													<Flex className='card_item_content'>
														<p className='card_content_name'>Оценка пользователей:</p>
														<div className='card_content_value'>
															<Rate
																className='rate_icon_container'
																disabled
																defaultValue={item.rating}
															/>
														</div>
													</Flex>
												</Card>
											</Link>
										))
									}
								</Space>
							)
							: (
								<Empty/>
							)
					)
			}
		</>
	)
}