import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import FavoriteIcon from "../../../components/favorite-icon.component";
import {
  convertDeciToCentiMeter,
  convertHectoToKiloGrams,
} from "../../../helpers/utils";
import { Pokemon } from "../../../models/pokemon.model";
import PokemonAttributesBox from "./pokemon-attributes-box.component";

interface PokemonDetailSectionProps {
  data: Omit<Pokemon, 'moves'>;
  isFavorite: boolean;
  onIconClick: (name: string, id: number, image: string) => void;
}

export default function PokemonDetailSection({
  data: { name, types, height, weight, stats, abilities, id, sprites },
  isFavorite,
  onIconClick,
}: PokemonDetailSectionProps) {
  return (
    <div>
      <h1 className="text-capitalize">
        <span className="mr-10">{name}</span>
        <FavoriteIcon
          isFavorite={isFavorite}
          onClick={() => onIconClick(name, id, sprites.front_default)}
        />
      </h1>
      <p data-testid="types">
        {types.map((t, index) => (
          <span key={t.type.name} className="mr-5 text-capitalize">
            {t.type.name}
            {index !== types.length - 1 && ","}
          </span>
        ))}
      </p>
      <p data-testid="body">
        <span className="fw-bold">Height:</span>{" "}
        {convertDeciToCentiMeter(height)} cm
        <span className="fw-bold ml-15">Weight:</span>{" "}
        {convertHectoToKiloGrams(weight)} km
      </p>
      <hr />
      <div className="row">
        <PokemonAttributesBox title="Stats">
          <>
            {stats.map(({ stat, base_stat }) => (
              <li key={stat.name}>
                {stat.name}: {base_stat}
              </li>
            ))}
          </>
        </PokemonAttributesBox>

        <PokemonAttributesBox title="Abilities">
          <>
            {abilities.map(({ ability }) => (
              <li key={ability.name}>{ability.name}</li>
            ))}
          </>
        </PokemonAttributesBox>
      </div>

      <div>
        <Link to={`/`}>
          <Button variant="link">Back to List Page</Button>
        </Link>
      </div>
    </div>
  );
}
