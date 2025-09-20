class Book < ApplicationRecord
  validates :isbn, presence: true, uniqueness: true
  validates :title, presence: true

  def cover_image_url
    "/book_covers/#{isbn}.jpg"
  end
end