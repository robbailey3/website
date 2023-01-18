package database

func CreateMigrationsTable() error {
  _, err := Instance.db.Exec("CREATE TABLE IF NOT EXISTS migrations (MigrationId INT PRIMARY KEY NOT NULL);")

  if err != nil {
    return err
  }
  return nil
}
