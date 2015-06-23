class AddFieldsToPackage < ActiveRecord::Migration
  def change
    add_column :packages, :shipping_fee, :decimal, precision: 5, scale: 2
    add_column :packages, :status, :integer
  end
end
