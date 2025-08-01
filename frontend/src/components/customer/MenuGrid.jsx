import MenuItem from "./MenuItem";

function MenuGrid({ menuItems, selectedCategory }) {
  const filteredMenu =
    selectedCategory && selectedCategory !== "All"
      ? menuItems.filter((item) => item.category === selectedCategory)
      : menuItems;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredMenu.map((item, index) => (
        <MenuItem
          key={index}
          item={item}
        />
      ))}
    </div>
  );
}

export default MenuGrid;
