#!/bin/bash

DATA=`python /home/pi/development/sensehat/jacl/hello-hat.py`

echo $DATA

curl \
-H application-id:567A9D06-AE22-7A5D-FF35-FE0358F16100 \
-H secret-key:EBCD239C-5133-9E47-FF68-68AC06FC0900 \
-H Content-Type:application/json \
-H application-type:REST \
-X POST \
-v 'https://api.backendless.com/v1/data/hourdata' \
-d "$DATA"



