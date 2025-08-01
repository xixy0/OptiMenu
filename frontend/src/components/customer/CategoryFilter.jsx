import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function CategoryFilter({ categories, type, setType }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category");

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      // If clicking the active category, remove the filter
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      // Set the new category
      setSearchParams((params) => {
        params.set("category", category);
        return params;
      });
    }
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={
            selectedCategory === "All" || !selectedCategory
              ? "default"
              : "outline"
          }
          onClick={() => handleCategoryClick("All")}
        >
          All
        </Button>
        {categories.map((category, index) => (
          <Button
            key={index}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
        <Button
          variant="ghost"
          onClick={() => setType("all")}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm font-medium",
            type === "all"
              ? "bg-gray-100 text-gray-900"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          All
        </Button>
        <Button
          variant="ghost"
          onClick={() => setType("veg")}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm font-medium",
            type == "veg"
              ? "bg-green-100 text-green-950"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          Veg
        </Button>
        <Button
          variant="ghost"
          onClick={() => setType("non-veg")}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm font-medium",
            type == "non-veg"
              ? "bg-orange-100 text-orange-950"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          Non-Veg
        </Button>
      </div>
    </div>
  );
}

export default CategoryFilter;
