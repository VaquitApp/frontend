<script lang="ts">
	export let payment: Payment;
</script>

<a href="#" class={payment.confirmed ? 'confirmed' : 'pending'}>
	Pago ({payment.confirmed ? 'Confirmado' : 'Pendiente'})
</a>

<style>
	.confirmed {
		color: rgb(25, 124, 25);
		text-decoration: underline rgb(25, 124, 25);
	}
	.pending {
		color: rgb(189, 153, 87);
		text-decoration: underline rgb(189, 153, 87);
	}
</style>
