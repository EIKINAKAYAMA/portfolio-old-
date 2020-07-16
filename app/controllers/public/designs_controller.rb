class Public::DesignsController < Public::ApplicationController

  def show
    @designs = Design.where(user_id: params[:user_id])
  end

  private
  def design_params
    params.require(:design).permit(:image, :user_id)
  end
end
