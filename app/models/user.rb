class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :name, presence: true, uniqueness: true

  has_many :genres, dependent: :delete_all
  has_many :customers, dependent: :delete_all
  has_many :designs, dependent: :delete_all
  has_one :profile, dependent: :destroy
  accepts_nested_attributes_for :profile
end
