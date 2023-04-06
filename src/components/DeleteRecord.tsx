import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Button from '@inovua/reactdatagrid-community/packages/Button';
import { DataRow } from '../interfaces/Records';
import { useAxios } from '../customHooks/useAxios';

export const DeleteRecord = ({
	data,
	setRecord,
	records,
}: {
	data: DataRow;
	setRecord: Function;
	records: DataRow[];
}) => {
	const { axiosInstance } = useAxios();
	const MySwal = withReactContent(Swal);
	return (
		<Button
			onClick={() => {
				MySwal.fire({
					icon: 'warning',
					title: <p>¿Do you want to delete this record?</p>,
					preConfirm: async (confirm) => {
						if (confirm) {
							return axiosInstance
								.delete(`/record/delete/${data.id}`)
								.then((response) => {
									return response;
								})
								.catch((error) => {
									console.log(error);
									Swal.showValidationMessage(
										`Request failed: ${error}`
									);
								});
						}
					},
					confirmButtonText: 'Yes, delete this record',
					showCancelButton: true,
					cancelButtonText: 'No',
					allowOutsideClick: () => !Swal.isLoading(),
				}).then((result) => {
					if (result.isConfirmed) {
						Swal.fire({
							title: 'Record Deleted',
							confirmButtonText: 'Ok',
							preConfirm: () => {
								const newRecords = records.filter((record) => {
									return record.id !== data.id;
								});
								setRecord({
									data: newRecords,
									count: newRecords.length,
								});
							},
						});
					}
				});
			}}
		>
			Delete Record
		</Button>
	);
};
