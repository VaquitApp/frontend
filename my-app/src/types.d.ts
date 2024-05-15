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
		amount: number;
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
