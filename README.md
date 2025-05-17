# Derin Gezgin's Personal Website

Personal website for Derin Gezgin - Computer Science and Data Science student at Connecticut College.

## Setup with Jekyll

This website uses Jekyll, a static site generator. Content is stored in separate data files that are easy to edit, while the site layout and styles are defined in templates.

### Installation and Setup

To run this website locally:

1. Install Ruby and Jekyll according to the [Jekyll installation guide](https://jekyllrb.com/docs/installation/)
2. Clone this repository
3. Run `bundle install` to install dependencies
4. Run `bundle exec jekyll serve` to start a local server
5. Visit `http://localhost:4000` in your browser

### Content Structure

All content is stored in easy-to-edit files:

- `_data/about.yml` - Your introduction and links
- `_data/research.yml` - Research overview and publications

### How to Update Content

#### Updating Your Introduction

Edit the `_data/about.yml` file. The `intro` field supports multiple paragraphs. Links are listed in the `links` array.

#### Adding a New Publication

Edit `_data/research.yml` and add a new entry under `publications`:

```yaml
- title: Your Paper Title
  authors: Author One, <strong>Derin Gezgin</strong>, Author Three
  venue: Conference or Journal Name
  year: 2025
  image: image_filename.png
  links:
    - title: arXiv
      url: https://arxiv.org/abs/xxxx.xxxxx
      color: "#b31b1b"
    - title: Code
      url: https://github.com/username/repository
      color: "#24292e"
```

Make sure to:
1. Place your image in the `images/` directory
2. Use HTML `<strong>` tags to highlight your name
3. Use the appropriate colors for links (see existing examples)

### Deploying the Site

This site can be easily deployed to GitHub Pages or any other static hosting provider. GitHub Pages will automatically build the site when changes are pushed to the repository.

