module SessionsHelper
  #Assign user.id into session method provided by rails
  def log_in(user)
    session[:user_id] = user.id
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
