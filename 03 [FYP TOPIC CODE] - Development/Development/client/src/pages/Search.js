import SearchForm from "../components/forms/SearchForm";
import Card from "../components/card";
import { useSearch } from "../context/search";

export default function Search() {
    const [search, setSearch] = useSearch();
    return(
        <div className=" mt-5 pt-5">
        <SearchForm />

        <div className="container">
            <div className="row">
                {search.results?.length>0? ( <div className="col-12  p5 mt-5">
                    <h1>  {search.results?.length}</h1>
                    <h5>Results Found</h5>
                   
                </div> ) : <div className="colmd-12 text-center p-5"> No Results to Display.</div> }
            </div>
            <div className="row">
                {search.results?.map((item) => (
                    <Card ad={item} key={item._id} />
                ))}
            </div>
        </div>
        </div>
   
  

    )
}