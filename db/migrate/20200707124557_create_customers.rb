class CreateCustomers < ActiveRecord::Migration[5.2]
  def change
    create_table :customers do |t|
      t.string :name,      null: false
      t.string :email,     null: false
      t.text :body,        null: false
      t.references :user,  null:false,foreign_key: true
      t.timestamps
    end
  end
end