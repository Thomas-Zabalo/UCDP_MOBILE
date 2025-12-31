import { useState } from "react";
import categories from "../data/categories";

export default function SelectedCategory() {
    const [selectedId, setSelectedId] = useState("4");
    const [isOpen, setIsOpen] = useState(false);

    const selectedCategory = categories.find(cat => cat.id === selectedId);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectCategory = (id: string) => {
        setSelectedId(id);
        setIsOpen(false);
    };

    return (
        <div className="w-full py-4 relative mb-7">
            <button
                type="button"
                onClick={toggleDropdown}
                className="w-full  text-black bg-gray-800/5 rounded-md py-2 px-3 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                <div className="flex items-center gap-2">
                    {selectedCategory && (
                        <img
                            src={selectedCategory.image}
                            alt={selectedCategory.name}
                            className="h-6 w-6 rounded-full object-cover"
                        />
                    )}
                    <span>{selectedCategory?.name}</span>
                </div>
                <svg
                    className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <ul className="absolute z-10 mt-1 w-full bg-gray-800/5 rounded-md shadow-lg max-h-60 overflow-auto">
                    {categories.map(cat => (
                        <li
                            key={cat.id}
                            onClick={() => selectCategory(cat.id)}
                            className="cursor-pointer flex items-center gap-2 px-3 py-2 hover:bg-indigo-500"
                        >
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="h-6 w-6 rounded-full object-cover"
                            />
                            <span className="text-black">{cat.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
