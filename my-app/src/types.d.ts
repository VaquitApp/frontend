declare global {
	type Id = number;
	type User = {
		id: Id;
		email: string;
	};
	type Group = {
		id: Id;
		owner_id: Id;
		name: string;
		description: string;
		is_archived: boolean;
	};
	type Category = {
		id: Id;
		group_id: string; // ?
		name: string;
		description: string;
		strategy: string;
	};
	type Budget = {
		id: Id;
		group_id: Id;
		category_id: Id;
		amount: number;
		description: string;
		start_date: string; // Date
		end_date: string; // Date
	};
	type Spending = {
		id: Id;
		group_id: Id;
		owner_id: int;
		description: string;
		amount: number;
		date: string;
	};
	type SendInvite = {
		sender_id: Id
		receiver_email: string,
		group_id: Id
	}
}

export {};
