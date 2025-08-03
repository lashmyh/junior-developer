import pytest
from main import find_cited_source_ids, process_citations
from models import Source


def test_find_cited_source_ids():
    """Test that citation IDs are correctly extracted from content"""
    # basic citation detection test
    content = "This is a test!!!! <ref>ABC123</ref> with citations :-) <ref>XYZ789</ref>."
    result = find_cited_source_ids(content)
    
    assert "ABC123" in result
    assert "XYZ789" in result
    assert len(result) == 2


def test_find_cited_source_ids_duplicates():
    """Test that duplicate citations are handled correctly"""
    content = "test <ref>ABC123</ref> and <ref>ABC123</ref>."
    result = find_cited_source_ids(content)
    
    assert "ABC123" in result
    assert len(result) == 1  # only one value since the method returns a set


def test_find_cited_source_ids_no_citations():
    """Test content with no citations"""
    content = "no I cannot prove anything i say"
    result = find_cited_source_ids(content)
    
    assert len(result) == 0


def test_process_citations_successful_replacement():
    """Test that ref tags are replaced with links"""
    content = "here is a ref element to process <ref>TEST123</ref>"
    sources = [
        Source(
            id="TEST123",
            title="Test Source",
            source="https://example.com/test"
        )
    ]
    
    result = process_citations(content, sources)
    
    # should contain a link instead of the ref tag
    assert '<a href="https://example.com/test"' in result
    assert 'target="_blank"' in result
    assert '[Source]' in result
    assert '<ref>TEST123</ref>' not in result


def test_process_citations_no_matching_source():
    """Test that unmatched ref tags are left unchanged"""
    content = "this source <ref>UNKNOWN123</ref> does not have a match in sources"
    sources = [
        Source(
            id="DIFFERENT456",
            title="Different source", 
            source="https://example.com/different"
        )
    ]
    
    result = process_citations(content, sources)
    
    # should keep the original ref tag since no match found
    assert '<ref>UNKNOWN123</ref>' in result
    assert '<a href=' not in result


def test_process_citations_empty_content():
    """empty content test"""
    content = ""
    sources = []
    
    result = process_citations(content, sources)
    
    assert result == ""

