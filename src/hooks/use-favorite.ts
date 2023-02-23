import { atom, useAtom } from "jotai";
import { PokemonListResult } from "../models/pokemon.model";

const favoriteAtom = atom<Record<string, boolean>>({});

export default function useFavorite() {
  const [favorite, setFavorite] = useAtom(favoriteAtom);

  return {
    favorite,
    setFavorite,
  };
}
