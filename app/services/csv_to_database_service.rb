  class CsvToDatabaseService
    def self.call(csv_path)
      rows = CSV.read(csv_path, headers: true)
      rows.each do |row|
        unless Book.find_by(isbn: row["ISBN"])
          genre = row["BISAC_Category_Description"]
          
          attributes = {
            isbn: row["ISBN"],
            title: row["Title"],
            publisher: row["Publisher_Name"],
            published_at: row["PubDate"],
            genres: genre&.split("/"),
            page_count: row["Number_of_Pages"],
            description: row["Long_Summary"],
            short_summary: row["Short_Summary"],
            authors: row["Author_Full"],
            subtitle: row["Subtitle"],
            series: row["Series"],
            primary_quotes: row["Copy_Quotes"]&.split("\n"),
            accolades: row["Awards_&_Accolades"]&.split("\n"),
            author_bio: row["Copy_Bio"],
            top_5: row["YEAR_RANK"].to_i <= 5,
            is_fiction: genre&.include?("Fiction"),
            ranking: row["YEAR_RANK"].to_i,
          }
          
          Book.create(attributes)
        end
      end
    end
  end
