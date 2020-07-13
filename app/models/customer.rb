class Customer < ApplicationRecord
  belongs_to :user

  validates :name, presence: true
  validates :email, presence: true
  validates :body, presence: true
end