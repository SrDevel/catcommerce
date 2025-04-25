import { createContext, useContext, useEffect, useState } from "react";
import { themeConfig } from "@/config/theme.config";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => {
      const storedTheme = localStorage.getItem("theme") as string | null;
      return (storedTheme === "dark" || storedTheme === "light" || storedTheme === "system")
        ? storedTheme
        : defaultTheme;
    }
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      applyThemeColors(systemTheme);
      return;
    }

    root.classList.add(theme);
    applyThemeColors(theme);
  }, [theme]);

  const applyThemeColors = (activeTheme: "light" | "dark") => {
    const colors = themeConfig[activeTheme];
    Object.entries(colors).forEach(([category, values]) => {
      Object.entries(values).forEach(([name, value]) => {
        document.documentElement.style.setProperty(
          `--${category}-${name}`,
          value as string
        );
      });
    });
  };

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem("theme", theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};