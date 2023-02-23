import { renderHook, act } from "@testing-library/react";
import useFavorite from "./use-favorite";

describe("useFavorite", () => {
  it("setup object correctly", () => {
    const data = {
      'name': true
    };
    const { result } = renderHook(() => useFavorite());

    expect(result.current.favorite).toEqual({});

    act(() => {
      result.current.setFavorite(data);
    });

    expect(result.current.favorite).toEqual(data);
  });
});
