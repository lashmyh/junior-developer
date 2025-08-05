"use client";
import { ContentProps } from "../../utils/interfaces";
import CategoryItem from "./CategoryItem";

export default function Content({ data }: ContentProps) {
    return (
        <div className="border-2 border-gray-300 bg-white w-full p-4 rounded-md flex flex-col gap-5">
            {data.map(item => (
                <CategoryItem item={item} key={item.category} />
            ))}
        </div>

    );
}

