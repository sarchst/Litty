class Book < ApplicationRecord
  # has_and_belongs_to_many :authors
  validates :isbn, presence: true, uniqueness: true

  def cover_image_url
    # Check if the image file exists in the public folder
    image_path = Rails.root.join("public", "book_covers", "#{isbn}.jpg")
    if File.exist?(image_path)
      "/book_covers/#{isbn}.jpg"
    else
      nil
    end
  end
end