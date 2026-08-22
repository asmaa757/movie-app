import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

function ThemeProvider({ children }) {
  const [isLight, setIsLight] = useState(
    () => localStorage.getItem("theme") === "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("light", isLight);

    localStorage.setItem(
      "theme",
      isLight ? "light" : "dark"
    );
  }, [isLight]);

  const toggleTheme = () => {
    setIsLight((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isLight, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;