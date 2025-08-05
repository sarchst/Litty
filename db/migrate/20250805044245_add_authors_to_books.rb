class AddAuthorsToBooks < ActiveRecord::Migration[8.0]
  def change
    add_column :books, :authors, :string
  end
end
