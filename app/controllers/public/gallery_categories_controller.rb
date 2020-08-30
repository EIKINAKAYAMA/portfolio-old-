class Public::GalleryCategoriesController < ApplicationController
  def index
    @user = User.find(params[:user_id])
    @gallery_categories =GalleryCategory.where(user_id: params[:user_id])
  end
end