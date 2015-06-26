class AddPriceUnitToClient < ActiveRecord::Migration
  def change
    add_column :clients, :price_unit, :integer
  end
end
