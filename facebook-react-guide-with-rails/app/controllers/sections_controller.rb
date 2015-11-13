class SectionsController < ApplicationController
  require 'coderay'
  before_filter :set_sections # Don't actually do this! This is just simulating API/Database calls

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
        props: {date: Time.now.strftime('%H:%M:%S GMT%z (%Z)')},
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
        num: "2",
        name: "Interactivity and Dynamic UIs",
        origin_url: "https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html",
        component_name: "likeButton",
        template_name: "interactivity_and_dynamic_uis.js.jsx",
        description: "Demonstration of how to make UIs interactive."
      },
      {
        num: "3",
        name: "Multiple Components",
        origin_url: "https://facebook.github.io/react/docs/multiple-components.html",
        template_name: "multiple_components.js.jsx",
        component_name: "Avatar",
        props: {username: 'react'},
        description: "React encourages the use of building components that reuse other components with well-defined interfaces."
      },
      {
        num: "4",
        name: "Reusable Components",
        origin_url: "https://facebook.github.io/react/docs/reusable-components.html",
        template_name: "reusable_components.js.jsx",
        component_name: "ReusableComponents",
        props: {},
        description: "React provides several different features to promote reusability."
      }
    ]
  end
end
