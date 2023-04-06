import { useCallback, useEffect, useState } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import NumberFilter from '@inovua/reactdatagrid-community/NumberFilter';
import '@inovua/reactdatagrid-community/index.css';
import { Aside } from '../components/Common/Aside';
import { useAxios } from '../customHooks/useAxios';
import { DataRow, RecordDAO } from '../interfaces/Records';
import { DeleteRecord } from '../components/DeleteRecord';

const gridStyle = { minHeight: 550 };

const filterValue = [
	{ name: 'id', operator: 'startsWith', type: 'string', value: '' },
	{ name: 'type', operator: 'startsWith', type: 'string', value: '' },
	{ name: 'amount', operator: 'gte', type: 'number', value: 0 },
	{
		name: 'user_balance',
		operator: 'gte',
		type: 'number',
		value: 0,
	},
	{
		name: 'operation_response',
		operator: 'startsWith',
		type: 'string',
		value: '',
	},
	{ name: 'date', operator: 'startsWith', type: 'string', value: '' },
];

export const Records = () => {
	const [loading, setLoading] = useState(true);
	const { axiosInstance } = useAxios();
	const [records, setRecords] = useState<any>({
		data: [],
		count: 0,
	});

	const columns = [
		{
			name: 'id',
			header: 'RecordID',
			defaultFlex: 1,
			defaultVisible: false,
		},
		{ name: 'type', header: 'Type', defaultFlex: 1 },
		{
			name: 'amount',
			header: 'Amount',
			defaultFlex: 1,
			filterEditor: NumberFilter,
		},
		{
			name: 'user_balance',
			header: 'User Balance',
			defaultFlex: 1,
			filterEditor: NumberFilter,
		},
		{
			name: 'operation_response',
			header: 'Operation Response',
			defaultFlex: 1,
			render: ({ value }: any) => (
				<span>
					{typeof value === 'string' && value.length > 50
						? value.substring(0, 50)
						: typeof value === 'object'
						? JSON.stringify(value)
						: value}
				</span>
			),
		},
		{ name: 'date', header: 'Date', defaultFlex: 1 },
		{
			header: 'Delete',
			defaultFlex: 1,
			render: ({ data }: { data: DataRow }) => {
				return (
					<DeleteRecord
						data={data}
						records={records.data}
						setRecord={setRecords}
					/>
				);
			},
		},
	];

	useEffect(() => {
		axiosInstance
			.post('/record/getAll')
			.then((response) => {
				const records: RecordDAO[] | undefined = response.data.records;
				const datatableRecords: DataRow[] | undefined = records?.map(
					(record: RecordDAO) => {
						return {
							id: record.id,
							type: record.type as string,
							amount: record.amount,
							user_balance: record.user_balance,
							operation_response: record.operation_response,
							date: record.date,
						};
					}
				);
				if (datatableRecords) {
					setRecords({
						data: datatableRecords,
						count: datatableRecords.length,
					});
					setLoading(false);
					return;
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<div className='flex justify-center items-start w-auto mx-auto px-5 py-3'>
			<Aside />
			<div className='w-1/2 px-5 py-0 drop-shadow-lg'>
				<ReactDataGrid
					idProperty='id'
					columns={columns}
					dataSource={records.data}
					pagination
					defaultLimit={15}
					defaultSkip={15}
					pageSizes={[10, 15, 30]}
					style={gridStyle}
					defaultFilterValue={filterValue}
					loading={loading}
				/>
			</div>
		</div>
	);
};
