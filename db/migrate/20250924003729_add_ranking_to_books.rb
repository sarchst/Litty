class AddRankingToBooks < ActiveRecord::Migration[8.0]
  def change
    add_column :books, :year_rank, :integer
  end
end
