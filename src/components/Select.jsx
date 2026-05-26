import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

/**
 * Reusable Select – search, single/multi, avatar, product info. All configurable via props.
 */
const Select = ({
    title,
    options = [],
    onSelect,
    selectOption,
    customStyle = "",
    showSearch = false,
    searchLabel,
    searchPlaceholder = "Search here...",
    multiple = false,
    value,
    onChange,
    placeholder = "Select...",
    showCheckbox,
    showAvatar = false,
    showProductInfo = false,
    getOptionValue = (o) => o.value,
    getOptionLabel = (o) => o.label ?? o.name ?? "",
    getOptionImage = (o) => o.image ?? o.avatar ?? "",
    getOptionMeta = (o) => o.meta ?? "",
    minWidth = "100px",
    compact = false,
    className = "",
    disabled = false,
    name = "",
    lightTheme = false,
    hideChevron = false,
    dropdownClassName = "",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const dropdownRef = useRef(null);
    const searchInputRef = useRef(null);

    const isValueOnChangeMode = value !== undefined && onChange;
    const isMulti = multiple || Array.isArray(value);
    const selectedValues =
        isMulti && Array.isArray(value)
            ? value
            : value != null && value !== ""
                ? [value]
                : [];
    const displayTitle = isValueOnChangeMode ? placeholder : title;

    const getDisplayOption = () => {
        if (isMulti) {
            if (selectedValues.length === 0) return "";
            if (selectedValues.length === 1) {
                const opt = options.find(
                    (o) => getOptionValue(o) === selectedValues[0]
                );
                return opt ? getOptionLabel(opt) : String(selectedValues[0]);
            }
            return `${selectedValues.length} items selected`;
        }
        if (isValueOnChangeMode) {
            const opt = options.find((o) => getOptionValue(o) === value);
            return opt ? getOptionLabel(opt) : "";
        }
        return selectOption ?? "";
    };

    const displayOption = getDisplayOption();

    const toggleDropdown = () => {
        if (disabled) return;
        setIsOpen((prev) => !prev);
    };

    const isSelected = (item) => selectedValues.includes(getOptionValue(item));

    const handleSelectOption = (item) => {
        if (disabled) return;
        const val = getOptionValue(item);
        const label = getOptionLabel(item);

        if (isMulti) {
            const next = isSelected(item)
                ? selectedValues.filter((v) => v !== val)
                : [...selectedValues, val];
            if (onChange) onChange({ target: { name, value: next } });
            return;
        }

        if (isValueOnChangeMode) {
            onChange({ target: { name, value: val } });
        } else if (onSelect) {
            onSelect(label);
        }
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
    };

    const filteredOptions = showSearch
        ? options.filter((item) =>
            getOptionLabel(item)?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : options;

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
                setSearchTerm("");
                setHighlightedIndex(-1);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Auto-focus search input when dropdown opens
    useEffect(() => {
        if (isOpen && showSearch && searchInputRef.current) {
            // Small delay to ensure the input is rendered
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 0);
        }
    }, [isOpen, showSearch]);

    const handleKeyDown = (e) => {
        if (!isOpen || disabled) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prev) =>
                prev < filteredOptions.length - 1 ? prev + 1 : 0
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prev) =>
                prev > 0 ? prev - 1 : filteredOptions.length - 1
            );
        } else if (e.key === "Enter" && highlightedIndex >= 0) {
            e.preventDefault();
            handleSelectOption(filteredOptions[highlightedIndex]);
        }
    };

    const renderOptionContent = (item, index) => {
        const label = getOptionLabel(item);
        const image = showAvatar ? getOptionImage(item) : null;
        const isHighlighted =
            highlightedIndex === index ||
            (!isMulti && displayOption === label) ||
            (isMulti && isSelected(item));
        const priceRange = item.priceRange ?? item.price ?? "";
        const stockStatus = item.stockStatus ?? "";
        const meta = showProductInfo ? getOptionMeta(item) : "";

        if (showProductInfo || showAvatar) {
            return (
                <div
                    className={`group flex items-start gap-3 px-3 py-2 cursor-pointer border-b border-zinc-800 last:border-0 transition-colors
        ${isHighlighted
                            ? "bg-[#FA0C83] text-white"
                            : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                        }`}
                    onClick={() => handleSelectOption(item)}
                >
                    {showCheckbox !== false && isMulti && (
                        <span className="shrink-0 flex items-center pt-0.5">
                            <input
                                type="checkbox"
                                checked={isSelected(item)}
                                onChange={() => handleSelectOption(item)}
                                onClick={(e) => e.stopPropagation()}
                                className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-[#FA0C83] focus:ring-[#FA0C83] accent-[#FA0C83]"
                            />
                        </span>
                    )}

                    {showAvatar && (
                        <div className="w-10 h-10 rounded-sm shrink-0 overflow-hidden bg-zinc-800 flex items-center justify-center">
                            {image ? (
                                <img
                                    src={image}
                                    alt={label}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-zinc-500 text-lg group-hover:text-white">📦</span>
                            )}
                        </div>
                    )}

                    <div className="flex-1 min-w-0">
                        <p
                            className={`font-semibold text-sm transition-colors
            ${isHighlighted
                                    ? "text-white"
                                    : "text-zinc-200 group-hover:text-white"
                                }`}
                        >
                            {label}
                        </p>

                        {showProductInfo && (priceRange || stockStatus) && (
                            <p
                                className={`text-xs font-semibold mt-0.5 transition-colors
              ${isHighlighted
                                        ? "text-zinc-100"
                                        : "text-zinc-500 group-hover:text-zinc-300"
                                    }`}
                            >
                                {priceRange} {stockStatus ? `(${stockStatus})` : ""}
                            </p>
                        )}

                        {showProductInfo && meta && (
                            <p
                                className={`text-xs mt-1 font-medium truncate transition-colors
              ${isHighlighted
                                        ? "text-zinc-200"
                                        : "text-zinc-600 group-hover:text-zinc-400"
                                    }`}
                            >
                                {meta}
                            </p>
                        )}
                    </div>
                </div>
            );
        }

        return (
            <li
                onClick={() => handleSelectOption(item)}
                className={`px-4 py-2.5 cursor-pointer transition-colors flex items-center gap-2 ${
                    isHighlighted ? "bg-[#FA0C83] text-white font-medium" : (lightTheme ? "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900" : "text-zinc-300 hover:bg-zinc-800 hover:text-white")
                    } ${displayOption === label && !isHighlighted ? (lightTheme ? "bg-zinc-50 text-zinc-900 font-medium" : "bg-zinc-800 text-white font-medium") : ""
                    }`}
            >
                {showCheckbox !== false && isMulti && (
                    <input
                        type="checkbox"
                        checked={isSelected(item)}
                        onChange={() => handleSelectOption(item)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-[#FA0C83] focus:ring-[#FA0C83] shrink-0 accent-[#FA0C83]"
                    />
                )}
                <span>{label}</span>
            </li>
        );
    };

    return (
        <div
            ref={dropdownRef}
            className={`relative min-w-0 block w-full ${customStyle}`}
            style={minWidth ? { minWidth } : undefined}
        >
            <button
                type="button"
                disabled={disabled}
                onClick={toggleDropdown}
                onKeyDown={handleKeyDown}
                className={`w-full px-5 text-sm border rounded-full font-medium focus:outline-none flex items-center justify-between transition-colors shadow-sm ${compact ? "min-h-[32px] py-2" : "min-h-[40px] py-2.5"
                    } ${disabled
                        ? (lightTheme ? "bg-zinc-100 text-zinc-400 cursor-not-allowed border-zinc-200" : "bg-zinc-900/50 text-zinc-600 cursor-not-allowed border-zinc-800")
                        : (lightTheme ? "bg-white border-zinc-200 hover:border-zinc-300 text-zinc-700 cursor-pointer" : "bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-300 cursor-pointer")
                    } ${className}`}
            >
                <span className="overflow-hidden whitespace-nowrap text-left font-semibold">
                    {displayOption || displayTitle}
                </span>
                {!hideChevron && (
                    <span className={`ml-3 flex items-center justify-center transition-transform duration-300 ${disabled ? "text-zinc-600" : "text-zinc-400"} ${isOpen ? "rotate-180" : "rotate-0"}`}>
                        <ChevronDown size={16} />
                    </span>
                )}
            </button>

            {isOpen && (
                <div className={`absolute z-[9999] mt-2 w-full rounded-xl border shadow-xl max-h-72 overflow-hidden flex flex-col right-0 origin-top ${lightTheme ? "bg-white border-zinc-200" : "bg-zinc-900 border-zinc-800"} ${dropdownClassName}`}>
                    {showSearch && (
                        <div className="p-3 border-b border-zinc-800 shrink-0 bg-zinc-900">
                            {searchLabel && (
                                <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                                    {searchLabel}
                                </label>
                            )}
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setHighlightedIndex(-1);
                                }}
                                onKeyDown={handleKeyDown}
                                placeholder={searchPlaceholder}
                                className="w-full px-3 py-2 text-sm border border-zinc-700 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-[#FA0C83] transition-colors"
                            />
                        </div>
                    )}

                    {showProductInfo || showAvatar ? (
                        <div className="max-h-60 overflow-y-auto flex-1 min-h-0 custom-scrollbar py-1">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((item, index) => (
                                    <div key={getOptionValue(item) ?? index}>
                                        {renderOptionContent(item, index)}
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-3 text-sm text-zinc-500 text-center">
                                    No results found
                                </div>
                            )}
                        </div>
                    ) : (
                        <ul className="max-h-60 overflow-y-auto flex-1 min-h-0 custom-scrollbar py-1">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((item, index) => (
                                    <React.Fragment key={getOptionValue(item) ?? index}>
                                        {renderOptionContent(item, index)}
                                    </React.Fragment>
                                ))
                            ) : (
                                <li className="px-4 py-3 text-sm text-zinc-500 text-center">No results found</li>
                            )}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default Select;
