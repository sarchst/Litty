  class CsvToDatabaseService
    def self.call(csv_path)
      rows = CSV.read(csv_path, headers: true)
      rows.each do |row|
        unless Book.find_by(isbn: row["ISBN"])
          genre = row["BISAC_Category_Description"] # DONE
          
          attributes = {
            isbn: row["ISBN"], # DONE
            title: row["Title"], # DONE
            publisher: row["Publisher_Name"], # DONE
            published_at: row["PubDate"], # DONE
            genres: genre&.split("/"), # DONE
            page_count: row["Number_of_Pages"], # DONE
            description: row["Refined_Long_Summary"], # DONE
            short_summary: row["Refined_Short_Summary"], # DONE
            authors: row["Author_Full"], # DONE
            subtitle: row["Subtitle"], # DONE
            series: row["Series"], # DONE
            primary_quotes: row["Formatted_Quotes"]&.split("\n"), # DONE
            accolades: row["Awards_&_Accolades"]&.split("\n"), # DONE
            author_bio: row["Refined_Bio"], # DONE
            top_5: row["YEAR_RANK"].to_i <= 5,
            is_fiction: genre&.include?("Fiction"),
            ranking: row["YEAR_RANK"].to_i,
          }
          
          Book.create(attributes)
        end
      end
    end
  end
