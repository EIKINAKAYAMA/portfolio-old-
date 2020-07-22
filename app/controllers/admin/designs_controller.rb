class Admin::DesignsController < Admin::ApplicationController
  before_action :authenticate_user!

  def index
    @user = User.find(params[:user_id])
    @design = Design.new
    @designs = Design.where(user_id: params[:user_id])
  end

  def new
    
  end

  def create
    @design = Design.new(design_params)

    if @design.save
      redirect_to request.referrer, notice: 'succeded sending'
    else
      render :index
    end
  end

  def edit

  end

  def update

  end

  private
  def design_params
    params.require(:design).permit(:image).merge(user_id: params[:user_id])
  end
end
