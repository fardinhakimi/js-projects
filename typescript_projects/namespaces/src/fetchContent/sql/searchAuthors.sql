SELECT
    uuid,
    name
FROM
    content.author
WHERE
    name ILIKE $1
LIMIT 50
