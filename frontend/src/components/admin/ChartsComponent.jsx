import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import CurrentDayChart from "./CurrentDayChart";
import CurrentWeekChart from "./CurrentWeekChart";
import CurrentMonthChart from "./CurrentMonthChart";

const ChartsComponent = () => {
  const [filterOption, setFilterOption] = useState("today"); // Default filter option
  // options: Today, This Week, This Month
  return (
    <div className="container mx-auto px-4 py-8 border-2 flex flex-col gap-2 xl:col-span-2 rounded-lg bg-white shadow-md">
      {/* Filter options */}
      <div className="mb-6  flex justify-end">
        {/* <select
          className="border border-gray-300  px-3 py-2 outline-none bg-white text-gray-800"
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
        >
          <option
            className="bg-white text-gray-800"
            value="Today"
          >
            Today
          </option>
          <option
            className="bg-white text-gray-800"
            value="This Week"
          >
            This Week
          </option>
          <option
            className="bg-white text-gray-800 rounded-none"
            value="This Month"
          >
            This Month
          </option>
        </select> */}
        <Select
          value={filterOption}
          onValueChange={setFilterOption}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filterOption === "today" ? (
        <CurrentDayChart />
      ) : filterOption === "week" ? (
        <CurrentWeekChart />
      ) : (
        <CurrentMonthChart />
      )}
    </div>
  );
};

export default ChartsComponent;
