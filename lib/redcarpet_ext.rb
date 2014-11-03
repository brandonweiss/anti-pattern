module Jekyll
  module Converters
    class Markdown
      class RedcarpetParser
        def convert(content)
          @redcarpet_extensions[:fenced_code_blocks] = !@redcarpet_extensions[:no_fenced_code_blocks]
          @renderer.send :include, Redcarpet::Render::SmartyPants if @redcarpet_extensions[:smart]
          markdown = Redcarpet::Markdown.new(@renderer.new(@redcarpet_extensions), @redcarpet_extensions)

          abbreviations = content.scan(/^\*\[([A-Z]+)\]: (.+)$/)
          abbreviations = Hash[*abbreviations.flatten]

          if abbreviations.any?
            content.gsub!(/^\*\[([A-Z]+)\]: (.+)$/, "")
            content.rstrip!

            abbreviations.each do |key, value|
              html = <<-EOS.strip
                <abbr title="#{value}">#{key}</abbr>
              EOS

              content.gsub!(/\b#{key}\b/, html)
            end
          end

          markdown.render(content)
        end
      end
    end
  end
end
