class MovieCategory < ApplicationRecord
  validates :name, presence: true
  
  belongs_to :user
  has_many :category_movies, dependent: :destroy
  accepts_nested_attributes_for :category_movies, allow_destroy: true
end