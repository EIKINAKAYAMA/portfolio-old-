class Admin::CustomersController < Admin::ApplicationController
  before_action :authenticate_user!

  def index
    @user = User.find(params[:user_id])
    @customers = Customer.where(user_id: params[:user_id])
  end

  private
  def customer_params
    params.require(:customer).permit(:name, :email, :body, :user_id)
  end
end