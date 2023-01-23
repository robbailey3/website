package database

import (
  "context"
  "fmt"
  "io/fs"
  "os"
  "time"
)

type Migration struct {
  Id           int
  Filename     string
  TimestampUtc time.Time
}

func CreateMigrationsTable() error {
  _, err := Instance.db.Exec(`CREATE TABLE IF NOT EXISTS migrations 
    (Id SERIAL PRIMARY KEY, 
    FileName VARCHAR(255) NOT NULL, 
    TimestampUtc TIMESTAMP NOT NULL);`)

  if err != nil {
    return err
  }
  return nil
}

func GetPendingMigrations(entries []fs.DirEntry, runMigrations []*Migration) []os.DirEntry {
  var result []os.DirEntry

  for _, entry := range entries {
    entryRan := false
    for _, migration := range runMigrations {
      if migration.Filename == fmt.Sprintf("%s/%s", "./dbMigrations", entry.Name()) {
        entryRan = true
      }
    }
    if !entryRan {
      result = append(result, entry)
    }
  }
  return result
}

func GetRunMigrations() ([]*Migration, error) {
  var results []*Migration
  rows, err := Instance.Query(context.Background(), "SELECT * FROM migrations")
  if err != nil {
    return nil, err
  }

  for rows.Next() {
    var result Migration
    if err := rows.Scan(&result.Id, &result.Filename, &result.TimestampUtc); err != nil {
      return nil, err
    }
    results = append(results, &result)
  }
  return results, nil
}

func RunMigrations() error {
  runMigrations, err := GetRunMigrations()

  if err != nil {
    return err
  }

  entries, err := os.ReadDir("./dbMigrations")
  if err != nil {
    return err
  }
  pendingMigrations := GetPendingMigrations(entries, runMigrations)
  for _, migration := range pendingMigrations {
    if err := runMigrationFile(fmt.Sprintf("./dbMigrations/%s", migration.Name())); err != nil {
      return err
    }
  }
  return nil
}

func runMigrationFile(filePath string) error {
  fileBytes, err := os.ReadFile(filePath)
  if err != nil {
    return err
  }

  _, err = Instance.db.Exec(string(fileBytes))

  if err != nil {
    return err
  }

  return logFileAsRun(filePath)
}

func logFileAsRun(filePath string) error {
  _, err := Instance.Exec(context.Background(), "INSERT INTO Migrations (FileName, TimestampUtc) VALUES ($1, $2)", filePath, time.Now())

  return err
}
