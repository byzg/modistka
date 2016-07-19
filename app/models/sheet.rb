class Sheet < ActiveRecord::Base
  mount_uploader :image, ImageUploader
end
