class UsersController < ApplicationController
before_action :authenticate_user!, except: [:show_front]

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
    @user = User.find(params[:id])
  end

  def show_front
    @user = User.find(params[:id])
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :body, :image)
  end
end
