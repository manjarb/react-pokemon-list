import { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../../components/spinner.component";
import { config } from "../../data/config";
import useFavorite from "../../hooks/use-favorite";
import useGetAxios from "../../hooks/use-get-axios";
import { Pokemon } from "../../models/pokemon.model";
import PokemonDetailSection from "./components/pokemon-detail-section.component";

export default function PokemonDetailPage() {
  let { name } = useParams();
  const { favorite, setFavorite } = useFavorite();
  const { data, loading, fetchData } = useGetAxios<Pokemon>();

  const fetchPokemon = (name: string) => {
    const endpoint = `${config.apiUrl}/pokemon/${name}`;
    fetchData(endpoint);
  };

  useEffect(() => {
    if (name) {
      fetchPokemon(name);
    }
  }, [name]);

  const isFavorite = useMemo(() => {
    if (!name) {
      return false;
    }
    return favorite[name];
  }, [name, favorite]);

  const onIconClick = useCallback(
    (name: string) => {
      setFavorite((prev) => {
        return {
          ...prev,
          [name]: !prev[name],
        };
      });
    },
    [favorite]
  );

  return (
    <>
      {loading ? (
        <div className="text-center">
          <Spinner />
        </div>
      ) : (
        data && (
          <div className="row">
            <div className="col-12 col-md-3 text-center">
              <img src={data.sprites.front_default} alt={`${name} front`} />
              <img src={data.sprites.back_default} alt={`${name} back`} />
            </div>
            <div className="col-12 col-md-9">
              <PokemonDetailSection
                data={data}
                isFavorite={isFavorite}
                onIconClick={onIconClick}
              />
            </div>
          </div>
        )
      )}
    </>
  );
}
