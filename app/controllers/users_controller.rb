class UsersController < ApplicationController
before_action :authenticate_user!

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def index
    gon.instagram_client_id = ENV['INSTAGRAM_CLIENT_ID']
    gon.instagram_client_secret = ENV['INSTAGRAM_CLIENT_SECRET']
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
