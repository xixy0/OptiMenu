import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import Header from "@/components/customer/Header";
import CategoryFilter from "@/components/customer/CategoryFilter";
import MenuGrid from "@/components/customer/MenuGrid";
import FeaturedCarousel from "@/components/customer/FeaturedCarousel";
import SearchBar from "../../components/customer/SearchBar";

import useDebounce from "@/hooks/useDebounce";

import { searchItems } from "@/lib/utils";
// import { menuItems } from "@/constants";
import { fetchMenuItems } from "@/api";

import useCustomer from "@/stores/useCustomer";

const Menu = () => {
  const userId = useCustomer((state) => state.userId);
  console.log(userId);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";

  const [type, setType] = useState("all");

  const { data: menuItems = [] } = useQuery({
    queryKey: ["menuItems"],
    queryFn: () => fetchMenuItems(),
    staleTime: 5000,
    refetchInterval: 30000,
  });
  // console.log("menuItems", menuItems);

  const featuredItems = [...menuItems]
    .sort((a, b) => b.demandScore - a.demandScore)
    .slice(0, 3);

  const categories = [...new Set(menuItems.map((item) => item.category))];

  const filteredItems = searchItems(menuItems, debouncedSearchTerm)
    .filter(
      (item) => selectedCategory === "All" || item.category === selectedCategory
    )
    .filter(
      (item) =>
        type === "all" ||
        (type === "veg" && item.isVeg === 1) ||
        (type === "non-veg" && item.isVeg !== 1)
    );

  return (
    <div className="bg-white mt-10 p-2">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-white shadow-md">
        <Header />
      </div>

      <FeaturedCarousel items={featuredItems} />

      <div className="mb-6">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      <CategoryFilter
        categories={categories}
        type={type}
        setType={setType}
      />
      {/* Menu Grid */}
      <div className="mt-6">
        <MenuGrid
          menuItems={filteredItems}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
};

export default Menu;
