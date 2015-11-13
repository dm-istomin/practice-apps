class SectionsController < ApplicationController
  require 'coderay'
  before_filter :set_sections

  def index
  end

  def show
    @section = @sections.select { |section| section[:num] == params[:id] }
    @section = @section[0] unless @section.empty?
  end

  private
  def set_sections
    @sections = [
      {
        num: "1",
        name: "Displaying Data",
        origin_url: "https://facebook.github.io/react/docs/displaying-data.html",
        component_name: "HelloWorld",
        template_name: "hello_world.js.jsx",
        description: "Simple example of how React displays data and keeps the interface up-to-date."
      },

      {
        num: "1-1",
        name: "JSX in Depth",
        origin_url: "https://facebook.github.io/react/docs/jsx-in-depth.html",
        component_name: "JSXInDepth",
        template_name: "jsx_in_depth.js.jsx",
        description: "JSX is a Javascript syntax extension that looks similar to XML."
      },

      {
        num: "1-2",
        name: "JSX Spread Attributes",
        origin_url: "https://facebook.github.io/react/docs/jsx-spread.html",
        component_name: "jsx-spread",
        description: "N/A"
      }
    ]
  end
end
