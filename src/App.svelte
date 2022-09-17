<script>
  import Cache from './Cache.svelte';
  import { DoubleBounce } from 'svelte-loading-spinners';

  let loading = false;
  let error = false;
  let firstRequestStarted = false;
  let gc = '';
  let cache = {
    name: '',
    link: '',
    difficulty: 0,
    terrain: 0,
    size: '',
  };

  function handleKeyPress(event) {
    if (event.key === 'Enter') loadCache();
  }

  async function loadCache() {
    loading = true;
    firstRequestStarted = true;
    const response = await fetch(`/api/get-cache?gc=${gc}`);
    loading = false;
    const data = await response.json();

    if (!data.success) {
      error = true;
      return;
    }

    error = false;
    console.log(data);
    cache = data.data;
  }
</script>

<svelte:window on:keypress={handleKeyPress} />

<h1><span>Cache</span> Lookup</h1>

<div class="input">
  <span>GC</span>
  <!-- svelte-ignore a11y-autofocus -->
  <input bind:value={gc} maxlength="6" autofocus />
</div>

{#if firstRequestStarted}
  <div class="cache">
    {#if loading}
      <DoubleBounce color="#00cc74" duration="1.5s" />
    {:else if error}
      <h1>This cache doesn't exist</h1>
    {:else}
      <Cache {...cache} />
    {/if}
  </div>
{/if}

<style>
  @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&family=Roboto+Mono&display=swap');

  :global(::selection) {
    background-color: #00cc74;
    color: white;
  }

  :global(body) {
    background-color: #282c34;
    margin: 0;
    color: white;
    font-family: 'Quicksand', --apple-sytem, system-ui, sans-serif;
    text-align: center;
  }

  h1 {
    font-size: 5rem;
  }
  h1 span {
    color: #00cc74;
  }

  .input * {
    font-size: 4rem;
    width: 6ch;
    padding: 0;
    margin: 0;
    font-family: 'Roboto Mono', monospace;
  }
  .input input {
    background-color: transparent;
    border: none;
    border-bottom: 2px solid #00cc74;
    color: inherit;
    outline: none;
    text-transform: uppercase;
  }

  .cache {
    display: flex;
    justify-content: center;
    margin-top: 3rem;
  }
  .cache h1 {
    font-size: 2rem;
  }
</style>
