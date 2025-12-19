class RemoveUnusedColumnsFromBooks < ActiveRecord::Migration[8.0]
  def change
    remove_column :books, :genre, :string
    remove_column :books, :thumbnail_url, :string
    remove_column :books, :published_year, :integer
  end
end
