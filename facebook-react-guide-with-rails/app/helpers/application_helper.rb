module ApplicationHelper
  def coderay(syntax, text)
    wrapped_text = "#{"<pre lang=\"#{syntax}\"><code lang=\"#{syntax}\">"}#{text}#{"</code></pre>"}"
    wrapped_text.gsub(/\<pre( lang="(.+?)")?\>\<code( lang="(.+?)")?\>(.+?)\<\/code\>\<\/pre\>/m) do
      lang = $4
      format_text = CGI.unescapeHTML($5).gsub /\<code( lang="(.+?)")?\>|\<\/code\>/, ""
      CodeRay.scan(format_text, lang).div(:css => :class)
    end
  end
end
