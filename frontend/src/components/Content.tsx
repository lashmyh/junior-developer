"use client";
import { useState } from "react";
import { ContentProps } from "../../utils/interfaces";
import CategoryItem from "./CategoryItem";
import { ArrowsPointingInIcon, ArrowsPointingOutIcon } from "@heroicons/react/16/solid";

export default function Content({ data }: ContentProps) {

    const [allCollapsed, setAllCollapsed] = useState(false);

    return (
        <div className="border-2 border-gray-300 bg-white w-full p-4 rounded-md flex flex-col gap-5">
            <button
            title={allCollapsed ? "collapse all categories" : "expand all categories"}
            className="self-end hover:cursor-pointer p-2 rounded-sm duration-300 hover:scale-115"
            onClick={() => setAllCollapsed(prev => !prev)}>
                { allCollapsed ? 
                <ArrowsPointingInIcon className="size-5 text-black self-end" />
                :
                <ArrowsPointingOutIcon className="size-5 text-black self-end" />}
            </button>
            {data.map(item => (
                <CategoryItem item={item} key={item.category} expanded={allCollapsed}/>
            ))}
        </div>

    );
}

