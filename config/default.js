const kafkaBrokerList = process.env.KAFKA_BROKER_LIST || "0.0.0.0:9092";
console.log("kafka ==>", kafkaBrokerList)
module.exports = {
  "PORT": 3000,
  "HOSTNAME": "http://ml-api-adapter",
  "ENDPOINT_SOURCE_URL": "http://localhost:3001/participants/{{fsp}}/endpoints",
  "ENDPOINT_CACHE_CONFIG": {
    "expiresIn": 180000,
    "generateTimeout": 30000
  },
  "AMOUNT": {
    "PRECISION": 10,
    "SCALE": 2
  },
  "HANDLERS": {
    "DISABLED": false,
    "API": {
      "DISABLED": false
    }
  },
  "INSTRUMENTATION": {
    "METRICS": {
      "DISABLED": false,
      "config": {
        "timeout": 5000,
        "prefix": "moja_ml_",
        "defaultLabels": {
          "serviceName": "ml-service"
        }
      }
    }
  },
  "KAFKA": {
    "TOPIC_TEMPLATES": {
      "GENERAL_TOPIC_TEMPLATE": {
        "TEMPLATE": "topic-{{functionality}}-{{action}}",
        "REGEX": "topic-(.*)-(.*)"
      },
      "NOTIFICATION_TOPIC_TEMPLATE": {
        "TEMPLATE": "topic-notification-event",
        "REGEX": "topic-notification-event"
      },
      "FULFIL_TOPIC_TEMPLATE": {
        "TEMPLATE": "topic-transfer-fulfil",
        "REGEX": "topic-transfer-fulfil"
      },
      "GET_TRANSFERS_TOPIC_TEMPLATE": {
        "TEMPLATE": "topic-transfer-get",
        "REGEX": "topic-transfer-get"
      }
    },
    "CONSUMER": {
      "NOTIFICATION": {
        "EVENT": {
          "config": {
            "options": {
              "mode": 2,
              "batchSize": 1,
              "pollFrequency": 10,
              "recursiveTimeout": 100,
              "messageCharset": "utf8",
              "messageAsJSON": true,
              "sync": true,
              "consumeTimeout": 1000
            },
            "rdkafkaConf": {
              "client.id": "ml-con-notification-event",
              "group.id": "ml-group-notification-event",
              "metadata.broker.list": kafkaBrokerList,
              "socket.keepalive.enable": true
            },
            "topicConf": {
              "auto.offset.reset": "earliest"
            }
          }
        }
      }
    },
    "PRODUCER": {
      "TRANSFER": {
        "PREPARE": {
          "config": {
            "options": {
              "messageCharset": "utf8"
            },
            "rdkafkaConf": {
              "metadata.broker.list": kafkaBrokerList,
              "client.id": "ml-prod-transfer-prepare",
              "event_cb": true,
              "dr_cb": true,
              "socket.keepalive.enable": true,
              "queue.buffering.max.messages": 10000000
            },
            "topicConf": {
              "request.required.acks": "all"
            }
          }
        },
        "FULFIL": {
          "config": {
            "options": {
              "messageCharset": "utf8"
            },
            "rdkafkaConf": {
              "metadata.broker.list": kafkaBrokerList,
              "client.id": "ml-prod-transfer-fulfil",
              "event_cb": true,
              "dr_cb": true,
              "socket.keepalive.enable": true,
              "queue.buffering.max.messages": 10000000
            },
            "topicConf": {
              "request.required.acks": "all"
            }
          }
        },
        "GET": {
          "config": {
            "options": {
              "messageCharset": "utf8"
            },
            "rdkafkaConf": {
              "metadata.broker.list": kafkaBrokerList,
              "client.id": "ml-prod-transfer-get",
              "event_cb": true,
              "dr_cb": true,
              "socket.keepalive.enable": true,
              "queue.buffering.max.messages": 10000000
            },
            "topicConf": {
              "request.required.acks": "all"
            }
          }
        }
      }
    }
  }
}
