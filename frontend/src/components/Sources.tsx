import { SourceGroupProps } from "../../utils/interfaces";
import Image from "next/image";
import { LinkIcon, ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function Sources({ sources, title }: SourceGroupProps) {

    const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);

    // copy to clipboard function
    const copyToClipBoard = async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedLinkId(id)
            //reset after 2 seconds
            setTimeout(() => {
                setCopiedLinkId(null)
            }, 2000);
        } catch (err) {
            console.error("Faild to copy link", err)
        };
    };

    if (!sources || sources.length === 0) return null;


    return (
        <div className="flex flex-col gap-3 bg-orange-50 border-l-5 border-orange-200 px-3 py-5 w-full">
            {sources.length > 0 && (
                <>
                <h3 className="text-lg font-bold mb-2">{title} Sources:</h3>
                <ul className="list-disc pl-5 space-y-2">
                {sources.map(source => (
                    <li key={source.id} className="flex items-center gap-2">
                    {source.favicon_url && source.favicon_url.trim() !== ""
                    ? <Image src={source.favicon_url} alt="" aria-hidden="true" width={16} height={16} />
                    : <LinkIcon className="size-4" aria-hidden="true" />
                }
                    <a
                        href={source.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-hyperlink hover:bg-blue-50 visited:text-purple-800"
                    >
                        {source.title}
                    </a>
                    {/* copy to clipboard button */}
                    <button onClick={() => copyToClipBoard(source.source, source.id)} aria-label={`Copy link to ${source.title}`}
                        className="ml-2 p-1 rounded hover:bg-gray-200 hover:cursor-pointer hover:ring-2 active:ring-2 ring-offset-1 ring-blue-400 duration-300"
                        title="Copy link to clipboard">
                        {copiedLinkId === source.id ? (
                            <CheckIcon className="size-4 text-blue-600" />
                        ) : (
                            <ClipboardDocumentIcon className="size-4 text-gray-500" />
                        )}
                    </button>
                    </li>
                ))}
                </ul>
                </>
            )}
    
            
        </div>
    )

}
