import { useRouteError } from "react-router-dom";
import MagicSearch from "./MagicSearch";

export default function SearchErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="search-error-page">
        <MagicSearch />
    </div>
  );
}