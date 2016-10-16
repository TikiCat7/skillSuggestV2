class SkillSerializer < ActiveModel::Serializer
  attributes :id, :name, :assignee_id, :assignee_name
  belongs_to :user
end
