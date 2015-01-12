xml.instruct!

xml.feed xmlns: "http://www.w3.org/2005/Atom" do
  xml.title "Anti-pattern"
  xml.id url
  xml.link href: url
  xml.link href: URI.join(url, current_page.path), rel: "self"
  xml.updated(blog.articles.first.date.to_time.iso8601) unless blog.articles.empty?

  xml.author do
    xml.name "Brandon Weiss"
    xml.email "brandon@anti-pattern.com"
  end

  blog.articles.each do |post|
    xml.entry do
      xml.title post.title
      xml.link href: URI.join(url, post.url)
      xml.id URI.join(url, post.url)
      xml.published post.date.to_time.iso8601
      xml.updated File.mtime(post.source_file).iso8601

      xml.author do
        xml.name "Brandon Weiss"
        xml.email "brandon@anti-pattern.com"
      end

      xml.content post.body, type: "html"
    end
  end
end
