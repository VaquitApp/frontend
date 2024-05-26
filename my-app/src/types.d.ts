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
		// NOTE: [name, group_id] is primary key
		name: string;
		group_id: string;
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
}

export {};
