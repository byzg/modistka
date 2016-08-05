class User < ActiveRecord::Base
  validates :phone, :firstname, :email, presence: true
end
