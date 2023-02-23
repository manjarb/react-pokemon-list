import { renderHook, act } from "@testing-library/react";
import { mockFavPokemonResults } from "../data/mock";
import useFavoriteList from "./use-favorite-list";

describe("useFavoriteList", () => {
  it("setup list correctly", () => {
    const { result } = renderHook(() => useFavoriteList());

    expect(result.current.favoriteList).toEqual([]);

    act(() => {
      result.current.setFavoriteList(mockFavPokemonResults);
    });

    expect(result.current.favoriteList).toEqual(mockFavPokemonResults);
  });
});
