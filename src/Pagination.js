import React, { useEffect, useState } from "react";
import "./styles.css";

const renderdata = (data) => {
  return (
    <ul>
      {data.map((elem, ind) => {
        return <li>{elem.title}</li>;
      })}
    </ul>
  );
};
export default function Pagination() {
  const [data, setData] = useState([]);
  const [currentperPage, setcurrentperPage] = useState(1);
  const [itemperpage, setitemperpage] = useState(10);

  const [pagenoLimit, setpagenoLimit] = useState(5);
  const [maxpagenoLimit, setMaxpagenoLimit] = useState(5);
  const [minpagenoLimit, setMinpagenoLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentperPage(Number(event.target.id));
  };
  const handlePrev = () => {
    setcurrentperPage(currentperPage - 1);
    if ((currentperPage - 1) % pagenoLimit == 0) {
      setMaxpagenoLimit(maxpagenoLimit - pagenoLimit);
      setMinpagenoLimit(minpagenoLimit - pagenoLimit);
    }
  };
  const handleNext = () => {
    setcurrentperPage(currentperPage + 1);
    if (currentperPage + 1 > maxpagenoLimit) {
      setMaxpagenoLimit(maxpagenoLimit + pagenoLimit);
      setMinpagenoLimit(minpagenoLimit + pagenoLimit);
    }
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemperpage); i++) {
    pages.push(i);
  }

  const indexoflastItem = itemperpage * currentperPage;
  const indexoffirstItem = indexoflastItem - itemperpage;
  const currentItems = data.slice(indexoffirstItem, indexoflastItem);
  const renderedpageno = pages.map((number) => {
    if (number < maxpagenoLimit + 1 && number > minpagenoLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentperPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);
  return (
    <>
      {renderdata(currentItems)}
      <ul className="pagenumbers">
        <li>
          <button onClick={handlePrev}>Prev</button>
        </li>
        {renderedpageno}
        <li>
          <button onClick={handleNext}>Next</button>
        </li>
      </ul>
    </>
  );
}
