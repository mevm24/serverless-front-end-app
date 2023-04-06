export interface DataRow {
	id: string;
	type: string;
	amount: number;
	user_balance: number;
	operation_response: any;
	date: string;
}

export interface RecordDAO {
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
