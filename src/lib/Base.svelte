<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let beDarken: string = "darken";
  const btnList = [
    {
      name: "渐暗",
      be: "darken",
    },
    {
      name: "渐亮",
      be: "lighten",
    },
  ];
  const dispatch = createEventDispatcher();
  const handleClick = (e: MouseEvent) => {
    const el = e.target as HTMLElement;
    if (!el.classList.contains("color-item")) return;
    const beDarken = el.dataset.be;
    dispatch("beDarken", beDarken);
  };
</script>

<section class="base-color c-p" on:click={handleClick}>
  {#each btnList as item}
    <div
      class="color-item {item.be}"
      class:active={item.be === beDarken}
      data-be={item.be}
    >
      {item.name}
    </div>
  {/each}
</section>

<style>
  .base-color {
    height: var(--grid-small);
    width: 100%;
    background-image: linear-gradient(to right, #000 0%, #fff 100%);
  }
  .color-item {
    display: inline-block;
    width: 50%;
    height: var(--grid-small);
    text-align: center;
    line-height: var(--grid-small);
  }
  .active::after {
    content: "√";
  }
  .darken {
    color: #fff;
  }
  .ligten {
    color: #000;
  }
</style>
