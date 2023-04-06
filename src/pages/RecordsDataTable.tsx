import { useEffect, useState } from 'react';
import DataTable, {
	ExpanderComponentProps,
	TableColumn,
} from 'react-data-table-component';
import { Aside } from '../components/Common/Aside';
import { useAxios } from '../customHooks/useAxios';

interface DataRow {
	type: string;
	amount: number;
	user_balance: number;
	operation_response: any;
	date: string;
}

interface RecordDAO {
	id: string;
	createdAt: string;
	operation_id: string;
	user_id: string;
	amount: number;
	user_balance: number;
	operation_response: string;
	date: string;
	updatedAt: string;
	type?: string;
}

export const Records = () => {
	const [records, setRecords] = useState<DataRow[] | undefined>([]);
	const [pending, setPending] = useState(true);
	const { axiosInstance } = useAxios();
	const columns: TableColumn<DataRow>[] = [
		{
			name: 'Type',
			sortable: true,
			selector: (row) => row.type,
		},
		{
			name: 'Amount',
			sortable: true,
			selector: (row) => row.amount,
		},
		{
			name: 'User Balance',
			sortable: true,
			selector: (row) => row.user_balance,
		},
		{
			name: 'Operation Result',
			sortable: true,
			selector: (row) => row.operation_response,
		},
		{
			name: 'Date',
			sortable: true,
			selector: (row) => row.date,
		},
	];

	const ExpandedComponent: React.FC<ExpanderComponentProps<DataRow>> = ({
		data,
	}) => (
		<>
			<p>data.Type</p>
		</>
	);

	const handleChange = ({ selectedRows }: any) => {
		// You can set state or dispatch with something like Redux so we can use the retrieved data
		console.log('Selected Rows: ', selectedRows);
	};

	useEffect(() => {
		axiosInstance
			.post('/record/getAll')
			.then((response) => {
				const records: RecordDAO[] | undefined = response.data.records;
				const datatableRecords: DataRow[] | undefined = records?.map(
					(record: RecordDAO) => {
						return {
							type: record.type as string,
							amount: record.amount,
							user_balance: record.user_balance,
							operation_response: record.operation_response,
							date: record.date,
						};
					}
				);
				setRecords(datatableRecords);
				setPending(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<div className='flex justify-center items-start w-auto mx-auto px-5 py-3'>
			<Aside />
			<div className='w-auto px-5 py-3'>
				{records ? (
					<DataTable
						columns={columns}
						data={records}
						pagination
						expandableRowsComponent={ExpandedComponent}
						progressPending={pending}
						selectableRows
						onSelectedRowsChange={handleChange}
					/>
				) : (
					'No records to show for this user'
				)}
			</div>
		</div>
	);
};
