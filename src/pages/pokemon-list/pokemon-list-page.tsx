import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import pokemonLogo from "../../assets/images/Pokemon_logo.png";
import Pagination, {
  PaginationPageChange,
} from "../../components/pagination.component";
import { Spinner } from "../../components/spinner.component";
import { config } from "../../data/config";
import { getPaginationPayload } from "../../helpers/utils";
import useFavorite from "../../hooks/use-favorite";
import useGetAxios from "../../hooks/use-get-axios";
import { PokemonList, PokemonListResult } from "../../models/pokemon.model";
import PokemonListCard from "./components/pokemon-list-card.component";
import classes from "./pokemon-list-page.module.scss";

const LIMIT = 50;

export default function PokemonListPage() {
  let navigate = useNavigate();
  const { favorite, setFavorite } = useFavorite();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [results, setResults] = useState<PokemonListResult[]>([]);
  const { data, loading, fetchData } = useGetAxios<PokemonList>();

  const fetchPokemonList = () => {
    const endpoint = `${config.apiUrl}/pokemon`;
    const { limit, offset } = getPaginationPayload(page, LIMIT);
    fetchData(endpoint, { limit, offset });
  };

  const mapResultsWithImage = (listResults: PokemonListResult[]) => {
    return listResults.map((r) => {
      const splitUrl = r.url.split("/");
      const image = `${config.imageUrl}/${splitUrl[splitUrl.length - 2]}.png`;
      return {
        ...r,
        image,
      };
    });
  };

  useEffect(() => {
    fetchPokemonList();
  }, [page]);

  useEffect(() => {
    if (data) {
      const { count, results } = data;
      setTotal(count);
      setResults(mapResultsWithImage(results));
    }
  }, [data]);

  const onButtonClick = useCallback((name: string) => {
    const pageUrl = `/pokemons/${name}`;
    navigate(pageUrl);
  }, []);

  const onIconClick = useCallback(
    (name: string) => {
      setFavorite((prev) => ({
        ...prev,
        [name]: !prev[name],
      }));
    },
    [favorite]
  );

  const handlePageClick = (event: PaginationPageChange) => {
    const currentPage = event.selected + 1;
    setPage(currentPage);
  };

  return (
    <div className="container pt-30 pb-40">
      <div className="text-center mb-30">
        <img className={classes.logo} src={pokemonLogo} alt="pokemon logo" />
      </div>
      {loading ? (
        <div className="text-center">
          <Spinner />
        </div>
      ) : (
        results && (
          <div className="row">
            {results.map(({ name, image }) => (
              <div
                key={`${name}-list`}
                className="col-md-3 col-sm-4 col-6 mb-20"
              >
                <PokemonListCard
                  name={name}
                  image={image}
                  isFavorite={favorite[name]}
                  onButtonClick={onButtonClick}
                  onIconClick={onIconClick}
                />
              </div>
            ))}
          </div>
        )
      )}
      <div className="pt-10">
        <Pagination
          total={total}
          limit={LIMIT}
          onPageChange={handlePageClick}
        />
      </div>
    </div>
  );
}
