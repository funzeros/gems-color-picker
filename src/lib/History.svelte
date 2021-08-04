<script lang="ts">
  import { afterUpdate, createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();
  export let colorList = [];
  let hisotryColor;
  const handleScrollRight = () => {
    hisotryColor.scrollLeft = hisotryColor.scrollWidth;
  };

  const handleClick = (e: MouseEvent) => {
    const el = e.target as HTMLElement;
    if (!el.classList.contains("history-item")) return;
    dispatch("getColor", el.dataset.color);
  };
  afterUpdate(() => {
    handleScrollRight();
  });
</script>

<section
  class="history-color basic-scroll"
  bind:this={hisotryColor}
  on:click={handleClick}
>
  {#each colorList as item}
    <div
      class="history-item c-p"
      data-color={item}
      style="background-color:{item};"
    />
  {/each}
</section>

<style>
  .history-color {
    height: var(--grid-small);
    width: 100%;
    background-color: #999;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }
  .history-item {
    display: inline-block;
    width: var(--grid-small);
    height: var(--grid-small);
  }
</style>
