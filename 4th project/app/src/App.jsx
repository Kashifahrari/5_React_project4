import { useState } from "react";
import styled from "styled-components";
import Search_result from "./components/Search_resulr/Search_result";

export const BASE_URL = "http://localhost:9000";

function App() {
  const [data, setData] = useState();
  const [loading, setloading] = useState(false);
  const [error, setError] = useState();
  const [filtereddata, setfilteredata] = useState(null);
  const [ButtonFilter, setButtonFilter] = useState("all");
  useState(() => {
    const fetchfooddata = async () => {
      setloading(true);

      try {
        const data = await fetch(BASE_URL);
        const jsondata = await data.json();
        setData(jsondata);
        setfilteredata(jsondata);
        setloading(false);
      } catch (err) {
        setError(err);
      }
    };

    fetchfooddata();
  }, []);

  if (loading)
    return (
      <div>
        <h4>Loading</h4>
      </div>
    );
  if (error)
    return (
      <div>
        <h5>{error}</h5>
      </div>
    );

  const filterButton = (type) => {
    if (type === "all") {
      setfilteredata(data);
      setButtonFilter("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setfilteredata(filter);
    setButtonFilter(type);
  };

  const Search = (event) => {
    const search_Item = event.target.value;

    if (search_Item === "") {
      setfilteredata(data);
      return;
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(search_Item.toLowerCase())
    );

    setfilteredata(filter);
  };
  return (
    <>
      <Container>
        <TopPart>
          <div className="logo">
            <img src="/images/Foody Zone.svg" alt="logo" />
          </div>
          <div className="search">
            <input
              onChange={Search}
              type="text"
              placeholder="Search For Food"
            />
          </div>
        </TopPart>
        <FilterContainer>
          <Button onClick={() => filterButton("all")}>All</Button>
          <Button onClick={() => filterButton("breakfast")}>Breakfast</Button>
          <Button onClick={() => filterButton("lunch")}>Lunch</Button>
          <Button onClick={() => filterButton("dinner")}>Dinner</Button>
        </FilterContainer>
      </Container>

      <Search_result data={filtereddata} />
    </>
  );
}

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopPart = styled.div`
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5rem;
  background-color: #323334;

  .search {
    input {
      background: #323334;
      border: 1px solid red;
      border-radius: 15px;
      color: #fff;
      height: 48px;
      font-size: 16px;
      padding: 0 5px;
    }
  }
  @media (0px < width < 600px) {
    flex-direction: column;
    height: 120px;
    padding-bottom: 20px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-bottom: 40px;
  background: #323334;
`;

export const Button = styled.button`
  background-color: #ff4343;
  min-width: 43px;
  height: 31px;
  font-weight: 400;
  font-size: 16px;
  color: aliceblue;
  border: none;
  border-radius: 5px;
  padding: 6px 12px;
  cursor: pointer;

  &:hover {
    background-color: #c12b2b;
  }
`;
