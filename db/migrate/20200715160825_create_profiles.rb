class CreateProfiles < ActiveRecord::Migration[5.2]
  def change
    create_table :profiles do |t|
      t.string :user_image,     null:false
      t.text :user_comment
      t.references :user,  null:false, foreign_key: true
      t.timestamps
    end
  end
end
