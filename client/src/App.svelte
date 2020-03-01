<script>
	import Chat from "../components/Chat.svelte";
	import Login from "../components/Login.svelte";
	import Loader from "../components/Loader.svelte";

	let c = Loader, cb = null, nickname = "";

	fetch("/get-info")
		.then(res => res.json())
		.then(res => {
			console.log(res);
			if(!res.nickname) {
				c = Login;
				cb = openChat;
			} else {
				c = Chat;
				nickname = res.nickname;
			}
		});

	function openChat() {
		c = Chat;
		cb = null;
	}
</script>

<style>
	h1 {
		text-align: center;
		font-weight: bold;
	}
</style>


<h1>sécurisée</h1>

<main>
	<svelte:component this={c} cb={cb} nickname={nickname}></svelte:component>
</main>
