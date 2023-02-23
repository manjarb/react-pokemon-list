import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { renderHook, act } from "@testing-library/react";
import useGetAxios from "./use-get-axios";
import { mockPokemonResults } from "../data/mock";

describe("useGetAxios", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it("get data correctly", async () => {
    const url = 'url';
    const { result } = renderHook(() => useGetAxios());

    expect(result.current.data).toEqual(null);
    expect(result.current.error).toEqual(null);
    expect(result.current.loading).toEqual(false);

    mock.onGet(url).reply(200, mockPokemonResults)

    await act(async () => {
      await result.current.fetchData("url");

    });
    expect(result.current.data).toEqual(mockPokemonResults);
  });
});
