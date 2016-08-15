class User < ApplicationRecord
  has_many :skills, dependent: :destroy
end
