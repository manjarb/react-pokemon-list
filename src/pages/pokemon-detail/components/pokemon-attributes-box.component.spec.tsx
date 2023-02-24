import { render, screen } from "@testing-library/react";
import PokemonAttributesBox from "./pokemon-attributes-box.component";

describe("PokemonAttributesBox Component", () => {
  const title = 'title';
  const children = <li>element</li>;
  it("Load and Display correct data", () => {
    const { container } = render(
      <PokemonAttributesBox title={title}>{children}</PokemonAttributesBox>
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(container.getElementsByTagName("ul")[0].innerHTML).toEqual(
      "<li>element</li>"
    );
  });
});
