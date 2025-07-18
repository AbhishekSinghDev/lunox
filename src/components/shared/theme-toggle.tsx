"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useSidebar } from "../ui/sidebar";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const { open } = useSidebar();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return open ? (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  ) : null;
};

export default ThemeToggle;
