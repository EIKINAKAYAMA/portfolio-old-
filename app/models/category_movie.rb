class CategoryMovie < ApplicationRecord
  belongs_to :gallery_movie
  mount_uploader :video, VideoUploader

  validates :video, presence: true
end