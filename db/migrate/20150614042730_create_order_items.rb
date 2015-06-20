class CreateOrderItems < ActiveRecord::Migration
  def change
    create_table :order_items do |t|
      t.references :product, index: true
      t.references :client, index: true
      t.references :user, index: true
      t.integer :quantity
      t.integer :status
      t.decimal :buy_price, precision: 5, scale: 2
      t.decimal :sale_price, precision: 5, scale: 2
      t.integer :sale_price_unit
      t.integer :origination_id

      t.timestamps null: false
    end
  end
end
