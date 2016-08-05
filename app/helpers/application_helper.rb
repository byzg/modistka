module ApplicationHelper
  def headline(text = nil)
    text ||= t('.headline')
    content_tag :div, class: 'main-right-title' do
      [ content_tag(:div, '', class: 'main-right-title-pad'),
        content_tag( :h1, text)
      ].join.html_safe
    end.html_safe
  end

  def page_class
    classes = ["#{action_name.parameterize.dasherize}-action"]
    controller_class = "#{controller_name}_controller".classify.constantize
    ancestors = controller_class.ancestors.select {|klass| klass.to_s =~ /Controller/ }
    ancestors.each do |ancestor|
      class_name = ancestor.to_s.underscore.gsub('_', '-')
      return classes.join(' ') if class_name == 'application-controller'
      classes << class_name
    end
  end
end
