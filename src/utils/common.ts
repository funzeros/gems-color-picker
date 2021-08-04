export const nextTick = (cb: Function, ...arg: any[]) => {
  setTimeout(() => {
    cb(...arg);
  }, 100);
  return nextTick;
};

export const copy = (string: string) => {
  const el = document.createElement("input") as HTMLInputElement;
  el.value = string;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

export const message = (msg: string) => {
  const olds = document.querySelectorAll(".message");
  olds.forEach((m) => {
    document.body.removeChild(m);
  });
  const el = document.createElement("div") as HTMLElement;
  el.classList.add("message");
  el.innerHTML = msg;
  document.body.appendChild(el);
};

export const push = <T>(arr: T[], ...items: T[]): T[] => {
  return [...arr, ...items];
};

export const useStorage = () => {
  return {
    set(k: string, v: any) {
      localStorage.setItem(k, v);
    },
    get(k: string) {
      return localStorage.getItem(k);
    },
    remove(k: string) {
      localStorage.removeItem(k);
    },
    clear() {
      localStorage.clear();
    },
  };
};
