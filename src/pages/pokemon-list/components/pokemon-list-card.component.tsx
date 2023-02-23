import loverIcon from "../../../assets/icons/lover.png";
import heartIcon from "../../../assets/icons/heart.png";
import classes from "./pokemon-list-card.module.scss";

import Button from "react-bootstrap/Button";
import FavoriteIcon from "../../../components/favorite-icon.component";

interface PokemonListCardProps {
  name: string;
  image?: string;
  isFavorite: boolean;
  onButtonClick?: (name: string) => void;
  onIconClick?: (name: string) => void;
}

export default function PokemonListCard({
  name,
  image,
  isFavorite = false,
  onButtonClick,
  onIconClick,
}: PokemonListCardProps) {
  return (
    <div className="card">
      {image && (
        <img
          className={`card-img-top ${classes.image}`}
          src={image}
          alt={`${name} image`}
        />
      )}
      <div className="card-body text-center">
        <h5 className="card-title text-capitalize">{name}</h5>
        <div>
          <Button
            variant="info"
            className="mr-10"
            onClick={() => onButtonClick && onButtonClick(name)}
          >
            Detail
          </Button>
          <FavoriteIcon
            isFavorite={isFavorite}
            onClick={() => onIconClick && onIconClick(name)}
          />
        </div>
      </div>
    </div>
  );
}
