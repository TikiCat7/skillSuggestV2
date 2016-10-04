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
    @skill.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_skill
      @skill = Skill.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def skill_params
      params.permit(:name, :assignee_id, :assignee_name, :user_id) #.require(:skill) figure out what this does
    end
end
