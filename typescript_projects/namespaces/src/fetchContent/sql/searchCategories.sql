SELECT
    uuid,
    name
FROM
    content.category
WHERE
    name ILIKE $1
LIMIT 50
