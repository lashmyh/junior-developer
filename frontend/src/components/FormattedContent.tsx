import { InformationProps } from "../../utils/interfaces";
import parse from "html-react-parser";
/**
 * this component renders formatted HTML content from a raw string.
 * 
 * It processes the input string by:
 * - Replacing double newlines (\n\n) with <br/><br/> tags to create visible paragraph breaks
 * - Adding a space before every <a> tag that directly follows text, ensuring proper spacing.
 * Props:
 * - information: string containing raw HTML with possible newline characters and links
 */

export default function FormattedInformation({ information }: InformationProps) {
    
    const preprocessedHtml = information
    .replace(/\n\n/g, '<br/><br/>') //replace double newlines with breaks
    .replace(/([^>\s])(<a\b)/g, '$1 $2'); // replace <a> with a space followed by the <a>
  
    return <div className="prose mb-7">{parse(preprocessedHtml)}</div>;
}