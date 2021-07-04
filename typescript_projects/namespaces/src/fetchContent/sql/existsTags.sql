SELECT
    T.uuid
FROM
    content.tag T
JOIN content.article_tag_mapping ATM ON T.uuid = ATM.tag_uuid
WHERE
    ATM.article_uuid = A.uuid
    AND T.name IN (@prm)