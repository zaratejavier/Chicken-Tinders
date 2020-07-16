class RemoveMenuItemsFieldFromRestaurants < ActiveRecord::Migration[6.0]
  def change
    remove_column :restaurants, :menu_items, :string
  end
end
