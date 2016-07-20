namespace :seeds do
  desc 'Downloading seed images'
  task dlimages: :environment do
    monthes = ['2016_05', '2015_07', '2015_08', '2014_01']
    Dir.chdir(Rails.root.join('tmp')) do
      monthes.each do |month|
        (1..15).each do |i|
          file_name = "#{i.to_s.rjust(3, '0')}.jpg"
          `wget https://www.letoile.ru/uploads/images/letoile_mag/#{month}/#{file_name}`
          month_path = Rails.root.join('public', 'seeds', month)
          FileUtils.mkdir_p(month_path)
          `cp #{file_name} #{month_path.join(file_name)}`
          `rm #{file_name}`
        end
      end
    end
  end
end