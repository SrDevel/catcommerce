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
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") as Theme | null;
      return storedTheme || defaultTheme;
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    let activeTheme: "light" | "dark";
    if (theme === "system") {
      activeTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      activeTheme = theme;
    }

    root.classList.add(activeTheme);

    // Aplicar variables CSS del tema
    const colors = themeConfig[activeTheme];
    Object.entries(colors).forEach(([category, values]) => {
      Object.entries(values).forEach(([name, value]) => {
        document.documentElement.style.setProperty(
          `--${category}-${name}`,
          value as string
        );
      });
    });
  }, [theme]);

  // Escuchar cambios en el tema del sistema
  useEffect(() => {
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        const root = window.document.documentElement;
        const systemTheme = mediaQuery.matches ? "dark" : "light";
        root.classList.remove("light", "dark");
        root.classList.add(systemTheme);
        
        const colors = themeConfig[systemTheme];
        Object.entries(colors).forEach(([category, values]) => {
          Object.entries(values).forEach(([name, value]) => {
            document.documentElement.style.setProperty(
              `--${category}-${name}`,
              value as string
            );
          });
        });
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem("theme", newTheme);
      setTheme(newTheme);
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
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};