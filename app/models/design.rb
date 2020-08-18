class Design < ApplicationRecord
  belongs_to :user
  has_many :top_back_images, dependent: :destroy
  has_one :gallery_back_image, dependent: :destroy
  has_one :contact_back_image, dependent: :destroy
  has_one :profile_back_image, dependent: :destroy
  accepts_nested_attributes_for :top_back_images, allow_destroy: true
  accepts_nested_attributes_for :gallery_back_image
  accepts_nested_attributes_for :contact_back_image
  accepts_nested_attributes_for :profile_back_image

  # validates :more_than_one_exist, presence: true
  
  # private
  #   def more_than_one_exist
  #     top_back_image.presence or gallery_back_image.presence or contact_back_image.presence or profile_back_image.precence
  #   end
end