class Public::ProfilesController < ApplicationController
  def index
    @user = User.find(params[:user_id])
    @profiles = Profile.where(user_id: params[:user_id])
  end
end