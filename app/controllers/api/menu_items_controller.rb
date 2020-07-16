class Api::MenuItemsController < ApplicationController

    def index 
        render json: Restaurant.find(params[:restaurant_id]).menu_items
    end 
end
