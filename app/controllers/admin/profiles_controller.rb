class Admin::ProfilesController < ApplicationController
  def edit
    @profile = Profile.find(params[:user_id])
  end

  def update
  end

  private
  def profile_params
    params.require(:profile).permit(:image,:body).merge(user_id: params[:user_id])
  end
end
