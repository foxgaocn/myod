class CreatePackages < ActiveRecord::Migration
  def change
    create_table :packages do |t|
      t.references :client, index: true
      t.references :user, index: true
      t.integer :number
      t.string :tracking

      t.timestamps null: false
    end
  end
end
