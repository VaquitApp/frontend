declare global {
	type Group = {
		id: number;
		owner_id: number;
		name: String;
		description: String;
	};
	type Category = {
		id: number;
		name: String;
	};
	type Budget = {
		id: number;
		amount: number;
	};
	type Spending = {
		id: number;
		description: String;
		amount: number;
		date: Date;
	};
}

export {};
