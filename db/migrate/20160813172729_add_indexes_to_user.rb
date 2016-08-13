class AddIndexesToUser < ActiveRecord::Migration
  def change
    add_index :users, :phone, unique: true
    add_index :users, :email, unique: true
  end
end
