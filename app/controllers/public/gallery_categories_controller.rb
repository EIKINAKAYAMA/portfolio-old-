class Public::GalleryCategoriesController < ApplicationController
  before_action :set_user
  
  def index
    @gallery_categories =GalleryCategory.where(user_id: @user.id)
  end

  private
  def set_user
    @user = User.key(params[:user_id])
  end
end