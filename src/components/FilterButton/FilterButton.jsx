import React from "react"

function FilterButton({
    isPressed,
    name,
    setFilter
}) {
    return (
      <button
        type="button"
        className="btn"
        aria-pressed={isPressed}
        onClick={() => setFilter(name)}>
        <span>{name}</span>
        <span className="visually-hidden"> задания</span>
      </button>
    );
}

export default FilterButton