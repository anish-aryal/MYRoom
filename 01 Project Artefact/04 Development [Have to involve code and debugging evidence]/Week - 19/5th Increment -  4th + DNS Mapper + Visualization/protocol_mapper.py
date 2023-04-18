#!/usr/bin/python

import re

def getProtocol(protocolName):
    protocolFile = open('Protocol.txt', 'r')
    protocolData = protocolFile.read()
    protocol = re.findall(r'\n' + str(protocolName) + ' (?:.)+\n', protocolData)
    if protocol:
        protocol = protocol[0]
        protocol = protocol.replace("\n", "")
        protocol = protocol.replace(str(protocolName), "")
        protocol = protocol.lstrip()
        return protocol
    else:
        return 'Protocol is Not Identified'
