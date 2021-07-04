SELECT
    uuid,
    name
FROM
    content.tag
WHERE
    name ILIKE $1
LIMIT 50
