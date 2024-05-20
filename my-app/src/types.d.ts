declare global {
	type Id = number;
	type Group = {
		id: Id;
		owner_id: Id;
		name: string;
		description: string;
	};
	type Category = {
		id: Id;
		name: string;
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
		description: string;
		amount: number;
		date: string;
	};
}

export {};
