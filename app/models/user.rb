class User < ActiveRecord::Base
  validates :phone, :firstname, :email, presence: true
  validates :email, :phone, uniqueness: true
  validates :phone, length: { is: 10 }

  def phone=(phone)
    super(phone.tr('^0-9', ''))
  end
end
