
export interface Source {
    id: string;
    title: string;
    source: string;
    favicon_url: string;
    is_cited: boolean;
  }
  
export interface Data {
category: string;
sources: Source[];
content: string;
}

export interface ContentProps {
    data: Data[];
}

export interface CategoryItemProps {
    item: Data;
    expanded: boolean;
}

export interface SourceGroupProps {
    sources: Source[];
    title: string;
}

export interface InformationProps {
    information: string;
}
