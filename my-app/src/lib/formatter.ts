export function formatDateInput(dateString: string): string {
	const date = new Date(Date.parse(dateString));
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear();
	return `${year}-${month}-${day}`;
}

export function formatDateString(dateString: string): string {
	const date = new Date(Date.parse(dateString));
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear();
	return `${day}/${month}/${year}`;
}

export function formatDateTimeString(dateString: string): string {
	const date = new Date(Date.parse(dateString));
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear();
	const hour = date.getHours().toString().padStart(2, '0');
	const minute = date.getMinutes().toString().padStart(2, '0');
	return `${day}/${month}/${year}, ${hour}:${minute}`;
}

export function fixDateString(dateString: string, timezoneOffset: number) {
	const dateTimestamp = Date.parse(dateString);
	const fixedDateTimestamp = dateTimestamp - timezoneOffset * 60 * 1000;
	const fixedDate = new Date(fixedDateTimestamp);
	return fixedDate.toJSON();
}

export function formatMoney(amount: number) {
	try {
		const fixed = amount
			.toFixed(2)
			.replace('.', ',')
			.replace(/\d(?=(\d{3})+,)/g, '$&.');
		return `$ ${fixed}`;
	} catch (error) {
		return '-';
	}
}
