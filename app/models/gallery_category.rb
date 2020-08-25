class GalleryCategory < ApplicationRecord
  validates :name, presence: true
  
  belongs_to :user
  has_many :category_images, dependent: :destroy
  accepts_nested_attributes_for :category_images, allow_destroy: true
end