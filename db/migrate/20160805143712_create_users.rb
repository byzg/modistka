class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :phone, null: false
      t.string :firstname, null: false
      t.string :lastname
      t.string :email, null: false
      t.boolean :subscribed, default: true

      t.timestamps null: false
    end
  end
end
