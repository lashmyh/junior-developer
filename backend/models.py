from pydantic import BaseModel

# Input structure

class Source(BaseModel):
    id: str
    title: str
    source: str

class Data(BaseModel):
    category: str
    sources: list[Source]
    content: str

# Output structure

class ProcessedSource(BaseModel):
    id: str
    title: str
    source: str
    favicon_url: str = ""
    is_cited: bool = False

class ProcessedData(BaseModel):
    category: str
    sources: list[ProcessedSource]
    content: str

