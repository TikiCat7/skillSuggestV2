module SessionsHelper
  #Assign user.id into session method provided by rails
  def log_in(user)
    session[:user_id] = user.id
  end

  def createToken(user)
    session[:token] = JsonWebToken.encode({name:user.name, id:user.id})
    #session[:token] = 1234
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def logged_in?
    if !current_user.nil?
      current_user.name
  end
end
end
