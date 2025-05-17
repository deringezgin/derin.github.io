# Derin Gezgin's Personal Website

Personal website for Derin Gezgin - Computer Science and Data Science student at Connecticut College.

## Jekyll Implementation
This website uses Jekyll for content management with an easy-to-edit structure. All content is managed through YAML front matter in the index.md file.

### How to Edit Content
To update your website, simply edit the YAML front matter in `index.md`:

1. **Personal Information**: Edit name, profile photo path
2. **Introduction**: Update intro_content with your personal bio
3. **Links**: Add/remove links in the links section
4. **Research Introduction**: Modify research_intro with your updated description
5. **Projects**: Add/remove/edit projects in the projects section

Example for adding a new project:
```yaml
projects:
  - title: Your New Project Title
    image: images/project-image.jpg
    authors: Author 1, <strong>Your Name</strong>, Author 3
    publication: Publication Venue, Year
    links:
      - title: Link Title
        url: https://link-url.com
        color: "#hexcolor"
```

### Running Locally
```
bundle install
bundle exec jekyll serve
```

For deployment on GitHub Pages, simply push to your GitHub repository.

