class Design < ApplicationRecord
  belongs_to :user

  validates :more_than_one_exist, presence: true

  mount_uploader :top_back_image, ImageUploader
  mount_uploader :gallery_back_image, ImageUploader
  mount_uploader :contact_back_image, ImageUploader
  mount_uploader :profile_back_image, ImageUploader

  private
    def more_than_one_exist
      top_back_image.presence or gallery_back_image.presence or contact_back_image.presence or profile_back_image.precence
    end
end