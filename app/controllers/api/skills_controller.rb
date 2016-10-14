class Api::SkillsController < SessionsController
  before_action :delete_check, only: [:destroy]
  before_action :checkAuthForSkillCreate, only: [:create, :destroy, :update]
  # GET /skills
  # if user goes to api/skills > id provied = specific id skill, user_id provided = a users skill returned, name provided = all skills with provided name returned
  def index
    if params[:id]
      @skills = Skill.where(id:params[:id])
    elsif params[:user_id]
      @skills = Skill.where(user_id:params[:user_id])
    elsif params[:name]
      @skills = Skill.where(name:params[:name])
    else
      @skills = Skill.all()
    end
      render json: @skills
  end

  # GET /skills/1
  # works when its nested for a user and when its just for specificsk
  def show
    if params[:user_id]
      @user = User.find(params[:user_id])
      @skill = @user.skills.where(id:params[:id])
      render json: @skill
    elsif params[:id]
      @skill = Skill.where(id:params[:id])
      render json: @skill
    elsif params[:name]
      @skill = Skill.where(name:params[:name])
      render json: @skill
    else
      render json: {result:'nothing found'}
    end
  end

  # POST /skills
  def create
    @skill = Skill.new(skill_params)

    if @skill.save
      render json: @skill, status: :created
    else
      render json: @skill.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /skills/1
  def update
    if @skill.update(skill_params)
      render json: @skill
    else
      render json: @skill.errors, status: :unprocessable_entity
    end
  end

  # DELETE /skills/1
  def destroy
    #you can delete all skills assigned to YOU (you or by others), and also skills YOU assigned to others
    if User.find(params[:assignee_id]).id == @skill.assignee_id || !Skill.where(user_id:params[:user_id]).where(id:params[:id]).where(assignee_id:params[:assignee_id]).blank? || !Skill.where(user_id:params[:assignee_id]).where(id:params[:id]).blank?
      @skill.destroy
      render json: {result: 'deleted skill successfully'}
    else
      render json: {result: 'couldnt delete skills'}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def delete_check
      if Skill.where(id:params[:id]).blank?
        render json: {result: 'couldnt process delete request'} #dont give extra failure info security-wise
      else
        @skill = Skill.find(params[:id])
      end
    end

    # Only allow a trusted parameter "white list" through.
    def skill_params
      params.permit(:name, :assignee_id, :assignee_name, :user_id) #.require(:skill) figure out what this does
    end
end
