import React, { useState } from "react";
import "../../styles/LightMode.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

const LightMode = () => {
  let buttonClickedClassName = "clicked";
  // const body = document.body;
  const lightThemeClass = "light";
  const darkThemeClass = "dark";
  let theme_localStorage_key;

  if (localStorage) {
    theme_localStorage_key = localStorage.getItem("theme");
  }

  const [switchClass, addSwitchClass] = useState(theme_localStorage_key);

  if (
    theme_localStorage_key === lightThemeClass ||
    theme_localStorage_key === darkThemeClass
  ) {
    document.documentElement.classList.add(theme_localStorage_key);
  } else {
    document.documentElement.classList.add(darkThemeClass);
  }

  const switchTheme = (e) => {
    if (theme_localStorage_key === darkThemeClass) {
      document.documentElement.classList.replace(
        darkThemeClass,
        lightThemeClass
      );
      e.target.classList.remove(buttonClickedClassName);
      localStorage.setItem("theme", "light");
      theme_localStorage_key = lightThemeClass;
    } else {
      document.documentElement.classList.replace(
        lightThemeClass,
        darkThemeClass
      );
      e.target.classList.remove(buttonClickedClassName);
      localStorage.setItem("theme", "dark");
      theme_localStorage_key = darkThemeClass;
    }
    addSwitchClass(theme_localStorage_key);
  };

  return (
    <div>
      <input
        type="checkbox"
        className="checkbox"
        id="chk"
        onClick={(e) => switchTheme(e)}
      />
      <label className="label" htmlFor="chk">
        <FontAwesomeIcon icon={faMoon} size="xs" className="moon" />
        <FontAwesomeIcon icon={faSun} size="xs" className="sun" />
        {switchClass === "dark" ? <div className="ball clicked"></div> : null}
        {switchClass === "light" ? (
          <div className="ball not-clicked"></div>
        ) : null}
      </label>
    </div>
  );
};

export default LightMode;
