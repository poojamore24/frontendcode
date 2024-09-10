"use client";
import React, { useState, useCallback, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  ThemeProvider,
  createTheme,
  Slider,
  Menu,
  MenuItem,
  Fade,
} from "@mui/material";
import {
  Search,
  Fastfood,
  VerifiedUser,
  Star,
  Home,
  Group,
  ExpandMore,
} from "@mui/icons-material";
import { useSearchParams } from "next/navigation";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#22d3ee" },
    secondary: { main: "#f0abfc" },
    background: {
      default: "transparent",
      paper: "#1f2937",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

interface FilterButtonProps {
  label: string;
  icon: React.ReactNode;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  icon,
  options,
  value,
  onChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionSelect = (option: string) => {
    onChange(option);
    handleClose();
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={icon}
        endIcon={<ExpandMore />}
        onClick={handleClick}
        className="rounded-full border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white transition-all duration-300"
      >
        {label}: {value}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleOptionSelect(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

interface Filters {
  searchName: string;
  type: string;
  studentsPerRoom: string;
  food: boolean;
  verified: boolean;
  sortByRatings: boolean;
  rentRange: [number, number];
}

interface HostelFilterProps {
  onFilter: (filters: Filters) => void;
  initialSearch: string;
}

const HostelFilter: React.FC<HostelFilterProps> = ({
  onFilter,
  initialSearch,
}) => {
  const [filters, setFilters] = useState<Filters>({
    searchName: initialSearch || "",
    type: "All",
    studentsPerRoom: "Any",
    food: false,
    verified: false,
    sortByRatings: false,
    rentRange: [0, 10000],
  });

  const handleChange = useCallback(
    (key: keyof Filters, value: string | boolean | [number, number]) => {
      setFilters((prev) => {
        const newFilters = { ...prev, [key]: value };
        onFilter(newFilters);
        return newFilters;
      });
    },
    [onFilter]
  );

  useEffect(() => {
    if (initialSearch) {
      handleChange("searchName", initialSearch);
    }
  }, [initialSearch, handleChange]);

  return (
    <ThemeProvider theme={theme}>
      <Box className="w-full fixed top-20 left-0 right-0 z-50 shadow-lg bg-white rounded-b-lg py-4">
        <Box className="container mx-auto px-4">
          <Box className="flex items-center justify-center mb-4">
            <div className="flex justify-center w-full">
              <div className="relative w-11/12 max-w-3xl">
                <input
                  type="text"
                  placeholder="Search your hostel"
                  value={filters.searchName}
                  onChange={(e) => handleChange("searchName", e.target.value)}
                  className="w-full py-3 pl-12 pr-4 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full flex items-center transition duration-300">
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
              </div>
            </div>
          </Box>

          <Box className="flex flex-wrap items-center justify-between gap-2">
            <FilterButton
              label="Type"
              icon={<Home />}
              options={["All", "boys", "girls"]}
              value={filters.type}
              onChange={(value) => handleChange("type", value)}
            />
            <FilterButton
              label="Students/Room"
              icon={<Group />}
              options={["Any", "1", "2", "3+"]}
              value={filters.studentsPerRoom}
              onChange={(value) => handleChange("studentsPerRoom", value)}
            />
            <Button
              variant="outlined"
              startIcon={<Fastfood />}
              onClick={() => handleChange("food", !filters.food)}
              className={`rounded-full transition-all duration-300 ${
                filters.food
                  ? "bg-cyan-500 text-white"
                  : "border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white"
              }`}
            >
              Food
            </Button>
            <Button
              variant="outlined"
              startIcon={<VerifiedUser />}
              onClick={() => handleChange("verified", !filters.verified)}
              className={`rounded-full transition-all duration-300 ${
                filters.verified
                  ? "bg-cyan-500 text-white"
                  : "border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white"
              }`}
            >
              Verified
            </Button>
            <Button
              variant="outlined"
              startIcon={<Star />}
              onClick={() =>
                handleChange("sortByRatings", !filters.sortByRatings)
              }
              className={`rounded-full transition-all duration-300 ${
                filters.sortByRatings
                  ? "bg-cyan-500 text-white"
                  : "border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white"
              }`}
            >
              Sort by Ratings
            </Button>
            <Box className="flex items-center gap-2 flex-grow">
              <Typography
                variant="body2"
                className="text-cyan-400 whitespace-nowrap"
              >
                Rent: ₹{filters.rentRange[0]} - ₹{filters.rentRange[1]}
              </Typography>
              <Slider
                value={filters.rentRange}
                onChange={(_, value) =>
                  handleChange("rentRange", value as [number, number])
                }
                valueLabelDisplay="auto"
                min={0}
                max={10000}
                step={100}
                className="text-cyan-400 ml-1"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default HostelFilter;
