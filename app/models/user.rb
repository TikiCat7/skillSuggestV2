class User < ApplicationRecord
  has_many :skills, dependent: :destroy
  has_secure_password
end
