class CreateMenuItems < ActiveRecord::Migration[6.0]
  def change
    create_table :menu_items do |t|
      t.string :name
      t.string :price
      t.string :description
      t.belongs_to :restaurant, null: false, foreign_key: true

      t.timestamps
    end
  end
end
