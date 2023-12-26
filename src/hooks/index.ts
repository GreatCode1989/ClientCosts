import { useState, useEffect } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme") as string) || "light"
  );
  const grayTheme =
    "https://cdn.jsdelivr.net/npm/@forevolve/bootstrap-dark@1.0.0/dist/css/bootstrap-dark.min.css";
  const lightTheme =
    "https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css";

  const switchTheme = () => {
    const inverseMode = theme === "gray" ? "light" : "gray";
    localStorage.setItem("theme", JSON.stringify(inverseMode));

    const link = document.getElementById("theme-link") as HTMLLinkElement;
    link.href = theme === "gray" ? grayTheme : lightTheme;

    setTheme(inverseMode);
  };

  useEffect(() => {
    const link = document.getElementById("theme-link") as HTMLLinkElement;
    link.href = theme === "gray" ? grayTheme : lightTheme;
  }, [theme]);

  return { switchTheme, theme };
};
