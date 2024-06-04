import {Breadcrumb, Button, Empty, Flex, Space, Table, Tabs} from "antd";
import {Link, useParams} from "react-router-dom";
import {Typography} from "antd";
import './index.css'
import {tradeApi} from "../../api/apiService";
import {useMemo} from "react";
import {getValueByLang} from "../../libs/functions";
import {API_BASE} from "../../consts";
import dayjs from "dayjs";
import {LoadingOutlined} from "@ant-design/icons";

const TableChild = ({id}) => {
	const {data, isLoading} = tradeApi.useGetTradeTableQuery({id});

	const columns = useMemo(() => {
		if(data && data.result) {
			return data.result.tableFields.map((columnItem, index) => {
				return {
					title: getValueByLang(columnItem.text),
					dataIndex: columnItem.name,
					key: columnItem.name,
				}
			})
		}

		return []
	}, [data]);

	const tableData = useMemo(() => {
		if(data && data.result) {
			return data.result.data.map((columnItem, index) => {

				const test = Object.entries(columnItem.tableColumn).map(([columnName, columnValue]) => {
					return [columnName, columnValue.text ? getValueByLang(columnValue.text) : columnValue.default];
				});
				test.push(['key', index])
				return Object.fromEntries(test);
			})
		}

		return [];
	}, [data]);

	return (
		<div>
			<Table scroll={{x: true}} columns={columns} dataSource={tableData} pagination={{pageSize: 20}} loading={isLoading} />
		</div>
	)
}

const PassportChild = ({selectedData}) => {
	const {data, isLoading} = tradeApi.useGetTradePassportQuery({id: selectedData._id});

	console.log(data)

	return (
		<div className="passport_container">
			<div className="passport_wrapper" style={{marginTop: '0'}}>
				<p className="passport_name">Идентификационный номер (код) набора данных</p>
				<p className="passport_value">{data?.result?.data?.name}</p>
			</div>
			<div className="passport_wrapper">
				<p className="passport_name">Наименование набора данных</p>
				<p className="passport_value">{getValueByLang(selectedData.dataName)}</p>
			</div>
			<div className="passport_wrapper">
				<p className="passport_name">Организация, предоставляющая открытые данные</p>
				<p className="passport_value">{getValueByLang(data?.result?.data?.orgName)}</p>
			</div>
			<div className="passport_wrapper">
				<p className="passport_name">Владелец набора данных</p>
				<p className="passport_value">{data?.result?.data?.fullName}</p>
			</div>
			<div className="passport_wrapper">
				<p className="passport_name">Контакты ответственного лица</p>
				<p className="passport_value">Номер телефона: {data?.result?.data?.telephone}</p>
				<p className="passport_value">
					E-mail:
					<span>{data?.result?.data?.ogrEmail}</span>
				</p>
				{data?.result?.data?.linkWeb && (
					<p className="passport_value">
						Ссылка на открытый набор данных на других веб-ресурсах:
						<span>{data?.result?.data?.linkWeb}</span>
					</p>
				)}
			</div>
			<div className="passport_wrapper">
				<p className="passport_name">Дата первой публикации набора данных</p>
				<p className="passport_value">{data?.result?.data?.createDate ? dayjs(data?.result?.data?.createDate).format('DD.MM.YYYY') : ''}</p>
			</div>
			<div className="passport_wrapper">
				<p className="passport_name">Дата последнего внесения изменений</p>
				<p className="passport_value">{data?.result?.data?.updateDate ? dayjs(data?.result?.data?.updateDate).format('DD.MM.YYYY') : ''}</p>
			</div>
		</div>
	)
}

export const TradeId = () => {
	const {name} = useParams();
	const {data, isLoading} = tradeApi.endpoints.getTradeList.useQuery({offset: 0, limit: 10})
	const [getFile, fileResponse] = tradeApi.useLazyGetTradeFileQuery()

	const selectedData = useMemo(() => {
		if(data && data.result) {
			return data.result.data.find(item => item.name === name);
		}

		return  {}
	}, [data]);

	return (
		<div className="trade_id_container">
			<Breadcrumb
				items={[
					{
						title: <Link to={'/'}>Главная</Link>,
					},
					{
						title: name,
					},
				]}
			/>

			{
				isLoading
					? (
						<div className="trade_id_loading">
							<LoadingOutlined className='load_icon'/>
						</div>
					)
					: (
						Object.keys(selectedData).length > 0
							? (
								<>
									<Typography.Title level={2} className="page_title">
										<span className="id">{name}</span>
										{getValueByLang(selectedData.dataName)}
									</Typography.Title>

									<Flex className="download_block" gap={10} style={{marginBottom: '15px'}} align='center'>
										<Typography.Text className='download_text'>
											Скачать набор в формате:
										</Typography.Text>
										<a className="link_block" href={`${API_BASE}/api/v1/trade-file?id=${selectedData.structId}&fileType=2&tableType=2&lang=3`} download>XML</a>
										<a className="link_block" href={`${API_BASE}/api/v1/trade-file?id=${selectedData.structId}&fileType=3&tableType=2&lang=3`} download>XLS</a>
										<a className="link_block" href={`${API_BASE}/api/v1/trade-file?id=${selectedData.structId}&fileType=1&tableType=2&lang=3`} download>JSON</a>
									</Flex>

									<Tabs
										rootClassName="tabs_container"
										defaultActiveKey="table"
										type="card"
										size='large'
										items={[
											{
												label: 'Таблица',
												key: 'table',
												children: <TableChild id={selectedData.structId} />,
											},
											{
												label: 'Паспорт набора данных',
												key: 'passport',
												children: <PassportChild selectedData={selectedData} />,
											}
										]}
									/>
								</>
							)
							: (
								<Empty />
							)
					)
			}


		</div>
	)
}