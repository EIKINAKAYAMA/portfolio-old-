class Admin::CustomersController < Admin::ApplicationController
  before_action :authenticate_user!
  before_action :set_user

  def index
    @customers = Customer.where(user_id: current_user.id)
  end

  private
  def customer_params
    params.require(:customer).permit(:name, :email, :body, :user_id)
  end

  def set_user
    @user = User.key(params[:user_id])
  end
end