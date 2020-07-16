class Restaurant < ApplicationRecord
  has_many :liked_restaurants
  has_many :menu_items
  
end
