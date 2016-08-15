class Skill < ApplicationRecord
  belongs_to :user
  validates :name, uniqueness: { scope: [:assignee_name,:user_id],
    message: "Can only assign one skill per person once" }
  validates :name,  presence: true, length: { maximum: 50 }
  validates :assignee_name,  presence: true
  validates :assignee_id,  presence: true
  validates :user_id, presence: true
end
