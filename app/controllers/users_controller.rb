class UsersController < ApplicationController
before_action :authenticate_user!
before_action :set_user
before_action :set_instagram

  def index
    gon.user_id_digest = current_user.id_digest
    gon.new_admin_user_gallery_category_path = new_admin_user_gallery_category_path(current_user)
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to new_admin_user_design_path(current_user)
    else
      render :edit
    end
  end

  private

  def set_user
    @user = User.key(params[:user_id])
  end

  def user_params
    params.require(:user).permit(:name, :email)
  end

  def set_instagram
    gon.instagram_client_id = ENV['INSTAGRAM_CLIENT_ID']
    gon.instagram_client_secret = ENV['INSTAGRAM_CLIENT_SECRET']
  end
end
