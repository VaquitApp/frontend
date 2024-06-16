export async function confirmArchiveGroup(group: Group) {
	const action = group.is_archived ? 'desarchivar' : 'archivar';
	const message = `¿Querés ${action} el grupo ${group.name}?`;
	if (!confirm(message)) return;
	await fetch(`/api/groups?groupId=${group.id}&archive=${!group.is_archived}`, { method: 'PUT' });
	location.reload();
}

export function alertNoGoogleUser() {
	alert('Su cuenta de Google no se encuentra vinculado a ningun usuario');
}

export function alertUnexpectedError() {
	alert('Ocurrió un error');
}
