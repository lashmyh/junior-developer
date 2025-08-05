
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
}

export interface SourceGroupProps {
    sources: Source[];
}

export interface InformationProps {
    information: string;
}
