class Public::MovieCategoriesController < ApplicationController
  before_action :set_user

  def index
    @movie_categories =MovieCategory.where(user_id: @user.id)
  end

  private

  def set_user
    @user = User.key(params[:user_id])
  end
end
