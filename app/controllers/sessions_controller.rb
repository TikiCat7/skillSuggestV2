class SessionsController < ApplicationController

  def new
  end

  def create
    user = User.find_by(name: params[:session][:name])
    if user && user.authenticate(params[:session][:password])
      log_in user
      render json: {message:'login successful!'}, status: 200
    else
      render json: 'Failed to authenticate username or password', status: 403
    end
  end

  def destroy
  end
end
