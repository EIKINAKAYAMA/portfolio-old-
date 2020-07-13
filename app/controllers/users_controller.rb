class UsersController < ApplicationController
before_action :authenticate_user!, except: [:show_front]
before_action :set_tweet, only: [:show_admin, :show_front]

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
  end

  def show_admin
  end

  def show_front
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :email, :body, :image)
  end
end
