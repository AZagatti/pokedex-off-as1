import { browser } from "$app/environment";
import { writable } from "svelte/store";

function createThemeStore() {
  const defaultTheme =
    (browser ? localStorage.getItem("theme") : null) ?? "light";
  const { subscribe, set, update } = writable<"light" | "dark">(
    defaultTheme as "light" | "dark"
  );

  return {
    subscribe,
    toggle() {
      update((current) => {
        const newTheme = current === "light" ? "dark" : "light";
        if (browser) localStorage.setItem("theme", newTheme);
        return newTheme;
      });
    },
    setTheme: (theme: "light" | "dark") => {
      if (browser) localStorage.setItem("theme", theme);
      set(theme);
    },
  };
}

function createFavoritesStore() {
  const defaultFavorites = browser
    ? JSON.parse(localStorage.getItem("favorites") ?? "[]")
    : [];
  const { subscribe, update } = writable<number[]>(defaultFavorites);

  return {
    subscribe,
    add(pokemonId: number) {
      update((fav) => {
        const updated = [...fav, pokemonId];
        if (browser) localStorage.setItem("favorites", JSON.stringify(updated));
        return updated;
      });
    },
    remove(pokemonId: number) {
      update((fav) => {
        const updated = fav.filter((id) => id !== pokemonId);
        if (browser) localStorage.setItem("favorites", JSON.stringify(updated));
        return updated;
      });
    },
    toggle(pokemonId: number) {
      update((fav) => {
        const updated = fav.includes(pokemonId)
          ? fav.filter((id) => id !== pokemonId)
          : [...fav, pokemonId];
        if (browser) localStorage.setItem("favorites", JSON.stringify(updated));
        return updated;
      });
    },
  };
}

export const theme = createThemeStore();
export const favorites = createFavoritesStore();
