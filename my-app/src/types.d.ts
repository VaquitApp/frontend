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
		name: string;
		group_id: Id;
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
		owner_id: Id;
		category_id: Id;
		description: string;
		amount: number;
		date: string;
	};
	type UniqueSpending = {
		id: Id;
		group_id: Id;
		owner_id: Id;
		category_id: Id;
		description: string;
		amount: number;
		date: string;
	};
	type InstallmentSpending = {
		id: Id;
		group_id: Id;
		owner_id: Id;
		category_id: Id;
		description: string;
		amount: number;
		amount_of_installments: number;
		date: string;
	};
	type RecurringSpending = {
		id: Id;
		group_id: Id;
		owner_id: Id;
		category_id: Id;
		description: string;
		amount: number;
		date: string;
	};
	type Payment = {
		id: Id;
		group_id: Id;
		from_id: Id;
		to_id: Id;
		amount: number;
		date: string;
	};
	type Invite = {
		id: Id;
		sender_id: Id;
		receiver_id: Id;
		group_id: Id;
		token: string;
		status: string;
		creation_date: string;
	};
	type SendInvite = {
		sender_id: Id;
		receiver_email: string;
		group_id: Id;
	};
	type AcceptInvite = {
		token: string;
	};
	type Balance = {
		id: Id;
		user_id: Id;
		group_id: Id;
		current_balance: number;
	};
	type CategoryBalance = {
		categoryId: Id;
		categoryName: string;
		categoryDescription: string;
		budgets: number;
		spendings: number;
	};
	type PaymentReminder = {
		receiver_email: string;
		message: string;
	}
}

export { };
