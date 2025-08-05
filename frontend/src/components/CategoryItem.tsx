import { CategoryItemProps } from "../../utils/interfaces"
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import Sources from "./Sources";
import FormattedInformation from "./FormattedContent";


export default function CategoryItem({ item }: CategoryItemProps) {
    
    const [isOpen, setIsOpen] = useState(false);

    return (
      <section className="category-item border rounded-sm bg-white text-black outline-1 outline-blue-950">
        
        {/* toggle header */}
        <button onClick={() => setIsOpen(prev => !prev)}
            className={`flex justify-between w-full p-4 shadow-md rounded-sm ${isOpen ? 'bg-blue-100 outline-2 outline-blue-950 border-orange-100 border-3' : ''} hover:bg-blue-100 hover:cursor-pointer`}>
            <h3 className="text-xl font-bold capitalize">{item.category.replace(/_/g, ' ')}</h3>
            {isOpen ? <ChevronUpIcon className="size-8"/> : <ChevronDownIcon className="size-8" /> }
        </button>
        
        {/* drop-down content */}
        {isOpen && (
            <div className="p-7 flex flex-col items-center">
                {/* <div className="prose mb-6">{parse(item.content)}</div> */}
                <FormattedInformation information={item.content}/>
                <Sources sources={item.sources}/>
                
            </div>
        )}
        
      </section>
    );
  }