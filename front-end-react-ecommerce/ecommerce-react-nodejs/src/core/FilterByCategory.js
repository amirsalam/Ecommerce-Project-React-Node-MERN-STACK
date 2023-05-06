import React, { useState } from "react";

function FilterByCategory({ categories, handleFilters }) {
  const [checked] = useState(new Set());
  const handleCategory = (category) => {
    if (checked.has(category._id)) {
      checked.delete(category._id);
    } else {
      checked.add(category._id);
    }
    handleFilters(Array.from(checked));
  };
  return (
    <div>
      <h4>Filter By Category</h4>
      <ul className="list-unstyled">
        {categories &&
          categories.map((category, i) => (
            <li key={i} className="my-3">
              <div className="checkbox">
                <input
                  onClick={() => handleCategory(category)}
                  type="checkbox"
                  className="form-check-input"
                  id={i}
                  value={category._id}
                />
                <label className="form-check-label ml-3" htmlFor={i}>
                  {category.name}
                </label>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default FilterByCategory;
