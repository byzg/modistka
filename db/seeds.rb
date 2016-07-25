Magazine.destroy_all
Sheet.destroy_all
AdminUser.destroy_all

monthes = Dir.glob(File.join('public/seeds', "*#{File::Separator}")).map {|folder| folder.split('/')[-1] }
puts "Creation magazines for #{monthes}"
Dir.glob(File.join('public/seeds', "*#{File::Separator}")).map {|folder| folder.split('/')[-1] }.each do |month|
  released_at = Date.new(*month.split('_').map(&:to_i))
  magazine = Magazine.create(released_at: released_at)
  puts "Creation sheets for #{month}"
  images = Dir["public/seeds/#{month}/*"]
  images.each_with_index do |image, i|
    puts "--- #{i + 1} / #{images.size} ---"
    Sheet.create(image: Rails.root.join(image).open, magazine: magazine)
  end
  magazine.update(cover: magazine.sheets.first)
end
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')