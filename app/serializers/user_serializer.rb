class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :job, :age
  has_many :skills
end
