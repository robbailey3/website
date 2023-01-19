package database

import (
  "context"
  "fmt"
  "os"
  "time"
)

type Migration struct {
  Id           int
  FilePath     string
  TimestampUtc time.Time
}

func CreateMigrationsTable() error {
  _, err := Instance.db.Exec(`CREATE TABLE IF NOT EXISTS migrations 
    (Id INT PRIMARY KEY NOT NULL, 
    FileName VARCHAR(255) NOT NULL, 
    TimestampUtc TIMESTAMP NOT NULL);`)

  if err != nil {
    return err
  }
  return nil
}

func GetRunMigrations() ([]Migration, error) {
  var result []Migration
  err := Instance.Query(context.Background(), &result, "SELECT * FROM migrations")
  if err != nil {
    return nil, err
  }
  return result, nil
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
  for _, entry := range entries {
    migrationAlreadyRun := false
    for _, runMigration := range runMigrations {
      if runMigration.FilePath == entry.Name() {
        migrationAlreadyRun = true
      }
    }
    if migrationAlreadyRun {
      continue
    }
    if err := runMigrationFile(fmt.Sprintf("./dbMigrations/%s", entry.Name())); err != nil {
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
  return Instance.Exec(context.Background(), "INSERT INTO Migrations VALUES (FilePath = ?, TimestampUtc = ?)", filePath, time.Now().Unix())
}
