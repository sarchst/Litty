class AddRankingToBooks < ActiveRecord::Migration[8.0]
  def change
    add_column :books, :ranking, :integer
  end
end
