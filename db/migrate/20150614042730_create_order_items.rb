class CreateOrderItems < ActiveRecord::Migration
  def change
    create_table :order_items do |t|
      t.references :product, index: true
      t.references :client, index: true
      t.references :user, index: true
      t.integer :quantity
      t.integer :status
      t.integer :buy_price
      t.integer :sale_price
      t.integer :sale_price_unit

      t.timestamps null: false
    end
  end
end
