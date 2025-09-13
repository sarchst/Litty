class AddIsFictionToBooks < ActiveRecord::Migration[8.0]
  def change
    add_column :books, :is_fiction, :boolean
  end
end
