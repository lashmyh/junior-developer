"use client";
import { useState } from "react";
import { ContentProps } from "../../utils/interfaces";
import CategoryItem from "./CategoryItem";
import { ArrowsPointingInIcon, ArrowsPointingOutIcon } from "@heroicons/react/16/solid";
/**
 * Content component renders a list of categorised items.
 * Includes a button to expand or collapse all categories at once.
 * 
 * Props:
 * - data: array of category items to display
 */

export default function Content({ data }: ContentProps) {

    const [expandAll, setexpandAll] = useState(false);

    return (
        <div className="border-2 border-gray-300 bg-white w-full p-4 pb-20 rounded-md flex flex-col gap-5">
            {/* button to open/collapse all CategoryItem components */}
            <button
            aria-label={expandAll ? "Collapse all categories" : "Expand all categories"}
            aria-pressed={!expandAll}
            className="self-end hover:cursor-pointer p-2 rounded-sm duration-300 hover:scale-115"
            onClick={() => setexpandAll(prev => !prev)}>
                { expandAll ? 
                <ArrowsPointingInIcon className="size-5 text-black self-end" aria-hidden="true" />
                :
                <ArrowsPointingOutIcon className="size-5 text-black self-end" aria-hidden="true"/>}
            </button>
            {data.map(item => (
                <CategoryItem item={item} key={item.category} expanded={expandAll}/>
            ))}
        </div>

    );
}

