class CreateSnsCredentials < ActiveRecord::Migration[5.2]
  def change
    create_table :sns_credentials do |t|
      t.string :provider
      t.string :uid
      t.string :name
      t.string :email
      t.string :token
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
