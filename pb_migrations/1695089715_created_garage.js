/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "rp62wylzbkswogf",
    "created": "2023-09-19 02:15:15.723Z",
    "updated": "2023-09-19 02:15:15.723Z",
    "name": "garage",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "z7zhfosl",
        "name": "vehicles",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("rp62wylzbkswogf");

  return dao.deleteCollection(collection);
})
