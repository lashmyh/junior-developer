import { CategoryItemProps } from "../../utils/interfaces"
import { useState, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import Sources from "./Sources";
import FormattedInformation from "./FormattedContent";

/**
 * CategoryItem renders a single category section with expandable content.
 * It shows the category title, toggles open/closed, and displays formatted content
 * as well as the sources
 *
 * Props:
 * - item: category data including content and sources
 * - expanded: external signal to force open/closed, boolean
 */

export default function CategoryItem({ item, expanded }: CategoryItemProps) {
    
    const [isOpen, setIsOpen] = useState(expanded);

    useEffect(() => {
      setIsOpen(expanded);
    }, [expanded]);

    const citedSources = item.sources.filter(source => source.is_cited);
    const uncitedSources = item.sources.filter(source => !source.is_cited);

    return (
      <section className="category-item border rounded-sm bg-white text-black outline-1 outline-blue-950">
        
        {/* toggle header */}
        <button onClick={() => setIsOpen(prev => !prev)}
            className={`flex justify-between w-full p-4 shadow-md rounded-sm ${isOpen ? 'bg-blue-100  ring-amber-400 ring-4 border-3' : ''} hover:bg-blue-100 hover:cursor-pointer`}>
            <h3 className="text-lg font-bold capitalize">{item.category.replace(/_/g, ' ')}</h3>
            {isOpen ? <ChevronUpIcon className="size-8"/> : <ChevronDownIcon className="size-8" /> }
        </button>
        
        {/* drop-down content */}
        {isOpen && (
            <div className="p-7 flex flex-col items-center">
                {/* <div className="prose mb-6">{parse(item.content)}</div> */}
                <FormattedInformation information={item.content}/>
                <Sources sources={citedSources} title="Cited Sources"/>
                <Sources sources={uncitedSources} title="Additional Resources"/>
                
            </div>
        )}
        
      </section>
    );
  }