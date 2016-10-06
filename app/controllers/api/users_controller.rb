class Api::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  def index
    @users = User.includes(:skills).all #to fix n+1 query problem

    render json: @users
  end

  # GET /profiles/1
  def show
    render json: @user
  end

  def create
    @user = User.new(user_params)

    if @user.save
      #log_in @user
      createToken @user
      render json: {message:'signup successful!', id:@user.id, name:@user.name, token:session[:token]}, status: 200
    else
      render json: { messages: @user.errors.full_messages }, status: 422
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.includes(:skills).find(params[:id]) #to fix n+1 query problem
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:name, :age, :job, :password, :password_confirmation)
    end
end
