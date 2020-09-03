class CategoryImage < ApplicationRecord
  belongs_to :gallery_category
  mount_uploader :image, ImageUploader

  validates :image, presence: true
end