DROP TABLE IF EXISTS metadata;

CREATE TABLE metadata (
    meta_id INTEGER PRIMARY KEY AUTOINCREMENT,
    meta_key TEXT NOT NULL,
    meta_val TEXT NOT NULL
);

DROP TABLE IF EXISTS connections;

CREATE TABLE connections (
   con_id INTEGER PRIMARY KEY AUTOINCREMENT,
   con_name TEXT NOT NULL,
   con_host TEXT NOT NULL,
   con_port TEXT NOT NULL
);

INSERT INTO metadata (meta_key, meta_val)
VALUES('schema_version','0.1.0');