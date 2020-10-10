class Public::CustomersController < Public::ApplicationController
  before_action :set_user

  def new
    @contact_back_image = ContactBackImage.where(design: @user.id)
    @customer = Customer.new
  end

  def create
    # @user = User.where(id: params[:user_id]).first
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

  def set_user
    @user = User.key(params[:user_id])
  end
end