SELECT
    AUTH.uuid
FROM
    content.author AUTH
JOIN content.article_author_mapping AAM ON AAM.author_uuid = AUTH.uuid
WHERE
    AAM.article_uuid = A.uuid
    AND AUTH.name IN (@prm)