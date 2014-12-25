ignore(/vendor.+/)
ignore(/_site.+/)
watch(/.+/) { `bundle exec jekyll build` }

guard "livereload" do
  watch(%r{_layouts/.+\.html})
  watch(%r{_posts/.+\.md})
  watch(%r{_sass/.+\.(css|scss)})
  watch(%r{lib/.+\.rb})
  watch(%r{assets/.+})
  watch("archive.html")
  watch("index.html")
end
