ActiveAdmin.register Magazine do
  config.batch_actions = false

  index as: :grid, columns: 5 do |magazine|
    link_to admin_magazine_path(magazine) do
      image_tag(magazine.cover.image.cover) + tag(:br) + magazine.released_at
    end
  end

end
