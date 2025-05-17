document.addEventListener('DOMContentLoaded', function() {
  // Load intro text
  fetch('intro.txt')
    .then(response => response.text())
    .then(text => {
      const introParagraphs = text.split('\n\n');
      const introContainer = document.getElementById('intro-container');
      
      // Clear any existing content first
      introContainer.innerHTML = '';
      
      // Add each paragraph as a <p> element
      introParagraphs.forEach(paragraph => {
        if (paragraph.trim() !== '') {
          const p = document.createElement('p');
          p.textContent = paragraph;
          introContainer.appendChild(p);
        }
      });
    })
    .catch(error => {
      console.error('Error loading intro text:', error);
      document.getElementById('intro-container').innerHTML = '<p>Error loading introduction. Please check the console for details.</p>';
    });

  // Load research markdown
  fetch('research.md')
    .then(response => response.text())
    .then(markdown => {
      // Parse the markdown content
      const researchOverview = parseMarkdownSection(markdown, '# Research Overview', '## Publications');
      const publications = parsePublications(markdown);
      
      // Update the research overview
      document.getElementById('research-overview').innerHTML = convertMarkdownToHtml(researchOverview);
      
      // Clear and rebuild the publications table
      const publicationsContainer = document.getElementById('publications-container');
      publicationsContainer.innerHTML = '';
      
      // Create table for each publication
      publications.forEach(pub => {
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.border = '0px';
        table.style.borderSpacing = '0px 10px';
        table.style.borderCollapse = 'separate';
        table.style.marginRight = 'auto';
        table.style.marginLeft = 'auto';
        
        const tbody = document.createElement('tbody');
        const tr = document.createElement('tr');
        
        // Image cell
        const tdImage = document.createElement('td');
        tdImage.style.padding = '16px';
        tdImage.style.width = '40%';
        tdImage.style.verticalAlign = 'middle';
        
        if (pub.image) {
          const imgLink = document.createElement('a');
          imgLink.href = 'images/' + pub.image;
          imgLink.target = '_blank';
          
          const img = document.createElement('img');
          img.src = 'images/' + pub.image;
          img.className = 'project-image';
          img.style.width = '100%';
          img.style.maxWidth = '100%';
          img.style.objectFit = 'cover';
          
          imgLink.appendChild(img);
          tdImage.appendChild(imgLink);
        }
        
        // Content cell
        const tdContent = document.createElement('td');
        tdContent.style.padding = '8px';
        tdContent.style.width = '60%';
        tdContent.style.verticalAlign = 'middle';
        
        // Title
        const titleSpan = document.createElement('span');
        titleSpan.className = 'papertitle';
        titleSpan.textContent = pub.title.replace(/^### /, '');
        tdContent.appendChild(titleSpan);
        
        tdContent.appendChild(document.createElement('br'));
        
        // Authors
        tdContent.appendChild(document.createTextNode(pub.authors.replace(/^\*\*Authors\*\*: /, '')));
        
        tdContent.appendChild(document.createElement('br'));
        
        // Published in
        const pubInfo = document.createElement('em');
        pubInfo.textContent = pub.publishedIn.replace(/^\*\*Published in\*\*: /, '');
        tdContent.appendChild(pubInfo);
        
        tdContent.appendChild(document.createElement('br'));
        
        // Links
        const linksDiv = document.createElement('div');
        linksDiv.style.margin = '10px 0';
        
        // Parse links - expecting format like [arXiv](https://arxiv.org/abs/xxxx) | [Code](https://github.com/...)
        const linksText = pub.links.replace(/^\*\*Links\*\*: /, '');
        const linkMatches = linksText.matchAll(/\[(.*?)\]\((.*?)\)/g);
        
        let firstLink = true;
        for (const match of linkMatches) {
          const linkText = match[1];
          const linkUrl = match[2];
          
          const link = document.createElement('a');
          link.href = linkUrl;
          link.target = '_blank';
          link.textContent = linkText;
          
          // Style based on link type
          link.style.padding = '2px 10px';
          link.style.borderRadius = '5px';
          link.style.textDecoration = 'none';
          link.style.fontWeight = '500';
          link.style.fontSize = '0.97em';
          link.style.display = 'inline-block';
          
          if (!firstLink) {
            link.style.marginLeft = '8px';
          }
          
          // Set color based on link type
          if (linkText.toLowerCase() === 'arxiv') {
            link.style.background = '#b31b1b';
            link.style.color = '#fff';
          } else if (linkText.toLowerCase() === 'code') {
            link.style.background = '#24292e';
            link.style.color = '#fff';
          } else if (linkText.toLowerCase() === 'pdf') {
            link.style.background = '#0077b5';
            link.style.color = '#fff';
          } else if (linkText.toLowerCase() === 'doi') {
            link.style.background = '#fcb70b';
            link.style.color = '#000';
          } else if (linkText.toLowerCase() === 'website') {
            link.style.background = '#4285f4';
            link.style.color = '#fff';
          } else {
            link.style.background = '#6c757d';
            link.style.color = '#fff';
          }
          
          linksDiv.appendChild(link);
          firstLink = false;
        }
        
        tdContent.appendChild(linksDiv);
        
        // Add cells to row
        tr.appendChild(tdImage);
        tr.appendChild(tdContent);
        
        // Add row to table
        tbody.appendChild(tr);
        table.appendChild(tbody);
        
        // Add table to container
        publicationsContainer.appendChild(table);
      });
    })
    .catch(error => {
      console.error('Error loading research markdown:', error);
      document.getElementById('research-overview').innerHTML = '<p>Error loading research information. Please check the console for details.</p>';
      document.getElementById('publications-container').innerHTML = '';
    });
});

// Helper function to parse a section from markdown
function parseMarkdownSection(markdown, startMarker, endMarker) {
  const startIndex = markdown.indexOf(startMarker);
  if (startIndex === -1) return '';
  
  const endIndex = endMarker ? markdown.indexOf(endMarker, startIndex) : markdown.length;
  if (endIndex === -1) return markdown.substring(startIndex + startMarker.length).trim();
  
  return markdown.substring(startIndex + startMarker.length, endIndex).trim();
}

// Helper function to parse publications from markdown
function parsePublications(markdown) {
  const publicationsSection = parseMarkdownSection(markdown, '## Publications', null);
  if (!publicationsSection) return [];
  
  // Split by publication (each starts with ###)
  const publicationMatches = publicationsSection.split(/(?=### )/);
  
  return publicationMatches
    .filter(pub => pub.trim().startsWith('### ') && !pub.includes('Format for adding'))
    .map(pub => {
      const lines = pub.split('\n');
      const title = lines[0]; // ### Title
      
      // Find specific lines
      const authors = lines.find(line => line.startsWith('**Authors**')) || '';
      const publishedIn = lines.find(line => line.startsWith('**Published in**')) || '';
      const links = lines.find(line => line.startsWith('**Links**')) || '';
      const image = lines.find(line => line.startsWith('**Image**')) || '';
      
      return {
        title,
        authors,
        publishedIn,
        links,
        image: image.replace(/^\*\*Image\*\*: /, '').trim()
      };
    });
}

// Helper function to convert simple markdown to HTML
function convertMarkdownToHtml(markdown) {
  let html = markdown;
  
  // Convert links: [text](url) -> <a href="url" target="_blank">text</a>
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
  
  // Convert paragraphs (lines with content)
  html = '<p>' + html.replace(/\n\n/g, '</p><p>') + '</p>';
  
  return html;
} 