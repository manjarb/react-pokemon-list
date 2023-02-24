import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

import classes from "./pokemon-list-page.module.scss";
import Pagination, {
  PaginationPageChange,
} from "../../components/pagination.component";
import { Spinner } from "../../components/spinner.component";
import { config } from "../../data/config";
import {
  getPaginationPayload,
  toggleArrayIfValueExist,
} from "../../helpers/utils";
import useFavorite from "../../hooks/use-favorite";
import useGetAxios from "../../hooks/use-get-axios";
import { PokemonList, PokemonListResult } from "../../models/pokemon.model";
import PokemonListCard from "./components/pokemon-list-card.component";
import useFavoriteList from "../../hooks/use-favorite-list";

const LIMIT = 50;

export default function PokemonListPage() {
  let navigate = useNavigate();
  const { favorite, setFavorite } = useFavorite();
  const { favoriteList, setFavoriteList } = useFavoriteList();
  const [isShowFavorite, setIsShowFavorite] = useState(false);
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
      setFavoriteList((prev) => {
        return toggleArrayIfValueExist<PokemonListResult>(prev, results, "name", name);
      });

      setFavorite((prev) => ({
        ...prev,
        [name]: !prev[name],
      }));
    },
    [favorite, favoriteList, results]
  );

  const filteredResults = useMemo(() => {
    return isShowFavorite ? favoriteList : results;
  }, [favoriteList, results, isShowFavorite]);

  const handlePageClick = (event: PaginationPageChange) => {
    const currentPage = event.selected + 1;
    setPage(currentPage);
  };

  const onFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    setIsShowFavorite(checked);
  };

  return (
    <>
      <div className="row">
        <div className="col-12 col-lg-2 mb-20">
          <div
            data-testid="filter-box"
            className={`${classes.filterBox} pa-15`}
          >
            <p className="fw-bold">Filter</p>
            <Form.Check
              type="checkbox"
              id="favorite-check"
              label="Favorite"
              onChange={onFilterChange}
            />
          </div>
        </div>
        <div className="col-12 col-lg-10">
          {loading ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) : (
            filteredResults && (
              <div data-testid="result-box" className="row">
                {filteredResults.map(({ name, image }) => (
                  <div
                    key={`${name}-list`}
                    className="col-md-4 col-sm-4 col-lg-3 col-6 mb-20"
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
          {!isShowFavorite && (
            <div className="pt-10">
              <Pagination
                currentPage={page - 1}
                total={total}
                limit={LIMIT}
                onPageChange={handlePageClick}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
