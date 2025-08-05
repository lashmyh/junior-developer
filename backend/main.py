import json, requests, re
from fastapi import FastAPI
from models import Data, Source, ProcessedData, ProcessedSource
from pathlib import Path
from bs4 import BeautifulSoup 
from typing import Set
from urllib.parse import urljoin, urlparse
import logging


app = FastAPI()

# logging configuration
logging.basicConfig(level=logging.WARNING) #only log warning or higher level messages
logger = logging.getLogger(__name__)

def find_cited_source_ids(content: str) -> Set[str]:
    """Find all cited source ID's in the content using regex"""
    # source ID pattern: <ref>source_id</ref>
    pattern = r'<ref>([^<]+)</ref>'
    cited_ids =set(re.findall(pattern, content))
    return cited_ids


def process_citations(content: str, sources: list[Source]) -> str:
    """
    Replace the <ref> tags containing ref. ID's with actual HTML links.
    
    Invalid references are logged for developers to fix.

    """
    # map source ID's to corresponding titles and URLs
    source_map = {source.id: (source.title, source.source) for source in sources}

    invalid_refs =[]

    def replace_citation(match):
        source_id = match.group(1)
        if source_id in source_map:
            title, url = source_map[source_id]
            # replace the match with the source url
            return f'<a href="{url}" target="_blank" rel="noopener noreferrer" aria-label="External link to {title}">{title}</a>'
        # in case of no match, log the invalid reference 
        invalid_refs.append(source_id)
        return f'<span class="citation-error" role="alert" aria-label="Missing reference">[Reference not available: {source_id}]</span>'

    pattern = r'<ref>([^<]+)</ref>'
    processed_content = re.sub(pattern, replace_citation, content)
    
    # log invalid references for developers
    if invalid_refs:
        logger.warning(
            f"Invalid citation references found in content."
            f"The following IDs are invalid: {invalid_refs}"
        )

    return processed_content

def extract_favicon_url(url: str) -> str:
    """Extract the favicon URL from a website"""
    try:
        # user-agent headers to prevent request potentially being blocked
        headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        response = requests.get(url, headers = headers, timeout=10)
        response.raise_for_status() # raises exception if HTTP status error

        soup = BeautifulSoup(response.content, 'html.parser')

        # finds all link elements that contain string 'icon' in the rel value
        icon_links = soup.find_all("link", rel=lambda x: x and 'icon' in x.lower())

        for link in icon_links:
            href = link.get("href")
            # href not None, link exists
            if href: 
                favicon_url = urljoin(url, href)
                return favicon_url # returns the first favicon found
            
        parsed_url = urlparse(url)
        # default favicon location
        default_favicon = f"{parsed_url.scheme}://{parsed_url.netloc}/favicon.ico"
        
        favicon_response = requests.head(default_favicon, headers=headers, timeout=5)
        # return default favicon if it exists
        if favicon_response.status_code == 200:
            return default_favicon
            
    except requests.RequestException as e:
        print(f"Failed to fetch favicon from {url}: {e}")
    except Exception as e:
        print(f"Error processing favicon from {url}: {e}")
    
    # unable to get favicon
    return "" 




@app.get("/data", response_model=list[ProcessedData])
def get_data() -> list[ProcessedData]:
    data = Path("data/mock.json").read_text()
    data_list = [Data.model_validate(item) for item in json.loads(data)]
    
    processed_data_list = []

    for data_item in data_list:

        # find sources cited in the content
        cited_source_ids = find_cited_source_ids(data_item.content)

        # process each source to get favicons from the corresponding site
        processed_sources = []
        for source in data_item.sources:
            favicon_url = extract_favicon_url(source.source)
        
            processed_source = ProcessedSource(
                id=source.id,
                title=source.title,
                source=source.source,
                favicon_url=favicon_url,
                is_cited=source.id in cited_source_ids
            )

            processed_sources.append(processed_source)

        # process content to replace <ref> elements with actual links
        processed_content = process_citations(data_item.content, data_item.sources)

        processed_item = ProcessedData(
            category=data_item.category,
            sources=processed_sources,
            content=processed_content
        )

        processed_data_list.append(processed_item)

    return processed_data_list


