class UsersController < ApplicationController
before_action :authenticate_user!
before_action :set_user

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
end
