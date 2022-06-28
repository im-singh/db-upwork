db = db.getSiblingDB("neha-proposed");
db.getCollection("order").explain("executionStats").aggregate(
[
{$unwind:"$items"},
{$match:{"items.product":ObjectId("62aeb8e9d99757dbc4baa6e6")}},
{$project:{customer:1,product:"$items.product"}}
]);