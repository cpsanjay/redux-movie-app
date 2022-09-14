import React, { useState } from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  fetchAsyncMovies,
  fetchAsyncSeries,
} from "./../../features/movies/movieSlice";

const Header = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (term === "") return alert("Please enter search term!");
    dispatch(fetchAsyncMovies(term));
    dispatch(fetchAsyncSeries(term));
  };
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">Movie App</Link>
      </div>
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={term}
            placeholder="Search Movies or Shows"
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
      <div className="user-image">
        <img
          src="https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
          alt="user"
        />
      </div>
    </div>
  );
};

export default Header;
