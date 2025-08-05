import { SourceGroupProps } from "../../utils/interfaces";
import Image from "next/image";
import { LinkIcon } from "@heroicons/react/16/solid";


export default function Sources({ sources }: SourceGroupProps) {

    if (!sources || sources.length === 0) return null;

    // separate cited and non-cited sources
    const citedSources = sources.filter(source => source.is_cited);
    const uncitedSources = sources.filter(source => !source.is_cited);

    return (
        <div className="flex flex-col gap-3 bg-orange-50 border-l-5 border-orange-200 px-3 py-5 w-full">
            {citedSources.length > 0 && (
                <>
                <h3 className="text-lg font-bold mb-2">Cited Sources:</h3>
                <ul className="list-disc pl-5 space-y-2">
                {citedSources.map(source => (
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
                    </li>
                ))}
                </ul>
                </>
            )}
            {uncitedSources.length > 0 && (
                <>
                <h3 className="font-bold text-lg mb-2">Other Sources:</h3>
                <ul className="list-disc pl-5 space-y-2">
                {uncitedSources.map(source => (
                    <li key={source.id} className="flex items-center gap-2">
                    <Image
                        src={
                        source.favicon_url && source.favicon_url.trim() !== ""
                            ? source.favicon_url
                            : "/default-favicon.svg"
                        }
                        alt={`${source.title} favicon`}
                        width={16}
                        height={16}
                    />
                    <a
                        href={source.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-hyperlink hover:bg-blue-50 visited:text-purple-800"
                    >
                        {source.title}
                    </a>
                    </li>
                ))}
                </ul>
                </>
            )}
            
        </div>
    )

}
