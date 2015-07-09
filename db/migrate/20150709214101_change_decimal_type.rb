class ChangeDecimalType < ActiveRecord::Migration
  def change
    change_column :order_items, :buy_price, :real
    change_column :order_items, :sale_price, :real
    change_column :packages, :shipping_fee, :real
  end
end
