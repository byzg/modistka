class CreateSheets < ActiveRecord::Migration
  def change
    create_table :sheets do |t|
      t.belongs_to :magazine, index: true
      t.timestamps null: false
    end
  end
end
