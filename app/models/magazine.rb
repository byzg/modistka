class Magazine < ActiveRecord::Base
  has_many :sheets
  belongs_to :cover, class_name: 'Sheet'
end
