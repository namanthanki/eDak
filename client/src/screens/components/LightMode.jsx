import React from "react";
import "../../styles/LightMode.css";

const LightMode = () => {
  let buttonClickedClassName = "clicked";
  // const body = document.body;
  const lightThemeClass = "light";
  const darkThemeClass = "dark";
  let theme_localStorage_key;

  if (localStorage) {
    theme_localStorage_key = localStorage.getItem("theme");
  }

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
  };

  return (
    <button
      className={
        theme_localStorage_key === "dark" ? buttonClickedClassName : ""
      }
      id="lightMode"
      onClick={(e) => switchTheme(e)}></button>
  );
};

export default LightMode;
