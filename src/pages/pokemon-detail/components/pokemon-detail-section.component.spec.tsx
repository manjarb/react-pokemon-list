import { render, screen } from "@testing-library/react";
import ReactRouter, { MemoryRouter } from "react-router";

import { mockPokemonDetail } from "../../../data/mock";
import PokemonDetailSection from "./pokemon-detail-section.component";

describe("PokemonDetailSection", () => {
  const onIconClick = jest.fn();
  it("Load component correctly", () => {
    const { container } = render(
      <MemoryRouter>
        <PokemonDetailSection
          data={mockPokemonDetail}
          isFavorite={true}
          onIconClick={onIconClick}
        />
      </MemoryRouter>
    );

    expect(
      container.getElementsByTagName("h1")[0].getElementsByTagName("span")[0]
        .innerHTML
    ).toEqual(mockPokemonDetail.name);

    const typesElement = screen.getByTestId("types");
    expect(typesElement.getElementsByTagName("span")[0].innerHTML).toEqual(
      `${mockPokemonDetail.types[0].type.name},`
    );
    expect(typesElement.getElementsByTagName("span")[1].innerHTML).toEqual(
      mockPokemonDetail.types[1].type.name
    );

    const bodyElement = screen.getByTestId("body");
    expect(bodyElement.innerHTML).toEqual(
      `<span class="fw-bold">Height:</span> 100 cm<span class="fw-bold ml-15">Weight:</span> 13 km`
    );

    const [statElements, abilityElements] =
      screen.getAllByTestId("attribute-box");

    const statsListElements = statElements.getElementsByTagName("li");
    expect(statsListElements.length).toEqual(mockPokemonDetail.stats.length);

    const abilityListElements = abilityElements.getElementsByTagName("li");
    expect(abilityListElements.length).toEqual(
      mockPokemonDetail.abilities.length
    );
  });
});
