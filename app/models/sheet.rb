class Sheet < ActiveRecord::Base
  mount_uploader :image, ImageUploader
  belongs_to :magazine
end
