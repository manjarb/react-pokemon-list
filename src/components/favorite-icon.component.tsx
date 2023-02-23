import loverIcon from "../assets/icons/lover.png";
import heartIcon from "../assets/icons/heart.png";

interface FavoriteIconProps {
  isFavorite: boolean;
  onClick: () => void;
}

export default function FavoriteIcon({
  isFavorite,
  onClick,
}: FavoriteIconProps) {
  return (
    <img
      className="pointer ph-5"
      src={isFavorite ? loverIcon : heartIcon}
      alt="favorited icon"
      onClick={onClick}
    />
  );
}
