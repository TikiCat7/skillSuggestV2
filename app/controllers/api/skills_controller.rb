class Api::SkillsController < SessionsController
  before_action :set_skill, only: [:show, :update, :destroy]
  before_action :checkAuthForSkillCreate, only: [:create, :destroy, :update]
  # GET /skills
  def index
    @skills = Skill.where(user_id:params[:user_id])
    render json: @skills
  end

  # GET /skills/1
  def show
    @user = User.find(params[:user_id])
    @skill = @user.skills.find(params[:id])
    render json: @skill
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
    def set_skill
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
