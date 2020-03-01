<script>
  import Message from "../components/Message.svelte";
  export let nickname;

  let messages = [];
  let message = "";

  const socket = io();

  fetch("/recent-messages")
    .then(res => res.json())
    .then(res => {
      messages = res;
      setTimeout(scrollToBottom, 400);
    });

  function sendMessage(e) {
    if (!message) alert("message box is empty");
    console.log(message);
    fetch(`/send-message`, {
      method: "POST",
      body: JSON.stringify({ message })
    });
    message = "";
  }

  function loadMore() {
    fetch(`/messages-before?id=${messages[0].id}`)
      .then(res => res.json())
      .then(msgs => {
        messages = [...msgs, ...messages];
      });
  }

  function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }

  $: hideLoadMore = messages[0] && messages[0].id === 1 ? true : false;

  let showDownArrow = false;

  window.addEventListener("scroll", () => {
    showDownArrow =
      document.body.scrollHeight - pageYOffset < innerHeight * 1.2;
  });

  function handleEnter(e) {
    if (e.ctrlKey && e.keyCode === 13) {
      sendMessage();
    }
  }

  socket.on("message", msg => {
    console.log(msg);
    messages = [...messages, msg];
  });
</script>

<style>
  #chat {
    width: 100%;
    display: grid;
    grid-template-rows: 1fr 64px;
    height: 90vh;
  }

  #messages {
    height: 100%;
    padding: 10px 4px;
    margin: auto;
    width: 95%;
  }

  #input-bar {
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #121313;
    box-shadow: 0px -4px 16px 12px #0e0e0e;
  }

  #input {
    background: rgba(0, 0, 0, 0.2);
    resize: none;
    outline: none;
    border: 2px var(--black) solid;
    padding: 4px;
    width: 80%;
    color: var(--white);
    min-height: 30px;
    max-height: 100px;
    overflow-y: scroll;
    margin-right: 12px;
  }

  #input::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.7);
  }

  #input::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
  }

  button {
    background: rgba(20, 20, 20, 0.6);
    color: inherit;
    outline: none;
    border: none;
    cursor: pointer;
  }

  #load-more {
    height: 20px;
    margin: auto;
    display: block;
  }

  .arrow-down {
    position: absolute;
    fill: var(--pale-blue);
    height: 60%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 200%;
  }

  #arrow-ctn {
    position: fixed;
    bottom: 15%;
    right: 32px;
    height: 32px;
    width: 32px;
    background: var(--black);
    border-radius: 200%;
    padding: 8px;
  }
</style>

<div id="chat">
  <div id="messages">
    <button id="load-more" on:click={loadMore} hidden={hideLoadMore}>
      load previous
    </button>
    {#each messages as m}
      <Message
        message={m.message}
        nickname={m.nickname}
        mine={m.nickname === nickname} />
    {/each}
  </div>
  <div id="arrow-ctn" hidden={showDownArrow} on:click={scrollToBottom}>
    <svg
      data-icon="arrow-down"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      class="arrow-down">
      <path
        fill="var(--pale-blue)"
        d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6
        9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3
        34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24
        24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"
        class="" />
    </svg>
  </div>
  <div id="input-bar">
    <textarea id="input" bind:value={message} on:keydown={handleEnter} />
    <button on:click={sendMessage}>send</button>
  </div>
</div>
