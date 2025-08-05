import { InformationProps } from "../../utils/interfaces";
import parse, { HTMLReactParserOptions, Element, Text } from "html-react-parser";

export default function FormattedInformation({ information }: InformationProps) {
    


  return <div className="prose mb-7">{parse(information)}</div>;
}
