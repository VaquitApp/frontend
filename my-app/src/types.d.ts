declare global {
	type Id = number;

	type User = {
		id: Id;
		email: string;
		cbu: string;
		alias: string;
		has_google: boolean;
	};
	type UserRegistration = { email: string; password: string };
	type UserCredentials = Pick<User, 'id' | 'email'> & { jwt: string };
	type UserGoogleCredentials = { token: string };
	type UserProfile = Omit<User, 'id' | 'email', 'has_google'>;

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
		strategy: Strategy;
		is_archived: boolean;
	};

	type Strategy = 'equalparts' | 'percentage' | 'custom';

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
		strategy_data: Distribution[];
	};

	type Distribution = {
		user_id: Id;
		value: number;
	};

	interface UniqueSpending extends Spending {}

	interface InstallmentSpending extends Spending {
		amount_of_installments: number;
	}

	interface RecurringSpending extends Spending {}

	type Payment = {
		id: Id;
		group_id: Id;
		from_id: Id;
		to_id: Id;
		confirmed: boolean;
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
	};
}

export {};
