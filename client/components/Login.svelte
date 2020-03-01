<script>
  export let cb;
  let nickname = "";

  function handleSubmit(e) {
    if (!nickname) return alert("nickname can't be empty");
    console.log(nickname);
    fetch("/register-user", { method: "POST", body: JSON.stringify({ nickname }) })
        .then(res => res.json())
        .then((res, err) => {
            if(res.success) {
                if(typeof cb === "function") cb();
            } else {
                if(res.error) alert(res.error);
                else if(err) alert(err);
            }
        })
  }
</script>

<style>
  #login {
    z-index: 2;
    width: 320px;
    height: 210px;
    margin: 20% auto;
    text-align: center;
  }
  button {
    margin: 16px;
  }
</style>

<div id="login">
  <p>Nickname</p>
  <input name="nickname" bind:value={nickname} />
  <br />
  <button on:click={handleSubmit}>enter chat :)</button>
</div>
