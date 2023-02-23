import { mockFavPokemonResults, mockPokemonResults } from "../data/mock";
import { PokemonListResult } from "../models/pokemon.model";
import {
  convertDeciToCentiMeter,
  convertHectoToKiloGrams,
  getPaginationPayload,
  removeArrayIfValueExist,
  toggleArrayIfValueExist,
} from "./utils";

describe("Utils helper", () => {
  it("getPaginationPayload", () => {
    const data = getPaginationPayload(2, 20);
    expect(data).toEqual({ limit: 20, offset: 20 });
  });

  it("convertDeciToCentiMeter", () => {
    const result = convertDeciToCentiMeter(10);
    expect(result).toEqual(100);
  });

  it("convertHectoToKiloGrams", () => {
    const result = convertHectoToKiloGrams(10);
    expect(result).toEqual(1);
  });

  describe("toggleArrayIfValueExist", () => {
    it("should remove element if existed", () => {
      const result = toggleArrayIfValueExist(
        mockFavPokemonResults,
        mockPokemonResults,
        "name",
        mockFavPokemonResults[0].name
      );
      expect(result).toEqual(mockFavPokemonResults.slice(1));
    });

    it("should add element if not existed", () => {
      const newPokemon = {
        name: "tangela",
        url: "https://pokeapi.co/api/v2/pokemon/114/",
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/114.png",
      };
      const result = toggleArrayIfValueExist<PokemonListResult>(
        mockFavPokemonResults,
        mockPokemonResults,
        "name",
        newPokemon.name
      );
      expect(result).toEqual([...mockFavPokemonResults, newPokemon]);
    });
  });

  describe("removeArrayIfValueExist", () => {
    const name = "lizadorn";
    const newPokemon = {
      name,
      url: "pokemon/1/",
      image: "imageUrl",
    };

    it("should remove element if existed", () => {
      const result = removeArrayIfValueExist(
        mockFavPokemonResults,
        "name",
        mockFavPokemonResults[0].name,
        newPokemon
      );
      expect(result).toEqual(mockFavPokemonResults.slice(1));
    });

    it("should add element if not existed", () => {
      const result = removeArrayIfValueExist<PokemonListResult>(
        mockFavPokemonResults,
        "name",
        name,
        newPokemon
      );
      expect(result).toEqual([...mockFavPokemonResults, newPokemon]);
    });
  });
});
