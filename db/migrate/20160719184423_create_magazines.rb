class CreateMagazines < ActiveRecord::Migration
  def change
    create_table :magazines do |t|
      t.date  :released_at
      t.belongs_to :cover, index: true
      t.timestamps null: false
    end
  end
end
