interface PokemonAttributesBoxProps {
  title: string;
  children: JSX.Element;
}

export default function PokemonAttributesBox({title, children}: PokemonAttributesBoxProps) {
  return (
    <div className="col-md-4">
      <span className="fw-bold">{title}</span>
      <ul className="pl-15">{children}</ul>
    </div>
  );
}
