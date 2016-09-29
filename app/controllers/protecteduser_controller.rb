class ProtecteduserController < SessionsController
  before_filter :checkAuthForSpecificUser

  def index
    render json: {redirectToLogIn: false, message: 'you got into a specific users route!'}
  end
end
