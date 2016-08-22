class User < ApplicationRecord
  has_many :skills, dependent: :destroy
  validates :name, presence: true, length: {maximum: 50}
  validates :age, presence: true, length: {maximum: 3}
  validates :job, presence: true, length: {maximum: 50}
  has_secure_password
end
