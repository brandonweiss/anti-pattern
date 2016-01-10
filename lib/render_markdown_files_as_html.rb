class RenderMarkdownFilesAsHTML < Middleman::Extension

  def manipulate_resource_list(resources)
    resources.each do |resource|
      if File.extname(resource.source_file) == ".md"
        resource.destination_path << ".html" unless resource.destination_path.include? ".html"
      end
    end
  end

end

::Middleman::Extensions.register(:render_markdown_files_as_html, RenderMarkdownFilesAsHTML)
