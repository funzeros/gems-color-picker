<script lang="ts">
  import { copy, message, nextTick, push, useStorage } from "@/utils/common";
  import HistoryColor from "./History.svelte";
  import BaseColor from "./Base.svelte";
  import PickerColor from "./Picker.svelte";
  import { onMount } from "svelte";
  const { set, get } = useStorage();

  let hisotryColorList: string[] = [];
  let beDarken = "darken";
  let color = "#e45e5e";
  let colorPicker: HTMLInputElement;
  const maxHistory = 100;
  const handleMR = async (e: MouseEvent) => {
    colorPicker.style.transform = `translate(${e.pageX}px, ${e.pageY}px)`;
    nextTick(() => {
      colorPicker.click();
    });
    return false;
  };
  const handlebeDarken = ({ detail }: { detail: string }) => {
    beDarken = detail;
  };
  const handleGetColor = ({ detail }: { detail: string }) => {
    copy(detail);
    message(
      `<span style='background-color:${detail};'>已复制颜色${detail}</span>`
    );
    if (hisotryColorList.length > maxHistory) hisotryColorList.shift();
    const index = hisotryColorList.findIndex((m) => m === detail);
    if (index > -1) hisotryColorList.splice(index, 1);
    hisotryColorList = push(hisotryColorList, detail);
    set("COLOR_LIST", hisotryColorList);
  };
  onMount(() => {
    const colorList = get("COLOR_LIST");
    if (colorList) hisotryColorList = colorList.split(",");
  });
</script>

<section class="color-wrap" on:contextmenu|preventDefault={handleMR}>
  <HistoryColor
    bind:colorList={hisotryColorList}
    on:getColor={handleGetColor}
  />
  <BaseColor bind:beDarken on:beDarken={handlebeDarken} />
  <PickerColor bind:color bind:beDarken on:getColor={handleGetColor} />
  <input
    class="color-picker v-h no-event"
    type="color"
    bind:value={color}
    bind:this={colorPicker}
  />
  <div class="tips no-event">右键唤出色盘</div>
</section>

<style>
  .color-wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .color-picker {
    position: fixed;
    top: 0;
    left: 0;
  }
  .tips {
    position: fixed;
    top: 100px;
    right: 0;
    color: #eee;
    background-color: rgba(200, 200, 200, 0.5);
    padding: 5px 8px 5px 15px;
    border-radius: 20px 0 0 20px;
    animation: float 4s infinite ease-in-out;
  }
  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(10px);
    }
  }
</style>
