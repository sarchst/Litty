  class CsvToDatabaseService
    def self.call(csv_path)
      rows = CSV.read(csv_path, headers: true)
      rows.each do |row|
        unless Book.find_by(isbn: row["ISBN"])
          author = 
          attributes = {
            isbn: row["EAN"],
            title: row["Title"],
            publisher: row["Publisher Name"],
            published_at: row["PubDate"],
            genres: row["BISAC Category Description"]&.split("/"),
            page_count: row["Number of Pages"],
            description: row["Summary"],
            authors: "#{row["Author"].split(", ").last + " " + row["Author"].split(", ").first}",
            subtitle: row["Subtitle"],
            series: row["Series"],
            primary_quotes: row["Primary Quotes"]&.split("\n"),
            accolades: row["Awards & Accolades"]&.split("\n"),
            author_bio: row["Contributor Bio (Raw from PDF)"],
            top_5: row["Left Panel List"] == "1"
          }
          
          Book.create(attributes)
        end
      end
    end
  end
