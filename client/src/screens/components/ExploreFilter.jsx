import React from "react";
import { arrTopics, arrLanguages, ageGroup } from "../../helpers/data";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { ChatState } from "../../context/ChatProvider.jsx";

const ExploreFilter = () => {
  const { setFilter, filters } = ChatState();

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      if (e.target.title === "interest") filters.interests.push(e.target.name);
      if (e.target.title === "language") filters.languages.push(e.target.name);
      if (e.target.title === "ageGroup") filters.ageGroup.push(e.target.name);
    } else {
      if (e.target.title === "interest") {
        let pop = filters.interests.indexOf(e.target.name);
        filters.interests.splice(pop, 1);
      } else if (e.target.title === "language") {
        let pop = filters.languages.indexOf(e.target.name);
        filters.languages.splice(pop, 1);
      } else {
        let pop = filters.ageGroup.indexOf(e.target.name);
        filters.ageGroup.splice(pop, 1);
      }
    }
    if (
      filters.interests.length > 0 ||
      filters.languages.length > 0 ||
      filters.ageGroup.length > 0
    )
      setFilter(true);
    else setFilter(false);
  };

  return (
    <div className="filter-pane">
      <div className="header">
        <h3>Filter</h3>
        <FilterListRoundedIcon />
      </div>
      <div className="filter-container">
        <p className="accent">Interests</p>
        <div className="filters">
          {arrTopics.map((filter, index) => (
            <div className="filter" key={index}>
              <input
                type="checkbox"
                name={filter}
                key={filter}
                onChange={handleCheckbox}
                title="interest"
              />
              <label>{filter}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="filter-container">
        <p className="accent">Languages</p>
        <div className="filters">
          {arrLanguages.map((filter, index) => (
            <div className="filter" key={index}>
              <input
                type="checkbox"
                name={filter}
                key={filter}
                onChange={handleCheckbox}
                title="language"
              />
              <label>{filter}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="filter-container">
        <p className="accent">Age Group</p>
        <div className="filters">
          {ageGroup.map((filter, index) => (
            <div className="filter" key={index}>
              <input
                type="checkbox"
                name={filter}
                key={filter}
                onChange={handleCheckbox}
                title="ageGroup"
              />
              <label>{filter}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreFilter;
