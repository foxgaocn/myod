class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.text :desc
      t.references :category, index: true, default: 0
      t.timestamps null: false
    end
  end
end
