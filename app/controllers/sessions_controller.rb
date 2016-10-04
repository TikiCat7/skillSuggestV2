class SessionsController < ApplicationController

  def login
    user = User.find_by(name: params[:session][:name])
    if user && user.authenticate(params[:session][:password])
      #log_in user
      createToken user
      #JsonWebToken.encode(params[:session][:name])
      render json: {message:'login successful!', id:user.id, name:user.name, token:session[:token]}, status: 200
    else
      render json: 'Failed to authenticate username or password', status: 422
    end
  end

  def checkAuth #check user has a valid jwt (any user as long as the jwt decodes)
    if request.headers['Authorization'].present? #check if request has Authorization header
        @http_token ||= request.headers['Authorization'].split(' ').last #if it does store in variable
    else
        render json: {redirectToLogIn:true, message:'not authorized (no authorization header)'} #if it doesnt, they need to login
        return
    end

    if JsonWebToken.decode(@http_token) == nil
      render json: {redirectToLogIn:true, message:'not authorized (jwt failed to decode)'}
      return
    else
      @auth_token ||= JsonWebToken.decode(@http_token)
    end

    def user_id_in_token?
      @http_token && @auth_token && @auth_token[:data][:id].to_i
    end

    #if you get to here good job you passed!
    return @auth_token
    #render json: {decodedToken:@auth_token, httpToken: @http_token, message: 'hi', userIdInToken?:user_id_in_token?}
  end
end

def checkAuthForSpecificUser #checking jwt & making sure they are a specific user
  if request.headers['Authorization'].present? #check if request has Authorization header
      @http_token ||= request.headers['Authorization'].split(' ').last #if it does store in variable
  else
      render json: {redirectToLogIn:true, message:'not authorized (no authorization header)'} #if it doesnt, they need to login
      return
  end

  if JsonWebToken.decode(@http_token) == nil
    render json: {redirectToLogIn:true, message:'not authorized (jwt failed to decode)'}
    return
  else
    @auth_token ||= JsonWebToken.decode(@http_token)
  end

  # check if sent name matches jwt decoded name, if so we allow user to do something to that user object
  if params[:name] != @auth_token[:data][:name]
    render json: {redirectToLogIn:false, message: 'not authorized (you dont have permission touch that)'}
    return
  end
end

def checkAuthForSkillCreate #checking jwt & making sure they are a specific user
  if request.headers['Authorization'].present? #check if request has Authorization header
      @http_token ||= request.headers['Authorization'].split(' ').last #if it does store in variable
  else
      render json: {redirectToLogIn:true, message:'not authorized (no authorization header)'} #if it doesnt, they need to login
      return
  end

  if JsonWebToken.decode(@http_token) == nil
    render json: {redirectToLogIn:true, message:'not authorized (jwt failed to decode)'}
    return
  else
    @auth_token ||= JsonWebToken.decode(@http_token)
  end

  def user_id_in_token?
    @http_token && @auth_token && @auth_token[:data][:id].to_i
  end

  # check if sent name matches jwt decoded name, if so we allow user to do something to that user object
  if params[:assignee_id].to_i != @auth_token[:data][:id] || params[:assignee_name] != @auth_token[:data][:name]
    render json: {redirectToLogIn:false, message: 'not authorized (you dont have permission touch that)', assigneeid: params[:assignee_id].to_i, id: @auth_token[:data][:id], AuthToken: @http_token, deocdedJwt: @auth_token}
    return
  end
end
