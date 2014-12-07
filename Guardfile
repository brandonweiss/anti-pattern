ignore(/vendor.+/)
ignore(/_site.+/)
watch(/.+/) { `bundle exec jekyll build` }

guard "livereload" do
  watch(%r{_layouts/.+\.html})
  watch(%r{_posts/.+\.md})
  watch(%r{lib/.+\.rb})
  watch(%r{stylesheets/.+\.css})
  watch("archive.html")
  watch("index.html")
end
