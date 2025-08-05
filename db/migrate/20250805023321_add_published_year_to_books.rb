class AddPublishedYearToBooks < ActiveRecord::Migration[8.0]
  def change
    add_column :books, :published_year, :integer
  end
end
