#!/bin/bash
echo "copy all systemd service files from local folder to system folder"
cp /home/cc/cc-ms-artblocks-nft/deploy/systemd/* /etc/systemd/system
echo "running: systemctl daemon-reload"
systemctl daemon-reload

echo "systemctl stop cc-ms-artblocks-nft.service"
systemctl stop cc-ms-artblocks-nft.service
echo "systemctl start cc-ms-artblocks-nft.service"
systemctl start cc-ms-artblocks-nft.service

echo "systemctl disable cc-ms-artblocks-nft.service"
systemctl disable cc-ms-artblocks-nft.service

echo "systemctl enable cc-ms-artblocks-nft.timer"
systemctl enable cc-ms-artblocks-nft.timer