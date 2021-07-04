SELECT
    C.uuid,
    CAM.article_uuid,
    name
FROM
    content.category C
    INNER JOIN content.article_category_mapping CAM ON CAM.category_uuid = C.uuid
    INNER JOIN (@articlesSql) A ON A.uuid = CAM.article_uuid;

