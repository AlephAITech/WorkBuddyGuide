# Technical SEO

The site generates technical SEO metadata during the VitePress build without
changing reader-facing page content.

## Automated in the build

- Canonical URLs for every public page
- Unique page descriptions derived from each page's introduction
- Open Graph and Twitter sharing metadata
- `WebSite`, `Organization`, `Article`/`WebPage`, and `BreadcrumbList` JSON-LD
- Indexing directives with large image and unrestricted snippet previews
- XML sitemap generation with internal design plans excluded
- A public `robots.txt` file that allows crawling and references the sitemap
- `noindex` for the generated 404 page

## Manual launch steps

These require ownership of the relevant search-engine accounts and are not
stored in the repository:

1. Add the production site to Google Search Console.
2. Submit `https://workbuddy.homes/sitemap.xml`.
3. Add the site to Bing Webmaster Tools and submit the same sitemap.
4. Add the site to Baidu Search Resource Platform for mainland-China discovery.
5. Keep `https://workbuddy.homes` as the only canonical origin. Permanently
   redirect the legacy `*.pages.dev` hostname and `www.workbuddy.homes` to it.

Do not add verification tokens as placeholders. Add the exact token supplied by
the relevant search platform only when account ownership is available.
