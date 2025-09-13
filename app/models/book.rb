class Book < ApplicationRecord
  # has_and_belongs_to_many :authors
  validates :isbn, presence: true, uniqueness: true

  def cover_image_url
    "https://www.biblioshare.org/BNCServices/BNCServices.asmx/Images?Token=#{ENV["BIBLIOSHARE_TOKEN"]}&EAN=#{isbn}&SAN=&Thumbnail=false"
  end
end