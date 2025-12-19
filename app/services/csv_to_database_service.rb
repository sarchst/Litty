  class CsvToDatabaseService
    def self.call(csv_path)
      rows = CSV.read(csv_path, headers: true)
      rows.each do |row|
        unless Book.find_by(isbn: row["isbn"])
          genres = row["genres"]
          
          attributes = {
            isbn: row["isbn"],
            title: row["title"],
            subtitle: row["subtitle"],
            description: convert_newlines_to_br(row["long_summary"]),
            short_summary: row["short_summary"],
            page_count: row["page_count"],
            series: row["series_name"],
            genres: genres&.split("/"),
            publisher: row["publisher_name"],
            published_at: row["published_at"],
            authors: row["authors"],
            author_bio: convert_newlines_to_br(row["author_bios"]),
            primary_quotes: row["quotes"]&.split("\n"),
            top_5: row["year_rank"].to_i <= 5,
            is_fiction: genres&.include?("Fiction"),
            year_rank: row["year_rank"].to_i,
            global_rank: row["global_rank"].to_i,
          }
          
          Book.create(attributes)
        end
      end
    end
    
    private
    
    def self.convert_newlines_to_br(text)
      return nil if text.nil?
      
      # Convert double newlines to paragraph breaks, single newlines to line breaks
      text.gsub(/\n\n/, '<br><br>').gsub(/\n/, '<br>')
    end
  end
