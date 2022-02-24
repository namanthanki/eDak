import React from "react";
import { ChatState } from "../../context/ChatProvider.jsx";
import { isAuth } from "../../helpers/auth.js";
import { toast } from "react-toastify";
import axios from "axios";

const ExploreHeader = () => {
  const { search, setSearch, setSearchResult } = ChatState();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) {
      toast.error("Please Enter Something to Search");
      return;
    }

    try {
      const id = isAuth()._id;

      const { data } = await axios.get(
        `http://localhost:5000/user/${id}/search?username=${search}`
      );
      setSearchResult(data);
    } catch (err) {
      toast.error("Failed to Load Search Results");
    }
  };

  return (
    <div className="explore-header">
      <h2 className="accent">Find Friends</h2>
      <div className="search-container">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="explore-search-bar"
        />
        <button type="button" className="btn" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default ExploreHeader;
