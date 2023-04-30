## Listen to Kafka Topic

kafkacat -b localhost:29092 -t bankdb.bank.users -C -c10000 -o beginning -J -u| jq '.'
kafkacat -b localhost:29092 -t bankdb.bank.transfer -C -c10000 -o beginning -J -u| jq '.'
