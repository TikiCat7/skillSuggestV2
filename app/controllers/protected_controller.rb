class ProtectedController < SessionsController
  before_filter :checkAuth

  def index
    render json: {redirectToLogIn: false, message: 'you got in to the protected route!'}
  end
end
