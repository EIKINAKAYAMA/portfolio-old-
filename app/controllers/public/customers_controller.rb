class Public::CustomersController < Public::ApplicationController
  def new
    @user = User.find(params[:user_id])
    @designs = Design.where(user_id: params[:user_id])
    @customer = Customer.new
  end

  def create
    @user = User.where(id: params[:user_id]).first
    @customer = @user.customers.build(customer_params)

    if @customer.save
      redirect_to request.referrer, notice: 'succeded sending'
    else
      # render new_user_customer_path(params[:user_id])
      render :new
    end
  end

  private
  def customer_params
    params.require(:customer).permit(:name, :email, :body, :user_id)
  end
end