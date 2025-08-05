  # When there is a new dataset i.e. CSV, run this job from rails console to update the database.
  class CsvToDatabaseService
    def self.call(csv_path)
      rows = CSV.read(csv_path, headers: true)
      rows.each do |row|
        Book.create(isbn: row["USE ISBN"])
      end
    end
  end
