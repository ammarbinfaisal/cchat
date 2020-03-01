<script>
  import { fade } from "svelte/transition";
  export let message, nickname, mine;
</script>

<style>
  span {
    font-family: monospace;
    color: var(--dull-blue);
  }

  p {
    font-family: "Open Sans";
    letter-spacing: 1.4px;
    line-height: 1.5;
    max-width: 80vw;
    line-break: strict;
  }

  div {
    max-width: 80vw;
    width: fit-content;
    min-width: 150px;
    /* background: rgba(100, 100, 100, 0.2); */
    background: var(--black);
    padding: 8px 12px;
    margin: 24px 4px;
    border-radius: 20px;
    border-top-left-radius: 2px;
  }

  div.mine {
    margin-left: auto;
    border-top-left-radius: 20px;
    border-top-right-radius: 2px;
  }
</style>

<div class={mine ? 'msg mine' : 'msg'} transition:fade>
  <span>{nickname}</span>
  <p>{message}</p>
</div>
