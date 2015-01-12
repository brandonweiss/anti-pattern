xml.instruct!

xml.urlset xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" do
  xml.url do
    xml.loc url
    xml.lastmod blog.articles.first.date.to_time.iso8601
    xml.changefreq "daily"
    xml.priority "1.0"
  end

  xml.url do
    xml.loc URI.join(url, archive_path)
    xml.lastmod blog.articles.first.date.to_time.iso8601
    xml.changefreq "daily"
    xml.priority "0.7"
  end

  blog.articles.each do |post|
    xml.url do
      xml.loc URI.join(url, post.url)
      xml.lastmod post.date.to_time.iso8601
      xml.changefreq "daily"
      xml.priority "0.7"
    end
  end
end
