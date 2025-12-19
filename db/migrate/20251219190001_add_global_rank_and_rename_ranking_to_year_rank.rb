class AddGlobalRankAndRenameRankingToYearRank < ActiveRecord::Migration[8.0]
  def change
    # Rename existing year_rank column to year_rank
    rename_column :books, :year_rank, :year_rank
    
    # Add new global_rank column
    add_column :books, :global_rank, :integer
  end
end
