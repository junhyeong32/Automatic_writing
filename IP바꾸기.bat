﻿help
chcp 65001

:_loop
set /a a+=1

adb -s R3CM60ASKAK shell svc data disable
timeout 1
adb -s R3CM60ASKAK shell svc data enable

echo 지금은 %a% 번째 루프입니다. :: %a% LOOP ::
nslookup myip.opendns.com resolver1.opendns.com

timeout 10
goto _loop