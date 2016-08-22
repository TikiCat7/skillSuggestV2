class User < ApplicationRecord
  has_many :skills, dependent: :destroy
  validates :name, presence: true
  validates :age, presence: true
  validates :job, presence: true
  has_secure_password
end
