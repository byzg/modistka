class AddImageToSheets < ActiveRecord::Migration
  def change
    add_column :sheets, :image, :string
  end
end
