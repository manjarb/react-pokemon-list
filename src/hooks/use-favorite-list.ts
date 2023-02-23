import { atom, useAtom } from "jotai";
import { PokemonListResult } from "../models/pokemon.model";

const favoriteListAtom = atom<PokemonListResult[]>([]);

export default function useFavoriteList() {
  const [favoriteList, setFavoriteList] = useAtom(favoriteListAtom);

  return {
    favoriteList,
    setFavoriteList,
  };
}
