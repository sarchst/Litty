class CsvToDatabase
  def self.call(csv_path)
    rows = CSV.read(csv_path, headers: true)
    rows.each do |row|
      unless Book.find_by(isbn: row["EAN"])
        genre = row["BISAC Category Description"]

        attributes = {
          isbn: row["EAN"],
          title: row["Title"],
          publisher: row["Publisher Name"],
          published_at: row["PubDate"],
          genres: genre&.split("/")&.map(&:strip),
          page_count: row["Number of Pages"],
          description: row["Summary"],
          authors: row["Author Full"].split("\n"),
          subtitle: row["Subtitle"],
          series: row["Series"],
          primary_quotes: row["Primary Quotes"]&.split("\n"),
          accolades: row["Awards & Accolades"]&.split("\n"),
          author_bios: row["Contributor Bio (Raw from PDF)"]&.split("\n"),
          top_5: row["Left Panel List"] == "1",
          is_fiction: genre&.include?("Fiction")
        }
        
        Book.create(attributes)
      end
    end
  end
end