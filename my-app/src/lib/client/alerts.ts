import { goto, invalidateAll } from "$app/navigation";
import { routes } from "$lib";

export async function confirmArchiveGroup(group: Group) {
	const action = group.is_archived ? 'desarchivar' : 'archivar';
	const message = `¿Querés ${action} el grupo "${group.name}"?`;
	if (!confirm(message)) return;
	await fetch(`${routes.apiGroups}?groupId=${group.id}&archive=${!group.is_archived}`, { method: 'PUT' });
	location.reload();
}

export async function confirmLeaveGroup(group: Group) {
	const message = `¿Estás seguro que querés dejar el grupo "${group.name}"?`;
	if (!confirm(message)) return;
	let response = await fetch(`${routes.apiMembers}?groupId=${group.id}`, { method: 'DELETE' });
	if (!response.ok) {
		let body = await response.json();
		let { detail } = JSON.parse(body.message);
		alert('No se pudo dejar el grupo. ' + detail);
		return;
	}
	await invalidateAll();
	goto(routes.groups);
}
