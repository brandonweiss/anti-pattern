xml.instruct!

xml.feed xmlns: "http://www.w3.org/2005/Atom" do
  xml.title "Anti-pattern"
  xml.id config[:hostname]
  xml.link href: config[:hostname]
  xml.link href: URI.join(config[:hostname], current_page.path), rel: "self"
  xml.updated(blog.articles.first.date.to_time.iso8601) unless blog.articles.empty?

  xml.author do
    xml.name "Brandon Weiss"
    xml.email "brandon@anti-pattern.com"
  end

  blog.articles.each do |post|
    xml.entry do
      xml.title post.title
      xml.link href: URI.join(config[:hostname], post.url)
      xml.id URI.join(config[:hostname], post.url)
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
