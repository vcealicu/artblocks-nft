#!/bin/bash
echo "running before install"
/usr/bin/id -u cc &>/dev/null
returnFromUserExists=$?
echo "User exists result $returnFromUserExists"
#user does not exist so create user cc!!
if [[ $returnFromUserExists != "0" ]]; then
    echo "Creating user cc"
    /usr/sbin/useradd cc -s /bin/bash -p '*'
fi