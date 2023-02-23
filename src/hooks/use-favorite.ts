import { atom, useAtom } from "jotai";

const favoriteAtom = atom<Record<string, boolean>>({});

export default function useFavorite() {
  const [favorite, setFavorite] = useAtom(favoriteAtom);

  return {
    favorite,
    setFavorite
  }
}
