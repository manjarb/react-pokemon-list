import loverIcon from "../../../assets/icons/lover.png";
import heartIcon from "../../../assets/icons/heart.png";
import classes from "./pokemon-list-card.module.scss";

import Button from "react-bootstrap/Button";

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
        <h5 className="card-title">{name}</h5>
        <div>
          <Button
            variant="info"
            className="mr-10"
            onClick={() => onButtonClick && onButtonClick(name)}
          >
            Detail
          </Button>
          <img
            className="pointer ph-5"
            src={isFavorite ? loverIcon : heartIcon}
            alt="favorited icon"
            onClick={() => onIconClick && onIconClick(name)}
          />
        </div>
      </div>
    </div>
  );
}
