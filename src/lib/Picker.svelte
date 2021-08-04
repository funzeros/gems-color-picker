<script lang="ts">
  import { chunk } from "gems-tools";
  import { createEventDispatcher } from "svelte";
  export let color: string;
  export let beDarken = "darken";
  const dispatch = createEventDispatcher();
  const max = 16;
  const len = max - 1;
  const darkenFn = (rgb: number, i: number) => {
    return Math.round(rgb * ((len - i) / len)).toString(16);
  };
  const lightenFn = (rgb: number, i: number) => {
    return Math.min(Math.round(rgb + (255 - rgb) * (i / len)), 255).toString(
      16
    );
  };
  $: generateColorList = () => {
    const fn = beDarken === "darken" ? darkenFn : lightenFn;
    return new Array(max).fill(color).map((m: string, i: number) => {
      return `#${chunk(m.substring(1).split(""), 2)
        .map((a) => {
          const s = fn(parseInt(a.join(""), 16), i);
          return s.length < 2 ? `0${s}` : s;
        })
        .join("")}`;
    });
  };
  $: colorList = generateColorList();
  const isDarken = (color: string) => {
    return chunk(color.substring(1).split(""), 2).every((m) => {
      return parseInt(m.join(""), 16) > 200;
    })
      ? "darken"
      : "lighten";
  };

  const handleClick = (e: MouseEvent) => {
    const el = e.target as HTMLElement;
    if (!el.classList.contains("picker-item")) return;
    dispatch("getColor", el.dataset.color);
  };
</script>

<section class="picker-color" on:click={handleClick}>
  {#each colorList as item}
    <div
      class="picker-item hover-bigger-child  hover-zindex c-p"
      data-color={item}
      style="background-color: {item};"
    >
      <div
        class="full flex ai-c jc-c no-event"
        style="background-color: {item};"
      >
        <span class={isDarken(item)}>
          {item}
        </span>
      </div>
    </div>
  {/each}
</section>

<style>
  .picker-color {
    height: calc(100% - calc(var(--grid-small) * 2));
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }

  .picker-item span {
    font-weight: 600;
    font-size: 24px;
  }
  .picker-item span.lighten {
    color: #fff;
  }
  .picker-item span.darken {
    color: #000;
  }
</style>
